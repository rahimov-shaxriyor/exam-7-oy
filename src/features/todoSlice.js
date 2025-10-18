import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: JSON.parse(localStorage.getItem("todos")) || []
    },
    reducers:{
        addTodo: (state, action)=>{
            state.todoList.push({id: uuidv4(), text: action.payload})
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        },
        deleteTodo: (state, action)=>{
            state.todoList = state.todoList.filter(t=>t.id!=action.payload)
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        },
        editTodo: (state, action)=>{
            state.todoList = state.todoList.map(t=>{
                if(t.id == action.payload){
                    const newText = prompt('Yangi todoni kiriting', t.text)
                    return {...t, text: newText}
                }else{
                    return t
                }
            })
            localStorage.setItem("todos", JSON.stringify(state.todoList))
        }
    }
})
export const {addTodo, deleteTodo, editTodo} = todoSlice.actions
export default todoSlice.reducer