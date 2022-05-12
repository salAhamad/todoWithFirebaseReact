import React from 'react'
import { useTodoData } from '../contexts/TodoContext'

function TodoList({ data }) {

  const { updateProgress, deleteTodo, editTodo } = useTodoData();

  const handleSubmit = (e) => {
    updateProgress(e.target.id)
  }

  const handleDelete = (e) => {
    deleteTodo(e.target.id)
  }
  // const handleEdit = (e) => {
  //   console.log(e.target.id)
  //   // editTodo(e.target.id)
  // }

  return (
    <div className="todo-list d-flex justify-content-between align-items-start gap-4 text-start">
        <div className="">
            <h5 className='d-flex flex-wrap align-items-center'>
              <span className={data.progress ? "text-decoration-line-through text-muted" : ''}>{data.todo}</span>
            </h5>
            <button 
              id={data.id}
              onClick={e => handleSubmit(e) }
              className={data.progress ? "btn btn-sm btn-success py-0 mt-2" : "btn btn-sm btn-warning py-0 mt-2"}>
              {data.progress && <i className="fa-solid fa-check me-2"></i>}
              {data.progress ? "Completed" : "In-progress"}
            </button>
        </div>
        <div className="actions d-flex gap-2">
            <button 
              type='button'
              id={data.id}
              // onClick={e => handleEdit(e)}
              onClick={e => editTodo(e.target.id)}
              className="btn btn-outline-info border-0 btn-sm">
              <i className="fa-solid fa-pencil-alt pe-none"></i>
            </button>
            <button 
              type='button'
              id={data.id} 
              onClick={e => handleDelete(e)}
              className="btn btn-outline-danger border-0 btn-sm">
              <i className="fa-solid fa-trash-alt pe-none"></i>
            </button>
        </div>
    </div>
  )
}

export default TodoList