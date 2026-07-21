
export interface Note{
    _id:string;
    title:string;
    content:string;
}
export interface FormData{
    title:String,
    content:String
}


export type ModalType = 'formPage' | 'delete' | 'profile' | null;

export interface Notes{
    notes:Note[];
    setNotes:React.Dispatch<React.SetStateAction<Note[]>>;
    favNotesIds:string[];
    setfavNotesIds:React.Dispatch<React.SetStateAction<string[]>>;
    modalType:ModalType;
    modalData:any;
    openFormPageModal:()=> void;
    openDeleteModal:(id:string)=>void;
    openProfileModal:()=>void;
    closeModal: ()=> void;
    title:string;
    setTitle:React.Dispatch<React.SetStateAction<string>>;
    content:string;
    setContent:React.Dispatch<React.SetStateAction<string>>;
    id:string;
    setId:React.Dispatch<React.SetStateAction<string>>;
    buttonText:string;
    setButtonText:React.Dispatch<React.SetStateAction<string>>;
    loader:boolean;
    setLoader:React.Dispatch<React.SetStateAction<boolean>>;
    isProfilePic:boolean;
    setIsProfilePic:React.Dispatch<React.SetStateAction<boolean>>;
    profile:string;
    setProfile:React.Dispatch<React.SetStateAction<string>>;

}