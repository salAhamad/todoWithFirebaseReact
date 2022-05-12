import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "./UserAuthContext";

import { db } from "../firebase_config"
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc, where, query} from "firebase/firestore";

import { currentDateAndTime } from "../common"

const todoContext = createContext();

export function TodoContextProvider({children}) {
    const { user } = useUserAuth();
    // console.warn(user.uid)

    let editInputValue = "";
    
    const [todoItem, setTodoItem] = useState([]);

    async function loadAllTodoItems() {
        try {
            const todos = [];

            // User Based
            // const userTodoData = await getDocs(collection(db, "users"));
            // todoDataFromServer.forEach((doc) => {
            //     if(doc.id === user.uid) {
            //         const todoData = doc.data().todos;
            //         todos.push({
            //             id: doc.id,
            //             createdDate: todoData.createdAt,
            //             progress: todoData.progress,
            //             todo: todoData.todo,
            //         });
            //         setTodoItem(todos)
            //         return;
            //     }
            // });

            const generalTodoData = await getDocs(collection(db, "todos"));

            generalTodoData.forEach((doc) => {
                const todoData = doc.data();
                todos.push({
                    id: doc.id,
                    createdDate: todoData.createdDate,
                    progress: todoData.progress,
                    todo: todoData.todo,
                });
                setTodoItem(todos)
            });
        } catch (error) {
            console.log(error.message)
        }
    }
    async function addTodo(inputVal) {
        try {
            const valueToBeInserted = {
                createdDate: currentDateAndTime(),
                progress: false,
                todo: inputVal
            }
            await addDoc(collection(db, "todos"), valueToBeInserted).then(res => {
                setTodoItem([valueToBeInserted, ...todoItem])
            }).catch(error => alert(error.message));
        } catch (error) {
            console.log(error);
        }
    }
    function editTodo(todoId) {
        const getEditableItems = todoItem.filter(todo => todo.id === todoId)
        console.table(getEditableItems)
        editInputValue = 'Testing Text'
    }
    
    async function deleteTodo(docId) {        
        await deleteDoc(doc(db, "todos", docId)).then(res => {
            console.log(res);
        });
        const refinedData = todoItem.filter(todo => todo.id !== docId);
        setTodoItem(JSON.parse(JSON.stringify(refinedData)))
    }

    async function updateProgress(docId) {        
        const index = todoItem.findIndex(todo => todo.id === docId);
        await updateDoc(doc(db, "todos", docId), {
          progress: !todoItem[index].progress
        }).then(res => {
          console.log(res);
          const updatedData = todoItem;
          updatedData[index].progress = !todoItem[index].progress;
          setTodoItem(JSON.parse(JSON.stringify(updatedData)));
        }).catch(err => alert(err.message));
    }

    useEffect(() => {
        loadAllTodoItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <todoContext.Provider value={{
        todoItem, loadAllTodoItems, addTodo, updateProgress, deleteTodo, editTodo, editInputValue
    }}>{children}</todoContext.Provider>
}

export function useTodoData () {
    return useContext(todoContext)
}