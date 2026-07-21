
import { useState } from "react";
import {toast} from "react-toastify";

import styles from "./form.module.css";
import { useNotesContext } from "../../contexts/NotesContext";
import { createNotesReq, editNotesReq } from "../../apis/notesApi";
import type { FormData } from "../../types/notes";

const Form = () => {
  const {
    setNotes,
    closeModal,
    title,
    setTitle,
    content,
    setContent,
    id,
    setId,
    buttonText,
  } = useNotesContext();
  console.log("iddd...",id)

  const [isvalidate,setIsValidate] = useState(false);

  
  const validateFields = ()=>{
  if(title==="" || content===""){

        setIsValidate(true);
        return false;
    }
    return true;
  }
  
  async function createNotes(note:FormData) {
        try{
          const res = await createNotesReq(note);
          console.log("resposne==>",res);
          if(res.status===200){
            toast.success("New note created successfully!")
            setNotes(prev=> [...prev,res?.data]);
          }
           closeModal();
            setTitle("");
        setContent("");
        }catch(err:any){
          console.log("Error creating notes..",err)
          toast.error(err.response.data.message)
            
        }
  }
  async function editNotes(formData:FormData){
        try{
          const res = await editNotesReq(id,formData);
          console.log('req sent..')
          console.log(res);
          if(res.status===200){
            toast.success("Note Updated successfully")
            setNotes(prev=>{
              return prev.map(note=>{
                if(note._id=== res.data._id){
                  return {...res.data}
                }
                return note;
              })
            })
          }
           closeModal();
      setId("");
      setTitle("");
      setContent("");
        }catch(err:any){
          console.log(err);
          toast.error(err.response.data.message)
        }

      }


  const onsubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateFields()) return;
    if (id==='' && title && content) {
      //new note creation
      console.log("id not exists..");
      const newNote = {
          title: title,
          content: content,
        };
        createNotes(newNote); //api function call
  
    } else {
      //edit exiting note
      console.log("idddd..",id)
          const formData = {
          title: title,
          content: content,
        };

      console.log("id exits");
      editNotes(formData);
  
     
    }
  };


  return (
    <form onSubmit={onsubmitHandler}>
      <div className={styles.form}>
        <input type="hidden" id="editId" value={id} />
        <input
          type="text"
          placeholder="Enter Title for your new note..."
          id="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          maxLength={50}

        />
        <textarea
          name=""
          id="content"
          placeholder="Enter description for your new note..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        ></textarea>
        {isvalidate ?  <span>*Missing required fields. Please check above</span>:"" } 
      </div>

      <div className={styles.btnContainer}>
        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default Form;
