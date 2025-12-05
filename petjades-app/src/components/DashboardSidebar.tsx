import { Link, useLocation } from "react-router-dom";

export const DashboardSidebar = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `block px-6 py-3 text-lg font-medium
     hover:bg-green-100 hover:text-[--primary-color]
     transition-all duration-200
     ${location.pathname === path ? "bg-green-100 text-[--primary-color] font-semibold" : "text-gray-700"}`;

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col p-6">
      <nav className="space-y-2">
        <Link to="/dashboard/private-animals" className={linkClasses("/dashboard/private-animals")}>
          🐾 Animals
        </Link>
        
        <Link to="/dashboard/sollicituds" className={linkClasses("/dashboard/sollicituds")}>
          📝 Sol·licituds
        </Link>
        
        <Link to="/dashboard/agenda" className={linkClasses("/dashboard/agenda")}>
          📅 Agenda
        </Link>
      </nav>
    </aside>
  );
};
