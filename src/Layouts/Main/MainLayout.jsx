import React from "react";
import styles from "./MainLayout.module.css";
import SideBar from "../../components/SideBar/SideBar";

function MainLayout({ children }) {
   return (
      <>
         <section
            className={`${styles["main-layout"]} glassmorphic-bg`}
         >
            <section
               className={`${styles["main-layout__sidebar"]}  bg-[#8185b2]/10`}
            >
               <SideBar />
            </section>
            <section className={`${styles["main-layout__chat-container"]}`}>
               {children}
            </section>
         </section>
      </>
   );
}

export default MainLayout;
