
import styles from "./Header.module.css";

import { useAuth } from "../../contexts/AuthContext";
import { useNotesContext } from "../../contexts/NotesContext";


const Header = ()=>{
    const {loggedInUser} = useAuth();
    const {openProfileModal,profile} = useNotesContext();
    const firstLetter = loggedInUser?.firstName[0].toUpperCase();
    // const firstName = loggedInUser?.firstName[0]?.toUpperCase()+loggedInUser?.firstName?.slice(1,firstName.length) || '';

    const onclickHandler = ()=>{
        openProfileModal();
    }
    return(
        <>
        <div className={styles.headerContainer}>
            <p>Welcome, {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} &#128079;</p>
            <div className={styles.profile} onClick={onclickHandler}>
                {profile? <img src={profile} alt="profile" style={{height:"100%",width:"100%",objectFit:"cover"}} />:<div className={styles.profileIcon}>{firstLetter}</div>}
            </div>
        </div>
        </>
    )
}

export default Header; 