import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import Heading2 from "components/Heading/Heading2";
import Layout from "../layout";
import {registerFailure, registerStart, registerSuccess} from "../../../slices/registerSlice";

const PageSignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(registerStart());

    try {
      const response = await axios.post('http://localhost:8085/api/users', {
        username,
        email,
        password,
      });

      if (response.data) {
        dispatch(registerSuccess());
        navigate('/login');
      } else {
        dispatch(registerFailure('Sign up failed'));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(registerFailure(error.message));
      } else {
        dispatch(registerFailure('An unknown error occurred'));
      }
    }
  };

  return (
      <Layout>
        <header className="text-center max-w-2xl mx-auto -mb-14 sm:mb-16 lg:mb-20">
          <Heading2>Sign up</Heading2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to our blog magazine Community
        </span>
        </header>

        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Username
            </span>
              <Input
                  type="text"
                  name="username"
                  placeholder="Your username"
                  className="mt-1"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
              <Input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Password
            </span>
              <Input
                  type="password"
                  name="password"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Already have an account? <NcLink href="/login">Sign in</NcLink>
        </span>
        </div>
      </Layout>
  );
};

export default PageSignUp;
