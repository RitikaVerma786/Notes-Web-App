import { useNotesContext } from "../../contexts/NotesContext";
import type { Note } from "../../types/notes";
import {toast} from 'react-toastify';

import styles from "./Card.module.css";
import emptyStar from "../../assets/emptyStar.png";
import fillStar from "../../assets/fillStar.png";
import editIcon from "../../assets/editIcon.png";
import binIcon from "../../assets/binIcon1.png";
import { useState } from "react";
import { favsToggleReq } from "../../apis/notesApi";

interface props {
  note: Note;
}
const Card = (props: props) => {
  const {
    favNotesIds,
    setfavNotesIds,
    openFormPageModal,
    openDeleteModal,
    notes,
    setTitle,
    setContent,
    setId,
    setButtonText,
  } = useNotesContext();
  const { note } = props || {};
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const isLongContent = note.content.length > 300;
  console.log('longCOnte=====',isLongContent)

  const displayText = isExpanded?  note.content :note.content.slice(0, 300) ;

  const onEditHandler = (id: string) => {
    const editNote = notes.find((note) => note._id == id);
    if(!editNote) return
    openFormPageModal();
    setButtonText("Edit");
    setTitle(editNote.title);
    setContent(editNote.content);
    setId(editNote._id);
  };

  const onDeleteHandler = (id: string) => {
    openDeleteModal(id);
  };

  const favsHandler = async (id: string)=>{
    try{
      const res = await favsToggleReq(id);
      console.log(res);
      if(res.status===200 || res.status===201){
        console.log(res)
        if( res.data.message==="Added to favourites"){
          console.log("added in favs....",res.data)
          toast.success('Successfully added in favourites, view in favuorites section!')
         setfavNotesIds(prev=> {
          return [
            ...prev,res.data.noteId
          ]
         })
        }else{
          setfavNotesIds(prev=>{
            return prev.filter(id=> id!==res.data.noteId)
          })
          toast.success('Removed from favourites!')
          console.log("removed from favs....",res.data)
        }
      }  
    }catch(err:any){
      console.log(err);
      toast.error(err.response.data.message);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.favIcon}>
          {favNotesIds.includes(note._id) ? (
            <img
              src={fillStar}    
              alt="favIcon"                 
              onClick={() => favsHandler(note._id)}
            />
          ) : (
            <img
              src={emptyStar}
              alt="favIcon"
              onClick={() => favsHandler(note._id)}
            />
          )}
        </div>
        <h2>{note.title}</h2>
              <div className={styles.contentSection}>
              <p>
                {displayText}
                {!isExpanded && isLongContent && "....."}{" "}
                {isLongContent &&(
                  <span onClick={()=>setIsExpanded(prev=> !prev)}>{isExpanded? "Show Less" : "Read More" }</span>
                )} 
              </p>  
              </div>
            </div>
      <div className={styles.btns}>
        <img
          src={editIcon}
          alt=""
          onClick={() => onEditHandler(note._id)}
          className={styles.editIcon}
        />
        <img
          src={binIcon}
          alt=""
          onClick={() => onDeleteHandler(note._id)}
          className={styles.binIcon}
        />
      </div>
    </div>
  );
};
export default Card;
