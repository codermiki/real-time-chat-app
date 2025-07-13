import assets from "../../assets/assets";
import styles from "./Header.module.css";

function Header() {
   return (
      <>
         <header className={`${styles["header"]}`}>
            <div className={`${styles["profile"]}`}>
               <img
                  className={`${styles["profile_img"]}`}
                  src={assets.avatar_icon}
                  alt=""
               />
               <p className={`${styles["profile_name"]}`}>Caroline Gray</p>
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
