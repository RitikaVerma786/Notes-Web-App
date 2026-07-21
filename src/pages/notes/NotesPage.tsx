import { Suspense, useEffect, useState } from "react";
import { lazy } from "react";
import { useNotesContext } from "../../contexts/NotesContext";
import { getFavNotes, getNotesReq } from "../../apis/notesApi";

import Loader from "../../components/loader/Loader";
import styles from "./NotesPage.module.css";
import NotFoundImg from "../../assets/notFoundImg.png";
import EmptyNotes from "../../assets/EmptyNotes.png";
import Header from "../../components/header/Header";
import SearchBar from "../../components/search/SearchBar";
import NewNoteBtn from "../../components/newNoteBtn/NewNoteBtn";
const DisplayNotes = lazy(
  () => import("../../components/displayNotes/DisplayNotes"),
);
// import DisplayNotes from "../../components/displayNotes/DisplayNotes";

const NotesPage = () => {
  const { notes, setNotes, setLoader,setfavNotesIds,favNotesIds } = useNotesContext();
  const [isDisplayFavs, setIsDisplayfavs] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [debounceVal, setDebounceVal] = useState("");
  const [activeBtnId, setActiveBtnId] = useState("");
  const btnIds = ["All", "Favourites"];
  console.log("notes", notes);
  
  let displayNotes = notes;
  console.log('display notes after re render..',displayNotes)
  console.log('isDisplayFavs state==>',isDisplayFavs)
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("indide api useffect..");
    const fetchNotes = async () => {
      console.log("try..");
      try {
        setLoader(true);
        const res = await getNotesReq();
        console.log(res.data);
        setNotes(res?.data);
        setLoader(false);
      } catch (err) {
        console.log("Error fetching notes!", err);
      }
    };
    fetchNotes();
  }, []);

  useEffect(()=>{
    const fetchFavNotes = async ()=>{
      try{
        const res = await getFavNotes();
        console.log("favNOtesIds data==>",res);
        setfavNotesIds(res.data.favNotesIds)
       setTimeout(()=>{
        console.log(favNotesIds)
       },3000) 
      }catch(err:any){
        console.log(err.response.message)
      }

    }
    fetchFavNotes();
  },[])


  useEffect(() => {
    console.log("inide useeffect");
    const timer = setTimeout(() => {
      setDebounceVal(searchVal);
    }, 1000);

    return () => {
      clearTimeout(timer);
      console.log("clearing time out ");
    };
  }, [searchVal]);

  if (debounceVal.trim() !== "") {
    console.log("search");

    displayNotes = displayNotes.filter((note) => {
      if (
        note.title.toLowerCase().includes(debounceVal.toLowerCase()) ||
        note.content.toLowerCase().includes(debounceVal.toLowerCase())
      ) {
        return note;
      }
    });
  }


  if (isDisplayFavs) displayNotes = notes.filter((note) =>favNotesIds.includes(note._id));

  console.log("display notes after getting favs==>",displayNotes);
  
  const notFound = displayNotes.length === 0;

  const onclickHandler = async (id: string) => {
    setActiveBtnId(id);
     if (id === "Favourites"){
      setIsDisplayfavs(true)
     }else setIsDisplayfavs(false)
  };
  return (
    <>
      <div className={styles.container}>

        <div className={styles.notesPageHeader}>
          <h1>MY NOTES</h1>
          <div className={styles.headerSection2}>
      
          {/* <Header searchVal={searchVal} setSearchVal={setSearchVal} /> */}
          <SearchBar searchVal={searchVal} setSearchVal={setSearchVal}/>
        <NewNoteBtn/>
        </div>
        </div>  
          <div className={styles.btns}>
            {btnIds.map((id) => (
              <button
                key={id}
                onClick={() => onclickHandler(id)}
                className={
                  activeBtnId === id ? styles.highlightedBtn : styles.displayBtns
                }
              >
                {id}
              </button>
            ))}
          </div>
        <div className={styles.notesContainer}>
          {notes.length !== 0 ? displayNotes.length === 0 ? (
            <div className={styles.notFound}><img src={NotFoundImg} alt="Not Found" /></div>
          ) :
             (
            <Suspense fallback={<Loader />}>
              <DisplayNotes displayNotes={displayNotes} />
            </Suspense>
          )
          :
          ( <div className={styles.notFound}> <img src={EmptyNotes} alt="Empty Notes"/></div>)
          
       }
        </div>
      </div>
    </>
  );
};

export default NotesPage;
