import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../config/firebase"
import { useState } from "react"

export function AddTodo({setAddTodo,addTodo,isLogin,todos}) {

    const [newTodo,setNewTodo] = useState([])

    const addTodoSubmit = async (e) => {
        e.preventDefault()
        if (isLogin) {
            const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
            const user = auth.currentUser
            const newTd = {
                    id: maxId+1,
                    uId: user.uid,
                    title: newTodo,
                    status: false
            }
            try {
                await addDoc(collection(db,'todos'), newTd)
                setNewTodo('')
                setAddTodo(!addTodo)
            } catch (error) {
                console.log(error.code)
            }
        }
    }
    
    return (
        <>
            <div className="h-screen w-screen bg-black/50 absolute z-[999] right-0 left-0 top-0 flex justify-center items-center p-3">
                <form action=""
                    className="bg-blue-300 dark:bg-gray-300 p-5 rounded space-y-5 lg:w-1/2 w-full"
                    onSubmit={addTodoSubmit}
                >
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold text-blue-900">Add Todo</h1>
                        <button 
                            className="bg-red-700 px-3 text-white rounded"
                            onClick={()=>setAddTodo(!addTodo)}
                        >
                            X
                        </button>
                    </div>
                    <div className="flex w-full bg-white rounded">
                        <div className="w-full">
                            <input 
                                type="text" 
                                name="newTodo" 
                                id="newTodo" 
                                className="w-full p-5 rounded focus:outline-none" 
                                value={newTodo}
                                onChange={(e)=>setNewTodo(e.target.value)}
                                minLength={2}
                                required
                            />
                        </div>
                        <div>
                            <button className="p-5 rounded bg-blue-900 text-white">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}