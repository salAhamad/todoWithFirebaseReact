import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function ResetPassword() {
    
    const { resetPassword } = useUserAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if(email) {
            try {
                await resetPassword(email);
                setEmail('');
                navigate('/home');

            } catch (error) {
                setError(true)
                setErrorMessage(error)
            }
        } else {
            setError(true)
            setErrorMessage('Email field is required, and Email must be registered.')
        }
    }

    return (
        <div className="form-main-container">
            <div className="form-container">
                <div className="top-heading text-center mb-4 px-4">
                    <h3 className='fw-bold mb-3'>Reset Password</h3>
                    <p className='text-muted'>Enter below your registered Email Id where you will recieve reset link.</p>
                </div>
                <form action="" className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                    <input 
                        onChange={e => setEmail(e.target.value) } 
                        type="email" 
                        className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
                        placeholder='Enter Email' />
                    
                    {error && <div className="alert alert-danger py-2 w-100">{errorMessage}</div>}

                    <button onClick={e => onSubmit(e) } className='btn btn-warning btn-lg text-uppercase fw-bold px-5'>Reset Password</button> 
                    
                    <Link to='/' className='f-italic text-muted mt-2 text-decoration-none'>
                        <i className="fa-solid fa-arrow-left-long me-2"></i>
                        Back to Login
                    </Link>
                    
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
