import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useUserAuth } from '../contexts/UserAuthContext'

function Header({ userLogedIn }) {

  const { logOut } = useUserAuth();
  const onSubmit = () => {
    logOut();
    <Navigate to="/" />
  }

  return (
    <header className='bg-dark d-flex justify-content-between align-items-center py-3 px-4 text-white'>
      <Link to='/home' className='text-decoration-none'>
        <h5 className='text-uppercase m-0 text-white'>App Logo</h5>
      </Link>
      <div className="buttons d-flex align-items-center gap-3">
        {
          userLogedIn ? <>
            <button onClick={ onSubmit } className="btn btn-outline-warning px-3">Log Out</button>
          </> : <>
            <Link to='/' className="btn btn-outline-warning px-3">Sign In</Link>
            <Link to='/signup' className="btn btn-primary px-3">Sing Up</Link>
          </>
        }

      </div>
    </header>
  )
}

export default Header