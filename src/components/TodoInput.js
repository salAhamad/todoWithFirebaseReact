import React, { useState } from 'react'
import { useTodoData } from '../contexts/TodoContext';

function TodoInput() {

  const [inputValue, setInputValue] = useState('')

  const [error, setError] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const { addTodo, editInputValue, editTodo } = useTodoData();

  const onSubmit = (e) => {
    e.preventDefault();

    if(inputValue) {
      addTodo(inputValue)            
      setInputValue('')      
      setError(false)
      setErrorMessage(null)    
    } else if(inputValue.length <= 2) {
      setError(true)
      setErrorMessage("Todo heading cannot be less than 3 characters");
    } else {
      setError(true)
      setErrorMessage("Note: Todo heading must be there");
    }
  }
  function editInputMethod() {
    editTodo()
    console.log(editInputValue)
  }
  

  return (
    <>
      <form className="todo-input-container d-flex gap-2 mt-4 my-2 bg-transparent">
          <input 
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            type="text" 
            className={error ? "form-control form-control-lg is-invalid" : "form-control form-control-lg"} 
            placeholder="Enter your todo heading" />
          <button onClick={ e => onSubmit(e)} className="btn btn-warning btn-lg fw-bold px-4">Submit</button>
      </form>
      {error && <p className='alert alert-danger text-start py-1'>{errorMessage}</p>}
    </>
  )
}

export default TodoInput