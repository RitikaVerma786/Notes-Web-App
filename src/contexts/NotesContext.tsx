import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

import type { Note, Notes, ModalType } from "../types/notes";

const NotesContext = createContext<Notes | null>(null);
export const NotesProvider = ({ children }: PropsWithChildren) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [favNotesIds,setfavNotesIds] = useState<string[]>([]);
  console.log(notes);

  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);

  const [isProfilePic,setIsProfilePic] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState("");
  const [buttonText, setButtonText] = useState("Create");
  const [loader,setLoader] = useState(false);
  const [profile, setProfile] = useState<string>("");
  
  const openFormPageModal = () => {
    setModalType("formPage");
    setModalData(null);
  };
  const openDeleteModal = (id:string) => {
    setModalType("delete");
    setModalData(id);
  };
  const openProfileModal = ()=>{
    setModalType('profile');
    setModalData(null);
  }
  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        favNotesIds,
        setfavNotesIds,
        title,
        setTitle,
        content,
        setContent,
        id,
        setId,
        buttonText,
        setButtonText,
        modalType,
        modalData,
        openFormPageModal,
        openDeleteModal,
        openProfileModal,
        closeModal,
        loader,
        setLoader,
        isProfilePic,
        setIsProfilePic,
        profile, 
        setProfile
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used inside NotesProvider");
  }
  return context;
};
