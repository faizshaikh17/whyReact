import { createContext, useContext } from "react";

export const todoContext = createContext({
    todos: [{
        id: 1,
        todo: "",
        completed: false
    }],
    addTodo: (todo) => { },
    updateTodo: (id, todo) => { },
    deleteTodo: (id) => { },
    toggle: (id) => { },
});

export const useTodo = () => {
    return useContext(todoContext)
}

export const TodoProvider = todoContext.Provider;