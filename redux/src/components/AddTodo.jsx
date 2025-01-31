
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, updateTodo } from '../features/todoSlice'

function AddTodo() {

    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const addTodoHandler = (e) => {
        e.preventDefault()
        dispatch(addTodo(input))
        setInput('')
    }
    const [isTodoEditable, setIsTodoEditable] = useState(null)

    const todos = useSelector(state => state.todos);
    const todo = todos.map((todo) => {
        todo.id == isTodoEditable
    })

    const editTodo = (todo) => {

        dispatch(updateTodo({ id: todo.id, text: input }))
        setIsTodoEditable(null);
        setInput("")
    }

    const [todoCompleted, setTodoCompleted] = useState(false);

    return (
        <>
            <div className='flex justify-center min-h-full'>
                <div className='w-2/5 my-32 text-center'>
                    <form onSubmit={addTodoHandler}
                        className="space-x-3 mt-12" >
                        <input
                            type="text"
                            className={`bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none  text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                            placeholder="Enter a Todo..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!input}
                            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                        >
                            {isTodoEditable === null ? "Add Todo" : "Update Todo"}
                        </button>
                    </form>

                    {/* --------------- */}


                    <ul className="list-none">

                        {todos.map((todo) => (
                            <li
                                className="mt-4 flex justify-between items-center bg-zinc-800 px-3 py-2 rounded"
                                key={todo.id}
                            >
                                <div className={` w-3/5 text-left py-0.5 px-2 ${todoCompleted ? "line-through" : ""} text-white `}>{todo.text}</div>
                                <div className='flex w-52 justify-between'>
                                    <button
                                        onClick={() => {
                                            setTodoCompleted((prev) => !prev)
                                        }}
                                        className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                                    >
                                        ✅
                                    </button>
                                    <button
                                        className="text-white bg-yellow-500 border-0 py-1 px-4 focus:outline-none hover:bg-yellow-600 rounded text-md"
                                        onClick={() => {
                                            setInput(todo.text)
                                            if (isTodoEditable === todo.id) {
                                                editTodo(todo)
                                                // dispatch(updateTodo(todo.id, todo.text))
                                            } else setIsTodoEditable(todo.id)
                                        }}
                                    >
                                        {isTodoEditable === todo.id ? "📁" : "✏️"}
                                    </button>
                                    <button
                                        onClick={() => dispatch(removeTodo(todo.id))}
                                        className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul >
                </div>
            </div>
        </>

    )
}

export default AddTodo
