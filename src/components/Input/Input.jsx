import { useRef, useState, useEffect } from "react";
import styles from "./Input.module.css";

const ACCEPTED_FILE_TYPES = "image/*";

function Input({
   message,
   file,
   setMessage,
   setFile,
   maxFile = 1,
   maxFileSize = 10,
   onSendFn,
}) {
   const maxSize = maxFileSize * 1024 * 1024; // Convert MB to bytes
   const fileInputRef = useRef();

   const handleFileSelect = () => {
      fileInputRef.current.click();
   };

   return (
      <>
         {file && (
            <div className={styles["file-preview-container"]}>
               <div className={styles["file-preview"]}>
                  <img
                     src={URL.createObjectURL(file)}
                     alt={file?.name}
                     className={styles["file-thumb"]}
                  />

                  <button
                     type="button"
                     className={styles["remove-file-btn"]}
                     onClick={() => setFile(null)}
                  >
                     ×
                  </button>
               </div>
            </div>
         )}
         <div className={styles["message-input-container"]}>
            <input
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.preventDefault();
                     onSendFn();
                  }
               }}
               type="text"
               placeholder="Send a message"
               className={styles["text-input"]}
               onChange={(e) => setMessage(e.target.value)}
               value={message}
            />
            <div
               onClick={handleFileSelect}
               className={styles["image-icon"]}
               title="Attach files"
            ></div>
            <input
               type="file"
               ref={fileInputRef}
               style={{ display: "none" }}
               onChange={(e) => setFile(e.target.files[0])}
               accept={ACCEPTED_FILE_TYPES}
            />
         </div>
      </>
   );
}

export default Input;
