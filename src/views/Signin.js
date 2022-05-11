import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/UserAuthContext'


function Signin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { logIn } = useUserAuth();
    const navigate = useNavigate();
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email && password) {
            try {
                await logIn(email, password);
                setError(false);
                setErrorMessage('');
                navigate('/home')
            } catch (error) {
                setError(true);
                setErrorMessage(error.message);
            }            
        } else {
            setError(true);
            setErrorMessage('All Fields are required');
        }
    }

    return (
        <div className="form-main-container">
            <div className="form-container">
                <div className="top-heading text-center mb-4">
                    <h3 className='fw-bold mb-3'>Sign In</h3>
                    <p className='text-light'>Login with your registered email Id.</p>
                </div>
                <form action="" className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                    <input onChange={e => setEmail(e.target.value) } type="email" className="form-control form-control-lg" placeholder='Enter Email' />
                    <input onChange={e => setPassword(e.target.value) } type="password" className="form-control form-control-lg" placeholder='Enter Pasword' />

                    {error && <div className="alert alert-danger py-2 w-100">{errorMessage}</div>}

                    <button onClick={e => onSubmit(e) } className='btn btn-warning btn-lg text-uppercase fw-bold px-5'>Sign In</button> 
                    
                    <Link to='/reset-password' className='f-italic text-muted mt-2 text-decoration-none' style={{fontStyle: 'italic'}}>Forgot your Pasword?</Link>
                    
                    <hr className='w-100 mb-2 mt-0' />
                    
                    <p className='text-secondary text-center'>
                        Don't have an account? 
                        <br />
                        <Link to='/signup' className="btn btn-sm btn-secondary mt-3">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signin