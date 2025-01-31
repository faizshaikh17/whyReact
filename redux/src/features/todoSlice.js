import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{ id: 1, text: "Do the necessary!!" }]
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload
            state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.text = text
                }
                console.log()

            })
        }
    }
})

const todoReducer = todoSlice.reducer;
export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoReducer;