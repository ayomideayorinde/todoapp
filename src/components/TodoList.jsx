import { collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { AddTodo } from './AddTodo'
import { Check, Trash } from "lucide-react";



export function TodoList({currentUser,isLogin}) {
    const [ todos, setTodos ] = useState([])
    const [ addTodo, setAddTodo ] = useState(false)

    
    useEffect(()=>{
        const user = auth.currentUser

        if (!user) return;
        const unsubscribe = onSnapshot(query(collection(db, 'todos'),where('uId','==',user.uid)),(snapshot)=>{
            const data = snapshot.docs.map((doc)=>({
                docId: doc.id,
                ...doc.data()
            }))
            setTodos(data)
        })
        return ()=>unsubscribe()
    },[])

    const th = "px-6 py-3 text-left text-xs lg:text-2xl font-bold uppercase";

    return (
        <>
            { addTodo ? 
                <AddTodo 
                    isLogin={isLogin} 
                    addTodo={addTodo} 
                    setAddTodo={setAddTodo} 
                    todos={todos}
                    setTodos={setTodos}
                /> : 
                ''
            }
            <div className="lg:px-60 px-3 overflow-hidden">
                <p className="text-white lg:text-3xl text-xl font-semibold flex-wrap mb-5"
                >
                    {isLogin?'Welcome':''} <br />
                    <span className="text-white">
                        {isLogin? ` ${currentUser}!`:''}
                    </span>
                </p>
                <div
                    className="flex justify-end mb-3"
                >
                    <button 
                        className="bg-blue-900 px-3 py-1 text-white text-4xl rounded"
                        onClick={()=>setAddTodo(!addTodo)}
                    >
                        +
                    </button>
                </div>
                <div
                    className="w-full overflow-x-auto rounded shadow"
                >
                    <table className="min-w-full bg-blue-200 dark:bg-gray-500">
                        <thead className="bg-blue-900 dark:bg-black text-white">
                            <tr>
                                <th className={`${th} w-[70%]`}>TODO</th>
                                <th className={`${th} w-[15%]`}>STATUS</th>
                                <th className={`${th} w-[10%]`}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900 dark:divide-white text-blue-900 dark:text-white">
                            {todos.map((td)=>(
                                <tr className="hover:bg-blue-900 hover:text-white dark:hover:bg-black transition" key={td.docId}>
                                    <td className={`lg:text-2xl px-6 py-4 ${td.status? 'line-through':''}`}>{td.title}</td>
                                    <td className="lg:text-2xl px-6 py-4">{td.status ? 'Completed':'Pending'}</td>
                                    <td className="flex justify-between px-6 py-4 gap-2">
                                        <button 
                                            className="p-2 text-white bg-green-500 rounded"
                                            onClick={async ()=>(
                                                await updateDoc(doc(db,'todos',td.docId),{
                                                    status: !td.status
                                                })
                                            )}
                                        >
                                            <Check />
                                        </button>
                                        <button 
                                            className="p-2 text-white bg-red-500 rounded"
                                            onClick={async ()=>(
                                                await deleteDoc(doc(db,'todos',td.docId))
                                            )}
                                        >
                                            <Trash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}