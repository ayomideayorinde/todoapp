import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";
import { useState } from "react";


// const tod = [
//     {sn: 1, td: 'Go to market', status: 'Completed'},
//     {sn: 2, td: 'Go to work', status: 'Pending'},
//     {sn: 3, td: 'Go to bank', status: 'Completed'},
//     {sn: 4, td: 'Go to shop', status: 'Pending'},
//     {sn: 5, td: 'Go to park', status: 'Completed'}
// ]

export function TodoList({currentUser,isLogin}) {
    const [ todos, setTodos ] = useState([])

    // console.log(todos.title)
    useEffect(()=>{
        const unsubscribe = onSnapshot(collection(db, 'todos'),(snapshot)=>{
            const data = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }))
            setTodos(data)
        })
        return ()=>unsubscribe()
    },[])

    const th = "px-6 py-3 text-left text-xs font-bold uppercase";

    return (
        <>
            <div className="lg:px-60 px-3 overflow-hidden">
                <p className="text-blue-800 dark:text-black lg:text-3xl text-xl font-semibold flex-wrap mb-5"
                >
                    {isLogin?'Welcome':''} <br />
                    <span className="text-black dark:text-black decoration-0">
                        {isLogin? ` ${currentUser}!`:''}
                    </span>
                </p>
                <div
                    className="flex justify-end mb-3"
                >
                    <button className="bg-blue-900 px-3 py-1 text-white text-4xl rounded">+</button>
                </div>
                <div
                    className="w-full overflow-x-auto rounded shadow"
                >
                    <table className="min-w-full bg-blue-200 dark:bg-gray-500">
                        <thead className="bg-blue-900 dark:bg-black text-white">
                            <tr>
                                <th className={`${th} w-[5%]`}>S/N</th>
                                <th className={`${th} w-[70%]`}>TODO</th>
                                <th className={`${th} w-[15%]`}>STATUS</th>
                                <th className={`${th} w-[10%]`}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900 dark:divide-white text-blue-900 dark:text-white">
                            {todos.map((td)=>(
                                <tr className="hover:bg-blue-900 hover:text-white dark:hover:bg-black transition" key={td.id}>
                                    <td className="px-6 py-4">{td.id}</td>
                                    <td className="px-6 py-4">{td.title}</td>
                                    <td className="px-6 py-4">{td.status}</td>
                                    <td className="flex justify-between px-6 py-4 gap-2">
                                        <button className="px-2 py-0 bg-green-500 rounded">G</button>
                                        <button className="px-2 py-0 bg-red-500 rounded">D</button>
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