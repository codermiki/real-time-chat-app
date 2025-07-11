import { useRef, useState, useEffect } from "react";
import styles from "./Input.module.css";

const ACCEPTED_FILE_TYPES = "image/*,application/pdf";

function Input({ setMessage, setFiles, maxFile = 5, maxFileSize = 10 }) {
   const maxSize = maxFileSize * 1024 * 1024; // Convert MB to bytes
   const fileInputRef = useRef();
   const [selectedFiles, setSelectedFiles] = useState([]);

   const handleFileSelect = () => {
      fileInputRef.current.click();
   };

   const handleFileChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
         // Clean up previous object URLs
         selectedFiles.forEach((file) => {
            if (file.previewUrl) {
               URL.revokeObjectURL(file.previewUrl);
            }
         });
         const files = Array.from(e.target.files)
            .slice(0, maxFile)
            .map((file) => {
               // Only create previewUrl for images
               if (file.type.startsWith("image/")) {
                  file.previewUrl = URL.createObjectURL(file);
               }
               return file;
            });
         setSelectedFiles(files);
         setFiles(files);
      }
   };

   const handleRemoveFile = (index) => {
      const fileToRemove = selectedFiles[index];
      if (fileToRemove && fileToRemove.previewUrl) {
         URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(newFiles);
      setFiles(newFiles);
   };

   useEffect(() => {
      // Cleanup object URLs on unmount
      return () => {
         selectedFiles.forEach((file) => {
            if (file.previewUrl) {
               URL.revokeObjectURL(file.previewUrl);
            }
         });
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         {selectedFiles.length > 0 && (
            <div className={styles["file-preview-container"]}>
               {selectedFiles.map((file, idx) => (
                  <div key={idx} className={styles["file-preview"]}>
                     {file.type.startsWith("image/") ? (
                        <img
                           src={file.previewUrl}
                           alt={file.name}
                           className={styles["file-thumb"]}
                        />
                     ) : (
                        <span className={styles["file-name"]}>{file.name}</span>
                     )}
                     <button
                        type="button"
                        className={styles["remove-file-btn"]}
                        onClick={() => handleRemoveFile(idx)}
                     >
                        ×
                     </button>
                  </div>
               ))}
            </div>
         )}
         <div className={styles["message-input-container"]}>
            <input
               type="text"
               placeholder="Send a message"
               onChange={(e) => setMessage(e.target.value)}
               className={styles["text-input"]}
            />
            <div
               onClick={handleFileSelect}
               className={styles["image-icon"]}
               title="Attach files"
            ></div>
            <input
               type="file"
               multiple
               ref={fileInputRef}
               style={{ display: "none" }}
               onChange={handleFileChange}
               accept={ACCEPTED_FILE_TYPES}
            />
         </div>
      </>
   );
}

export default Input;
