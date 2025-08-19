import { useContext } from "react";
import styles from "./Header.module.css";
import assets from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

function Header() {
   const { authUser } = useContext(AuthContext);

   return (
      <>
         <header className={`${styles["header"]}`}>
            <div className={`${styles["profile"]}`}>
               <img
                  className={`${styles["profile_img"]}`}
                  src={authUser?.profilePic || assets.avatar_icon}
                  alt=""
               />
               <p className={`${styles["profile_name"]}`}>
                  {authUser?.fullName || "Unknown User"}
               </p>
               <span className={`${styles["profile_status"]}`}></span>
            </div>
            <div className={`${styles["header_right"]}`}>
               <p className={`${styles["header_icon"]}`}>i</p>
            </div>
         </header>
      </>
   );
}

export default Header;
