import React from 'react'
import Header from '../components/Header'
import Todo from '../components/Todo'
import { TodoContextProvider } from '../contexts/TodoContext';
import { useUserAuth } from '../contexts/UserAuthContext';

export default function Home() {

  const { user } = useUserAuth();

  return (
    <>
      <Header userLogedIn={user} />
      <TodoContextProvider>
        <Todo userDetail={user} />
      </TodoContextProvider>
    </>
  )
}
