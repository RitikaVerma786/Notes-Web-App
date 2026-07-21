import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { useNotesContext } from "../../contexts/NotesContext";
import { userInfoReq } from "../../apis/userApi.ts"
import Sidebar from "../../components/sidebar/Sidebar";
import Modal from "../../components/modal/Modal";
import FormPage from "../../components/formPage/FormPage";
import styles from "./MainLayout.module.css";
import DeletePopup from "../../components/popUp/DeletePopup";
import Header from "../../components/header/Header";
import Profile from "../../pages/profile/Profile";
import { useAuth } from "../../contexts/AuthContext";

const MainLayout = () => {
  const { modalType,setProfile} = useNotesContext();
  const {setLoggedInUser} = useAuth();
        useEffect(()=>{
        const fetchUserInfo = async ()=>{
            const res = await userInfoReq();
            console.log("UserInfo ***>",res);
            setLoggedInUser(res.data.userInfo);
            if(res.data.userInfo?.profilePic){
                console.log("PRofile picture of the usr=>",res.data.userInfo?.profilePic)
                const profilePic = `http://localhost:3000/uploads/${res.data.userInfo?.profilePic}`
                setProfile(profilePic);
            }
        }
        fetchUserInfo();
    },[])

  const renderModalLayout = ()=>{ //return different type modal as based on state 
    switch(modalType){
      case 'formPage' : return <FormPage/>;
      case 'delete' : return <DeletePopup/> ;
      case 'profile' : return <Profile/>
      default :
      return null;
    }
  }


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className={styles.outerContainer}>
        <div className={`${styles.sidebarWrapper} ${isSidebarOpen ? styles.showSidebar : ""}`}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {isSidebarOpen && (
          <div className={styles.backdrop} onClick={() => setIsSidebarOpen(false)} />
        )}

        { modalType && <Modal>
            { renderModalLayout() }
          </Modal> }
  

        <div className={styles.mainSection}>
          <div className={styles.headerWrapper}>
            <button className={styles.hamburgerBtn} onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <div style={{ flex: 1 }}>
              <Header />
            </div>
          </div>
          <div className={styles.outletContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
