import { Link } from "react-router-dom"

export const DashboardSidebar = () => {
    return (
        <div>
            <ul>
                <li><Link to="/dashboard/private-animals" className="hover:text-(--primary-color)">ANIMALS</Link></li>
                <li><Link to="/dashboard/sollicituds" className="hover:text-(--primary-color)">SOL·LICITUDS</Link></li>
                <li><Link to="/dashboard/agenda" className="hover:text-(--primary-color)">AGENDA</Link></li>
            </ul>
        </div>
    )
}