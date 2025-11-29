import { Link } from "react-router-dom";
import { useState } from "react";
import hamburgerMenuIcon from "../assets/icons/hamburger-menu-icon.svg";
import "animate.css";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-6 py-4 font-body bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* logo */}
        <Link to="/" className="text-2xl font-title font-bold text-(--primary-color)">
          PETJADES
        </Link>

        {/* menu */}
        <ul className="hidden md:flex gap-10 text-lg">
          <li><Link className="hover:text-(--primary-color)" to="/adopta-gats">GATS</Link></li>
          <li><Link className="hover:text-(--primary-color)" to="/adopta-gossos">GOSSOS</Link></li>
          <li><Link className="hover:text-(--primary-color)" to="/collabora">COL·LABORA</Link></li>
          <li><Link className="hover:text-(--primary-color)" to="/nosaltres">NOSALTRES</Link></li>
          <li><Link className="hover:text-(--primary-color)" to="/acces-privat">ACCÉS PRIVAT</Link></li>
        </ul>

        {/* mobile hamburger button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}>
            <img src={hamburgerMenuIcon} alt="Menú" className="w-8 h-8"/>
        </button>

      </div>

      {/* mobile dropdown Menu */}
      {isOpen && (
        <ul className="animate__animated animate__fadeInUp md:hidden flex flex-col gap-4 mt-4 p-6 text-center text-lg">
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-(--primary-color)" to="/adopta-gats">GATS</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-(--primary-color)" to="/adopta-gossos">GOSSOS</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-(--primary-color)" to="/collabora">COL·LABORA</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-(--primary-color)" to="/nosaltres">NOSALTRES</Link></li>
          <li><Link onClick={() => setIsOpen(false)} className="hover:text-(--primary-color)" to="/acces-privat">ACCÉS PRIVAT</Link></li>
        </ul>
      )}
    </nav>
  );
};
