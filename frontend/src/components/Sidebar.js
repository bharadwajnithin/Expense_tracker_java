import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaChartBar, FaFileAlt, FaBars } from 'react-icons/fa';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  return (
    <div className={`sidebar bg-dark ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        {!collapsed && <h3 className="m-0">Expense Tracker</h3>}
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      </div>
      <div className="sidebar-content">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon"><FaHome /></span>
              {!collapsed && <span className="nav-text">Expenses</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon"><FaChartBar /></span>
              {!collapsed && <span className="nav-text">Dashboard</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon"><FaFileAlt /></span>
              {!collapsed && <span className="nav-text">Reports</span>}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar; 