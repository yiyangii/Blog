import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
    const history = useNavigate();

    const handleLoginClick = () => {
        history("/login");
    };

    return (
        <button
            onClick={handleLoginClick}
            className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center cursor-pointer"
        >
            Login
        </button>
    );
}

export default LoginButton;
