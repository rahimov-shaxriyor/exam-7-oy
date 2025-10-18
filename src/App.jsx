import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo } from './features/todoSlice'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  const todo = useSelector(state=>state.todo.todoList)
  const dispatch = useDispatch()

  const inputText = useRef(null)

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(inputText.current.value.trim() !="" && inputText.current.value!=null){
      dispatch(addTodo(inputText.current.value))
      toast.success("Qo'shildi")
      
    }else{
      toast.error("Todoni kiritmadingiz")
    }
    e.target.reset()
    
  }
  return (
    <div>
      <ToastContainer autoClose={2000}/>
      <div className="container flex flex-col items-center">
        <form onSubmit={handleSubmit} className='w-full max-w-[40.625rem] flex justify-center gap-[.625rem] mb-[1.875rem] mt-[.625rem]'>
          <input ref={inputText} className="input input-primary" type="text" placeholder='Todoni kiriting...' />
          <button className='btn btn-primary'>+</button>
        </form>
        <ul className='w-full max-w-[43.75rem] flex flex-col gap-[1.25rem]'>
          {todo.map(t=>(
            <li key={t.id} className='flex justify-between items-center shadow-md rounded-[.625rem] p-[.625rem]'>
              <p>{t.text}</p>
              <div className='flex gap-[.625rem]'>
                <button className="btn btn-warning" onClick={()=>{dispatch(editTodo(t.id)), toast.success("Tahrirlndi")}}>tahrirlash</button>
                <button className="btn btn-error" onClick={()=>{dispatch(deleteTodo(t.id)), toast.success("O'chirildi")}}>o'chirish</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default App