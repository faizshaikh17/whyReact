import { useEffect, useState } from 'react'
import './App.css'
import './context/index'
import { TodoProvider } from './context/context'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {

  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
    setCounter(counter + 1)

  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : console.log(prevTodo))))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => (todo.id !== id)))
    setCounter(counter - 1)
  }

  const toggle = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const [counter, setCounter] = useState(0)


  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggle }}>
      <div className=" w-full h-screen ">
        <div className="w-full max-w-2xl mx-auto shadow-md bg-[#f7f6e4] rounded-lg px-4 py-3 text-green-600">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Why Manage Your Todos | Total : {counter}</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (<div key={todo.id} className='w-full'>
              <TodoItem todo={todo} />
            </div>))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
