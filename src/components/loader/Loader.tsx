import React from 'react'
import { ClipLoader } from "react-spinners";

import {useNotesContext} from "../../contexts/NotesContext";
const Loader = () => {
    const {loader} = useNotesContext(); 
  return (
    <>
    {(loader && <ClipLoader/>)}
    </>
  )
}

export default Loader;