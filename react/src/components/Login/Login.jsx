import React from 'react'
import { useRef, useState, useEffect} from 'react';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');
  return (
    <div>
        
    </div>
  )
}

export default Login