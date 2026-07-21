
import Card from "../cards/Card";
import styles from "./DiplayNotes.module.css";
import type { Note } from "../../types/notes";


interface Props {
  displayNotes:Note[];
}


const DisplayNotes = (props: Props) => {
  
  const {displayNotes} = props || {};
  return (
    <div className={styles.cardsOuterContainer}>
      <div className={styles.cardsContainer}>
          { displayNotes.map(note=>(
            <Card note={note} key={note._id}/>
          ))
         
        }
      </div>
    </div>
  );
};
  export default DisplayNotes;
