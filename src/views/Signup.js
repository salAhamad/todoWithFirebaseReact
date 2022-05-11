import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/UserAuthContext';

function Signup() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const { signUp } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(firstName && lastName && email && password) {
            try {
                await signUp(email, password, firstName, lastName);       
                navigate('/home');
            } catch (error) {
                setError(true)
                setErrorMessage(error.message);
            }
        } else {
            setError(true)
            setErrorMessage("All fields are required.");
        }
        setError(false)
        setErrorMessage('');

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className="form-main-container">
            <div className="form-container"> 
                <div className="top-heading text-center mb-4">
                    <h3 className='fw-bold mb-3'>Sign Up</h3>
                    <p className='text-light'>Register your account with your email Id.</p>
                </div>
                <form action="" className='d-flex flex-column gap-3 justify-content-center align-items-center'>
                    
                    <input onChange={ e => setFirstName(e.target.value) } type="text" className="form-control form-control-lg" placeholder='Enter First Name' />
                    <input onChange={ e => setLastName(e.target.value) } type="text" className="form-control form-control-lg" placeholder='Enter Last Name' />
                    <input onChange={ e => setEmail(e.target.value) } type="email" className="form-control form-control-lg" placeholder='Enter Email' />
                    <input onChange={ e => setPassword(e.target.value) } type="password" className="form-control form-control-lg" placeholder='Enter Password' />
                    
                    {error && <div className="alert alert-danger py-2 w-100">{errorMessage}</div>}

                    <button onClick={e => handleSubmit(e) } className='btn btn-warning btn-lg text-uppercase fw-bold px-5'>Sign Up</button>

                    <hr className='w-100 mb-2 mt-0' />
                    <p className='text-secondary text-center'>
                        Already have an account? 
                        <br />
                        <Link to='/' className="btn btn-sm btn-secondary mt-3">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup