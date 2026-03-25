
const todo = [
    {sn: 1, td: 'Go to market', status: 'Completed'},
    {sn: 2, td: 'Go to work', status: 'Pending'},
    {sn: 3, td: 'Go to bank', status: 'Completed'},
    {sn: 4, td: 'Go to shop', status: 'Pending'},
    {sn: 5, td: 'Go to park', status: 'Completed'}
]

export function TodoList() {

    const th = "px-6 py-3 text-left text-xs font-bold uppercase";

    return (
        <>
            <div className="lg:px-60 px-3">
                <div
                    className="flex justify-end mb-3"
                >
                    <button className="bg-blue-900 px-3 py-1 text-white text-4xl rounded">+</button>
                </div>
                <div
                    className="w-full overflow-x-auto rounded shadow"
                >
                    <table className="min-w-full bg-blue-300 dark:bg-gray-500">
                        <thead className="bg-blue-900 dark:bg-black text-white">
                            <tr>
                                <th className={`${th} w-[5%]`}>S/N</th>
                                <th className={`${th} w-[70%]`}>TODO</th>
                                <th className={`${th} w-[15%]`}>STATUS</th>
                                <th className={`${th} w-[10%]`}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-900 dark:divide-white dark:text-white">
                            {todo.map((td)=>(
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition" key={td.sn}>
                                    <td className="px-6 py-4">{td.sn}</td>
                                    <td className="px-6 py-4">{td.td}</td>
                                    <td className="px-6 py-4">{td.status}</td>
                                    <td className="flex justify-between px-6 py-4">
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