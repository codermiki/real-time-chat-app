import React from "react";
import styles from "./Home.module.css";
import ChatCard from "../../components/ChatCard/ChatCard";
import files from "../../components/ChatCard/mockFile";
import Header from "../../components/Header/Header";
import RightSideBar from "../../components/RightSideBar/RightSideBar";

function Home() {
   return (
      <>
         <section className="min-h-screen overflow-y-scroll flex ">
            <section className="flex-7/12">
               <Header />
               <ChatCard chatForm="received" files={files} />
            </section>
            <section className="flex-3/12">
               <RightSideBar />
            </section>
         </section>
      </>
   );
}

export default Home;
