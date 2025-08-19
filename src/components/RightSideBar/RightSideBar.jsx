import { useContext } from "react";
import styles from "./RightSideBar.module.css";
import Button from "../Button/Button";
import { AuthContext } from "../../context/AuthContext";
import assets from "../../assets/assets";

function RightSideBar({ contact }) {
   const { logout } = useContext(AuthContext);
   return (
      <>
         <div className={`${styles["right-sidebar"]}`}>
            <div>
               <div className={`${styles["profile"]}`}>
                  <img
                     className={`${styles["profile_img"]}`}
                     src={contact?.profilePic || assets.avatar_icon}
                     alt=""
                  />
                  <div className={`${styles["profile_info"]}`}>
                     <p className={`${styles["profile_status"]}`}></p>
                     <p className={`${styles["profile_name"]}`}>
                        {contact?.fullName || "Unknown User"}
                     </p>
                  </div>
                  <p className={`${styles["profile_bio"]}`}>
                     {contact?.bio || "I am using quick chat app..."}
                  </p>
               </div>
               <hr className={`${styles["hr"]}`} />
               <div className={`${styles["media"]}`}>
                  <div>media</div>
                  <div className={`${styles["media_container"]}`}>
                     <img
                        className={`${styles["media_content"]}`}
                        src="https://picsum.photos/200/300"
                        alt=""
                     />
                     <img
                        className={`${styles["media_content"]}`}
                        src="https://picsum.photos/200/300"
                        alt=""
                     />
                  </div>
               </div>
            </div>
            <Button btnContent={"Logout"} handleClick={() => logout()} />
         </div>
      </>
   );
}

export default RightSideBar;
