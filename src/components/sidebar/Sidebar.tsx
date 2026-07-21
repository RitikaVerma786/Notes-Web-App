import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Logo from "../../assets/Logo2.png";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
    return(
        <div className={styles.sidebarContainer}>
            <div className={styles.logoSection}>
                <div className={styles.logo}>
                    <img src={Logo} alt="Logo" />
                </div>
                {onClose && (
                    <button className={styles.closeBtn} onClick={onClose}>
                        ✕
                    </button>
                )}
            </div>

            <div className="navbar">
                <Navbar/>
            </div>

            <div className={styles.footer}>
                <Footer/>
            </div>
        </div>
    )
}

export default Sidebar;