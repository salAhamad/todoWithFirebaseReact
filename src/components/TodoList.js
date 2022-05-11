import React from 'react'

function TodoList() {
  return (
    <div className="todo-list d-flex justify-content-between align-items-start gap-4 text-start">
        <div className="">
            <h5>Todo Heading should be here ...</h5>
            <button className="btn btn-sm btn-info py-0 mt-2">In-progress</button>
        </div>
        <div className="actions d-flex gap-2">
            <button className="btn btn-info btn-sm"><i className="fa-solid fa-pencil-alt"></i></button>
            <button className="btn btn-danger btn-sm"><i className="fa-solid fa-trash-alt"></i></button>
        </div>
    </div>
  )
}

export default TodoList