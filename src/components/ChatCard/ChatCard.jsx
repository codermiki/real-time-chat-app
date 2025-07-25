import assets from "../../assets/assets";
import styles from "./ChatCard.module.css";

function ChatCard({ message = true, files, chatForm = "sent" }) {
   return (
      <>
         <div className={`${styles["chat-card"]} ${styles[chatForm]}`}>
            <div className={`${styles["chat_profile"]}`}>
               <img src={assets.avatar_icon} alt="" />
               <span>4:30 PM</span>
            </div>
            <div className={`${styles["chat_message"]} ${styles[chatForm]}`}>
               {files.map((file, index) => {
                  return file.type === "image" ? (
                     <img
                        key={file.id}
                        className={styles["chat_image"]}
                        src={file.src}
                        alt=""
                     />
                  ) : (
                     <a
                        className={`${styles["chat_file"]}`}
                        key={file.id}
                        href={file.src}
                        download={true}
                     >
                        <p className={`${styles["file_icon"]}`}></p>
                        <div>
                           <p className={`${styles["file_name"]}`}>test.pdf</p>
                           <p>1.7 MB</p>
                        </div>
                     </a>
                  );
               })}

               {message && (
                  <>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Assumenda itaque obcaecati sed natus in a voluptatibus,
                     voluptate quaerat. Id, itaque optio maxime eum unde vel
                     exercitationem nobis quod illum hic!
                  </>
               )}
            </div>
         </div>
      </>
   );
}

export default ChatCard;
