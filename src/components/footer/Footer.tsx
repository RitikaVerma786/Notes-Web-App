import { useNavigate } from "react-router-dom";
import sidebarImg from "../../assets/sidebarImg.png";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Footer.module.css"
import { useNotesContext } from "../../contexts/NotesContext";
const Footer = ()=>{
    const {setNotes,notes} = useNotesContext();
    const navigate = useNavigate();
    const onclickHandler = ()=>{
         setNotes([]); 
        localStorage.removeItem('token')
        console.log("notes...",notes);
        navigate('/');
        window.location.reload();
    }
    return(
        <div className={styles.footer}>
            <img src={sidebarImg} alt="" />
            <button onClick={onclickHandler}>Log Out</button>
        </div>
    )
}
export default Footer;