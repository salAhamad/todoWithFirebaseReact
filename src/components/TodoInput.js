import React from 'react'

function TodoInput() {
  return (
    <div className="todo-input-container d-flex gap-2 mt-4 my-2 bg-transparent">
        <input type="text" className="form-control form-control-lg" placeholder="Enter your todo heading" />
        <button className="btn btn-warning btn-lg px-4">Submit</button>
    </div>
  )
}

export default TodoInput