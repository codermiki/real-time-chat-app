import { useContext } from "react";
import styles from "./Header.module.css";
import assets from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

function Header() {
   const { onlineUsers } = useContext(AuthContext);
   const { selectedUser } = useContext(ChatContext);

   return (
      <>
         <header className={`${styles["header"]}`}>
            <div className={`${styles["profile"]}`}>
               <img
                  className={`${styles["profile_img"]}`}
                  src={selectedUser?.profilePic || assets.avatar_icon}
                  alt=""
               />
               <p className={`${styles["profile_name"]}`}>
                  {selectedUser?.fullName || "Unknown User"}
               </p>
               {onlineUsers.includes(selectedUser._id) && (
                  <span className={`${styles["profile_status"]}`}></span>
               )}
            </div>
            <div className={`${styles["header_right"]}`}>
               <p className={`${styles["header_icon"]}`}>i</p>
            </div>
         </header>
      </>
   );
}

export default Header;
