import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    return storedTodos || []
  })
  const todoNameRef = useRef()

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }
  return (
    <>
      <div class="relative">
        <div class="text-3xl font-serif font-bold flex justify-center">
          <h1>Todo List</h1>
        </div>
        <div class="mt-10 flex justify-center">
          <div class="w-96">
            <div class="border-dotted border-2 border-black">
              <div class="h-80 overflow-auto">
                <ul>
                  <h2 class="m-2">Left To Complete : {todos.filter(todo => !todo.complete).length}</h2>
                  <div class="m-2">
                    <TodoList todos={todos} toggleTodo={toggleTodo} />
                  </div>
                </ul>

              </div>

            </div>
            <input class="shadow appearance-none border rounded w-max m-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-400 h-10" type="text" ref={todoNameRef} />
            <button onClick={handleAddTodo} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Add Todo</button>
            <button onClick={handleClearTodos} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Completed Todo</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
