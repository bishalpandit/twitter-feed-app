import React, { useState } from 'react'
import axios from "axios"
import { SERVER_URL } from "../config.keys";

function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        try {
            setLoading(true);
            const googleLoginURL: any = `${SERVER_URL}/auth/login`;
            window.location.href = googleLoginURL;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-black min-h-screen flex justify-center items-center max-w-[1500px] mx-auto">
            {/* <img src="/twitter.svg"  height={20} width={20} /> */}
            <button onClick={handleLogin} className='rounded-lg h-20 text-xl w-48 py-2 px-4 bg-sky-400 text-white'>Login</button>
        </div>
    )
}

export default Login;