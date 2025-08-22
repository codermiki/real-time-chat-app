import { useContext } from "react";
import styles from "./ChatCard.module.css";
import assets from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { formatDateParts } from "../../utils/dateFormatter";

function ChatCard({ message, chatForm = "sent" }) {
   const { authUser } = useContext(AuthContext);
   const { selectedUser } = useContext(ChatContext);

   return (
      <>
         <div className={`${styles["chat-card"]} ${styles[chatForm]}`}>
            <div className={`${styles["chat_profile"]}`}>
               <img
                  src={
                     message?.receiverId === authUser?._id
                        ? selectedUser?.profilePic || assets.avatar_icon
                        : authUser?.profilePic || assets.avatar_icon
                  }
                  alt=""
               />
               <span>{formatDateParts(message?.createdAt).time}</span>
            </div>
            <div className={`${styles["chat_message"]} ${styles[chatForm]}`}>
               <img
                  className={styles["chat_image"]}
                  src={message?.image}
                  alt=""
               />
               {message?.text && <>{message.text}</>}
            </div>
         </div>
      </>
   );
}

export default ChatCard;
