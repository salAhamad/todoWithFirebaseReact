import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";

import { doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase_config"

const todoContext = createContext();

export function TodoContextProvider({children}) {

    const { user } = useUserAuth();

    console.log(user.uid);

    const [todoItem, setTodoItem] = useState([]);

    async function loadAllTodoItems() {
        try {
            const todos = [];
            const todoDataFromServer = await getDocs(collection(db, "users"));
            // const todoDataFromServer = await doc(db, "users", user.uid);
            todoDataFromServer.forEach((doc) => {
                const todoData = doc.data().todos;
                todos.push({
                    id: doc.id,
                    createdDate: todoData.createdAt,
                    progress: todoData.progress,
                    todo: todoData.todo,
                });
                setTodoItem(todos)
            });
            
        } catch (error) {
            console.log(error.message)
        }

    }
    
    useEffect(() => {
        loadAllTodoItems();
    }, [])

    return <todoContext.Provider value={{
        loadAllTodoItems, 
        todoItem
    }}>{children}</todoContext.Provider>
}

export function useTodoData () {
    return useContext(todoContext)
}