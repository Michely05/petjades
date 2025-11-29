import { Link } from "react-router-dom"

export const DashboardSidebar = () => {
    return (
        <div>
            <li ><Link className="hover:text-(--primary-color)" to="/">ANIMALS</Link></li>
            <li ><Link className="hover:text-(--primary-color)" to="/sollicituds">SOL·LICITUDS</Link></li>
            <li ><Link className="hover:text-(--primary-color)" to="/agenda">AGENDA</Link></li>
            <li ><Link className="hover:text-(--primary-color)" to="/configuracio">CONFIGURACIÓ</Link></li>
        </div>
    )
}