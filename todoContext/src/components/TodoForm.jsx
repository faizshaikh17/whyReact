import React, { useState } from 'react'
import { useTodo } from '../context/context';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const { addTodo } = useTodo()



    const add = (e) => {
        e.preventDefault();
        addTodo({ todo, completed: false });
        setTodo("");
    }




    return (
        <form className="flex" onSubmit={add}>
            <input
                value={todo}
                onChange={(e) => { setTodo(e.target.value) }}
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 py-1.5"
            />
            <button type="submit" disabled={!todo} className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>                                     
        </form>
    );
}

export default TodoForm;

