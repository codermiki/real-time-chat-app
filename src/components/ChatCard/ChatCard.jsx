import styles from "./ChatCard.module.css";

function ChatCard({ message, chatForm = "sent" }) {
   return (
      <>
         <div className={`${styles["chat-card"]} ${styles[chatForm]}`}>
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
