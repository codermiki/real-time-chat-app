import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import ChatCard from "../../components/ChatCard/ChatCard";
import files from "../../components/ChatCard/mockFile";
import Header from "../../components/Header/Header";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { ChatContext } from "../../context/ChatContext";
import Input from "../../components/Input/Input";
import { getBase64 } from "../../utils/base64Converter";

function Home() {
   // Context
   const { selectedUser, fetchMessages, messages, sendMessage } =
      useContext(ChatContext);

   // State
   const [message, setMessage] = useState("");
   const [file, setFile] = useState(null);

   const scrollEndRef = useRef(null);

   useEffect(() => {
      scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   useEffect(() => {
      if (selectedUser) {
         fetchMessages();
      }
   }, [selectedUser]);

   const handleSendMessage = async () => {
      // Prepare the payload
      let payload = {};
      // Check if there's a file to upload
      if (file) {
         const base64Image = await getBase64(file);
         payload.image = base64Image;
      }
      // Check if there's a text message
      if (message.trim()) {
         payload.text = message;
      }

      if (Object.keys(payload).length > 0) {
         await sendMessage(payload);
         setMessage("");
         setFile(null);
      }
   };

   return (
      <>
         <section
            className={`${styles["home"]} min-h-screen overflow-y-scroll flex`}
         >
            <section className={`${styles["home__chat"]} flex-8/12`}>
               {selectedUser ? (
                  <>
                     <Header />
                     <div>
                        {messages.length > 0 ? (
                           messages.map((message, idx) => (
                              <div key={idx}>
                                 <ChatCard
                                    chatForm={
                                       message.senderId === selectedUser._id
                                          ? "received"
                                          : "sent"
                                    }
                                    message={message}
                                 />
                                 {idx === messages.length - 1 && (
                                    <div
                                       ref={scrollEndRef}
                                       className={styles["home__chat__scroll"]}
                                    ></div>
                                 )}
                              </div>
                           ))
                        ) : (
                           <div className={styles["home__chat__empty"]}>
                              Say hi to start messaging
                           </div>
                        )}
                     </div>
                     <div className={styles["home__chat__footer"]}>
                        <Input
                           message={message}
                           setMessage={setMessage}
                           file={file}
                           setFile={setFile}
                           onSendFn={handleSendMessage}
                        />
                     </div>
                  </>
               ) : (
                  <div className={styles["home__chat__empty"]}>
                     Select a user to start chatting
                  </div>
               )}
            </section>
            {selectedUser && (
               <section className={`${styles["home__sidebar"]} flex-4/12`}>
                  <RightSideBar contact={selectedUser} />
               </section>
            )}
         </section>
      </>
   );
}

export default Home;
