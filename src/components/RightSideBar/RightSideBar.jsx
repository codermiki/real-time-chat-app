import { useContext, useEffect, useState } from "react";
import styles from "./RightSideBar.module.css";
import Button from "../Button/Button";
import { AuthContext } from "../../context/AuthContext";
import assets from "../../assets/assets";
import { ChatContext } from "../../context/ChatContext";

function RightSideBar() {
   const { selectedUser, messages } = useContext(ChatContext);
   const { logout, onlineUsers } = useContext(AuthContext);
   const [media, setMedia] = useState([]);

   useEffect(() => {
      let images = messages
         .filter((message) => message.image)
         .map((message) => message.image);
      setMedia(images);
   }, [messages]);

   return (
      <>
         <div className={`${styles["right-sidebar"]}`}>
            <div>
               <div className={`${styles["profile"]}`}>
                  <img
                     className={`${styles["profile_img"]}`}
                     src={selectedUser?.profilePic || assets.avatar_icon}
                     alt=""
                  />
                  <div className={`${styles["profile_info"]}`}>
                     {onlineUsers.includes(selectedUser._id) && (
                        <span className={`${styles["profile_status"]}`}></span>
                     )}
                     <p className={`${styles["profile_name"]}`}>
                        {selectedUser?.fullName || "Unknown User"}
                     </p>
                  </div>
                  <p className={`${styles["profile_bio"]}`}>
                     {selectedUser?.bio || "I am using quick chat app..."}
                  </p>
               </div>
               <hr className={`${styles["hr"]}`} />
               <div className={`${styles["media"]}`}>
                  <div>Media</div>
                  <div className={`${styles["media_container"]}`}>
                     {media && media?.length > 0 ? (
                        media.map((image, idx) => (
                           <img
                              key={idx}
                              className={`${styles["media_content"]}`}
                              src={image}
                              alt=""
                           />
                        ))
                     ) : (
                        <p>No media exchange yet!</p>
                     )}
                  </div>
               </div>
            </div>
            <Button btnContent={"Logout"} handleClick={() => logout()} />
         </div>
      </>
   );
}

export default RightSideBar;
