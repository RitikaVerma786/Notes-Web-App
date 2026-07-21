import Form from "../form/Form";
import closeIcon from "../../assets/close.png";
import styles from "./FormPage.module.css";
import { useNotesContext } from "../../contexts/NotesContext";

const FormPage = ()=>{
    const {closeModal,setTitle,setContent} = useNotesContext();
    const onclickHandler = ()=> {
        closeModal();
        setTitle('');
        setContent('');
    }
    return(
        <div className={styles.formPageContainer}>
            <div className={styles.heading}>
                <img src={closeIcon} alt="close" onClick={onclickHandler}/>
            <h2>Create a new note &nbsp; & &nbsp; Capture your thoughts !&#127804;</h2>
            </div>
            <div className={styles.form}>
            <Form/>
            </div>
        </div>
    )
}

export default FormPage; 