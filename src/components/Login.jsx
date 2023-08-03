import React, { useState } from 'react';
import supabase from '../supabase';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        const { user, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setError(error.message);
        } else {
          onLogin(user);
        }
      } else {
        const { user, error } = await supabase.auth.signIn({ email, password });
        if (error) {
          setError(error.message);
        } else {
          onLogin(user);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  /* github login */
  const login = async() => {
    await supabase.auth.signInWithOAuth({
      provider: "github"
    })
  }

  return (
    <div>
      {/* <button onClick={login}>Login</button> */}
      <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleAuth}>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p>{error}</p>}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      </form>
      <p onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login here' : "Don't have an account? Sign up here"}
      </p>
    </div>
  );
};

export default Login;