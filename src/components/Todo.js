import React from 'react'
import { useTodoData } from '../contexts/TodoContext';
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function Todo({ userDetail }) {

  const { todoItem } = useTodoData();

  return (
    <div className='todo-container text-center'>
        <div className="todo-sub-container">
            <h2 className='text-warning fw-bold text-uppercase mb-3'>Todo Application</h2>
            <h6 className='fw-medium text-uppercase text-muted' style={{letterSpacing: '.3rem'}}>ReactJs + Firebase</h6>
            <h6 className='fw-medium text-muted fw-normal mt-2'>
              User Email: <span className='text-info'>{userDetail.email}</span>
            </h6>
            
            <TodoInput />

            <div className="todo-list-container position-relative py-3 gap-3 d-flex flex-column">
              {
                todoItem.map((item, index) => {
                  return <TodoList key={index} />
                })
              }              
            </div>
        </div>
    </div>
  )
}

export default Todo