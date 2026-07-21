import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { postUserProfileReq } from "../../apis/userApi";
import { useNotesContext } from "../../contexts/NotesContext";
import editImage from "../../assets/pen (1).png";
import closeIcon from "../../assets/close.png";
import styles from "./Profile.module.css";


const Profile = () => {
  const { closeModal, isProfilePic, setIsProfilePic, profile, setProfile } =
    useNotesContext();
  const { loggedInUser } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [edit, setEdit] = useState(false);
  const [showActionBtns, setshowActionBtns] = useState(false);
  const firstLetter = loggedInUser?.firstName[0].toUpperCase();

  useEffect(() => {
    setPreview(profile);
  }, []);

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files?.[0], e.target.files?.[1]);
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setshowActionBtns(true);
    }
    const previewURL = file ? URL.createObjectURL(file) : null;
    if (previewURL) {
      setPreview(previewURL);
      setIsProfilePic(true);
    }
  };

  const postUserProfile = async (formData: FormData) => {
    try {
      const res = await postUserProfileReq(formData);
      console.log("post profil response==>", res);
      if(res){
        toast.success('Profile updated succesfuly!');
        setProfile(preview);
        setIsProfilePic(true);
        closeModal();
      }
    } catch (err:any) {

    toast.error(err?.response?.data?.message)
      setProfile(prev=> prev);
    }
  };

  const onSave = () => {
    const formData = new FormData();
    if (file) {
      console.log(file);
      formData.append("userProfileImg", file);
      postUserProfile(formData);
    }
  };
  const onCancel = () => {
    if (!profile) {
      console.log('profile==> in on cancel',profile)
      setPreview("");
    } else {
      setPreview(profile);
    }
    setshowActionBtns(false)
    setIsProfilePic(false);
  };
  const actionBtns = () => {
    return (
      <>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave} style={{ padding: "0.3rem 0.75rem 0.3rem 0.75rem"}}>Save</button>
      </>    );
  };


  const oncloseHandler = ()=>{
    closeModal();
  }

  return (
    
    <div className={styles.container}>
      <div className={styles.heading}>
      <h2 >My profile</h2>
    <img src={closeIcon} alt="close" height={15} onClick={oncloseHandler}/>
      </div>
      <div className={styles.profileContainer}>
      <div className={styles.imgInput}>
        <label htmlFor="imgIcon">
          <div className={styles.profileImg}>
              <img src={editImage} alt="" height={35} className={styles.editIcon} />
            {preview ? (
              <img src={preview} alt="preview" className={styles.profilePicture}/>
            ) : (
              <h1>{firstLetter}</h1>
            )}
            <div className={styles.overlay}>
            
            </div>
          </div>
        </label>
        <input type="file" id="imgIcon" onChange={(e) => onchangeHandler(e)} />
      </div>
      <div style={{ textAlign: "center"}}>
        <h3 style={{marginBottom:"0"}}>{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h3>
        <h3 style={{marginTop:"0"}}>{loggedInUser?.email}</h3>
      </div>
      {showActionBtns ? <div className={styles.actionBtns}>{actionBtns()}</div> : ""}
      </div>
    </div>
  );
};

// <label htmlFor="imgIcon">
//         {preview
//           ? isProfilePic
//             ? actionBtns()
//             : "Edit profile"
//           : "upload"}
//       </label>
export default Profile;
