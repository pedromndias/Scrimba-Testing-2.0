import React from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";

const KEY = "todoApp.todos";

export function App() {
    const [todos, setTodos] = React.useState([{
        id: 1,
        task: "Task 1",
        isCompleted: false
    }])

    const todoTaskRef = React.useRef()

    React.useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY))
        if(storedTodos) {
            setTodos(storedTodos)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos))
    }, [todos])

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.isCompleted = !todo.isCompleted;
        setTodos(newTodos);
    }

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task === "") return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuidv4(), task, isCompleted: false}]
        })

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.isCompleted)
        setTodos(newTodos)
    }

    return(
        <React.Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="New Task" />
            <button onClick={handleTodoAdd}>➕</button>
            <button onClick={handleClearAll}>🗑️</button>
            <div>
                You have {todos.filter((todo) => !todo.isCompleted).length} remaining task
            </div>
        </React.Fragment>
        
    )
} 