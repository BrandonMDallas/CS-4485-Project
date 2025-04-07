import React from 'react'
import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
const LOGIN_URL = '/api/auth/login';


const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const usernameRef = useRef();
    const errRef = useRef();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() =>{
        usernameRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username,password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            console.log(LOGIN_URL);
            console.log(                JSON.stringify({ username: username, password:password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            const response = await axios.post(LOGIN_URL, JSON.stringify({username: username, password: password}), {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
                }
            );
            setUsername('');
            setPassword('');
            setSuccess(true);
            console.log(JSON.stringify(response?.data))
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth( {username, password, roles, accessToken})
            console.log(accessToken);
            } catch(err){
                console.log("ISSUE");
                if (!err?.response){
                    setErrMsg('No Server Response');
                }
                else if (err.response?.status === 400){
                    setErrMsg('Missing Username or Password;');
                } else if(err.response?.status === 401){
                    setErrMsg('Unauthorized');
                } else{
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
        }
    }

  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br/>
                <p>
                    <a href='#'>Go to Home</a>
                </p>
            </section>
        ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input 
            type="text" 
            id="username"
            ref={usernameRef}
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
             />
            <label htmlFor="password">Password:</label>
            <input 
            type="password" 
            id="password"
            ref={usernameRef}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
             />
             <button>Sign In</button>
        </form>
        <p>
            Need an Account?<br />
            <span className="line">
                {/*Router Link*/}
                <Link to="/register">Sign Up</Link>
                {/*<a href ="#">Sign Up</a>*/}
            </span>
        </p>
    </section>
    )}
    </>
  )
}

export default Login