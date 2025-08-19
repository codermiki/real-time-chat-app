import { useContext, useEffect, useState } from "react";
import styles from "./SideBar.module.css";
import assets, { userDummyData } from "../../assets/assets";
import ContactCard from "../ContactCard/ContactCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

function SideBar() {
   // Initialize the useContext hook
   const {
      users,
      fetchUsers,
      unseenMessages,
      setUnseenMessages,
      selectedUser,
      setSelectedUser,
   } = useContext(ChatContext);

   const { logout, onlineUsers } = useContext(AuthContext);

   // Initialize the useNavigate hook
   const navigate = useNavigate();

   // Function to toggle the dropdown menu
   const [showMenu, setShowMenu] = useState(false);
   const toggleDropdown = () => {
      setShowMenu(!showMenu);
   };

   // Fetch users when onlineUsers changes
   useEffect(() => {
      fetchUsers();
   }, [onlineUsers]);

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
               {users &&
                  users.map((user) => (
                     <ContactCard
                        key={user._id}
                        contact={user}
                        isOnline={onlineUsers.includes(user._id)}
                        onClickFn={() => setSelectedUser(user)}
                        isSelected={selectedUser?._id === user._id}
                     />
                  ))}
            </nav>
         </div>
      </>
   );
}

export default SideBar;
