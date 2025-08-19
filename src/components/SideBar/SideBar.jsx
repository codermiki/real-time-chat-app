import { useContext, useState } from "react";
import styles from "./SideBar.module.css";
import assets, { userDummyData } from "../../assets/assets";
import ContactCard from "../ContactCard/ContactCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function SideBar() {
   // Initialize the useContext hook
   const { logout } = useContext(AuthContext);

   // Initialize the useNavigate hook
   const navigate = useNavigate();

   // Function to toggle the dropdown menu
   const [showMenu, setShowMenu] = useState(false);
   const toggleDropdown = () => {
      setShowMenu(!showMenu);
   };

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
                     onClick={toggleDropdown}
                     className={`${styles["sidebar__menu-icon"]}`}
                     src={assets.menu_icon}
                     alt="menu icon"
                  />
               </div>
               <div
                  onMouseLeave={() => setShowMenu(false)}
                  className={`${styles["sidebar__dropdown"]} ${
                     showMenu ? styles["active"] : ""
                  } bg-glass`}
               >
                  <span onClick={() => navigate("/profile", { replace: true })}>
                     Edit Profile
                  </span>
                  <hr />
                  <span onClick={() => logout()}>Logout</span>
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
