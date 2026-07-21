import { Outlet } from "react-router-dom"
import styles from './authLayout.module.css';
const AuthLayout = () => {
  return (
    <div className={styles.container}>
      <Outlet/>
    </div>
  )
}

export default AuthLayout;