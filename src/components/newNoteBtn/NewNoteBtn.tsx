import { useState } from "react";

import { useNotesContext } from "../../contexts/NotesContext";
import Modal from "../modal/Modal";
import styles from "./NewNoteBtn.module.css";

const NewNoteBtn = ()=>{
    const {openFormPageModal,setButtonText} = useNotesContext();
    const onclickHandler = () =>{
        console.log('openModal')
        openFormPageModal();
        setButtonText("Create")
    }

    return (
        <>
        <button onClick={onclickHandler} className={styles.addBtn}>+ Add New</button>
        </>
    )
}

export default NewNoteBtn;