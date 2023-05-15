import { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import {TaskCard} from "./TaskCard"
import { Link } from "react-router-dom"

export function TasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const res = await getAllTasks();
            setTasks(res.data);
        }
        loadTasks();
    }, []);

    return (
        <div>
            <Link to="/tasks-create">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg my-5">create task
                </button>
            </Link>
            <div className="grid grid-cols-3 gap-3">
                {tasks.map(task => (
                    <TaskCard task={task} key={task.id}/>
                ))}
            </div>
        </div>

    )
}