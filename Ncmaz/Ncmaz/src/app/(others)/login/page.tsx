// PageLogin.tsx
import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Input from 'components/Input/Input';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import NcLink from 'components/NcLink/NcLink';
import Heading2 from 'components/Heading/Heading2';
import Layout from '../layout';
import {loginFailure, loginStart, loginSuccess} from "../../../slices/authSlice";
import {RootState} from "../../../store";

const PageLogin = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    dispatch(loginStart());
    try {
      const response = await axios.post('http://localhost:8081/api/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        dispatch(loginSuccess(response.data.token));
      } else {
        dispatch(loginFailure('Invalid login details'));
      }
    } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loginFailure(error.message));
    } else {
      dispatch(loginFailure("An unknown error occurred."));
    }
  }

};

  return (
      <Layout>
        <header className="text-center max-w-2xl mx-auto -mb-14 sm:mb-16 lg:mb-20">
          <Heading2>Login</Heading2>
          <span className="block text-sm mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to our blog magazine Community
        </span>
        </header>

        <div className="max-w-md mx-auto space-y-6">
          <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">Email address</span>
              <Input type="username" name="email" placeholder="example@example.com" className="mt-1" />
            </label>
            <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <NcLink href="/forgot-pass" className="text-sm underline">
                Forgot password?
              </NcLink>
            </span>
              <Input type="password" name="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
          New user? <NcLink href="/signup">Create an account</NcLink>
        </span>
        </div>
      </Layout>
  );
};

export default PageLogin;
