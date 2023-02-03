import React from 'react'

export default function Todo({ todo, toggleTodo }) {
    function handleAddTodo() {
        toggleTodo(todo.id)
    }
    return (
        <div class="border-2 border-gray-200 rounded-xl mb-2 p-2 relative">
            <input type="checkbox" checked={todo.complete} onChange={handleAddTodo}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <div class="pl-2 flex-1 break-words">{todo.name}</div>
        </div>
    )
}
