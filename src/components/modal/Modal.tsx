import type { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { useNotesContext } from "../../contexts/NotesContext";


const Modal = ({children}:PropsWithChildren) =>{
    const {modalType,closeModal,setTitle,setContent,setId} = useNotesContext();
    const onclickHandler = ()=>{
        if(modalType==="formPage"){
        closeModal();
        setTitle('');
        setContent('');
        setId('');
    }else{
        closeModal();
    }
    }
    //     switch(modalType){
    //         case 'formPageModal' : {
    //             setModalType('');
    //             setTitle('');
    //              setContent('');
    //              setId('');
    //              break;
    //         }

            

    //     }
    // } 

    return(
        <div className={styles.overlay} onClick={onclickHandler}>
            <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
            {children}
            </div>
        </div>
    )
}
export default Modal;