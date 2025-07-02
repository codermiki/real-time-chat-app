import React from "react";
import styles from "./SideBar.module.css";
import assets, { userDummyData } from "../../assets/assets";
import ContactCard from "../ContactCard/ContactCard";

function SideBar() {
   return (
      <>
         <div className={`${styles["sidebar"]}`}>
            <header className={`${styles["sidebar__header"]}`}>
               <img
                  className={`${styles["sidebar__logo"]}`}
                  src={assets.logo}
                  alt="logo"
               />
               <div className={`${styles["sidebar__menu"]}`}>
                  <img
                     className={`${styles["sidebar__menu-icon"]}`}
                     src={assets.menu_icon}
                     alt="menu icon"
                  />
               </div>
            </header>

            <nav className={`${styles["sidebar__nav"]}`}>
               {userDummyData.slice(0, 5).map((user) => (
                  <ContactCard key={user._id} contact={user} />
               ))}
            </nav>
         </div>
      </>
   );
}

export default SideBar;
