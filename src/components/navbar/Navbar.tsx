import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({
              color: isActive ? "#312A50" : "white",
            })}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notes"
            style={({ isActive }) => ({
              color: isActive ? "#312A50" : "white",
            })}
          >
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            style={({ isActive }) => ({
              color: isActive ? "#312A50" : "white",
            })}
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
