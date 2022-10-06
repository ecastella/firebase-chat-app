import React from 'react'
import { useAuth } from '../../hooks/useAuth';
import './styles.css';

function UnauthenticatedApp() {
   const { login } = useAuth();
    return (
        <>
        <h2>Login to join chat!</h2>
        <div>
            <button onClick={login} className="login">
                Login with Google
            </button>
        </div>
        </>
    
  );
}

export { UnauthenticatedApp };