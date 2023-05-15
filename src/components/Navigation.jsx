import { Link } from "react-router-dom"

export function Navigation() {
    return (
        <div className="flex justify-between py-3">

            <Link to="/tasks">
                <h1 className="font-bold text-3xl mb-4">Task App</h1>
            </Link>



        </div>
    )
}