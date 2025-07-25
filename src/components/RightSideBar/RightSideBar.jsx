import { useContext } from "react";
import styles from "./RightSideBar.module.css";
import Button from "../Button/Button";
import { AuthContext } from "../../Context/AuthContext";

function RightSideBar() {  
   const { logout } = useContext(AuthContext);
   return (
      <>
         <div className={`${styles["right-sidebar"]}`}>
            <div>
               <div className={`${styles["profile"]}`}>
                  <img
                     className={`${styles["profile_img"]}`}
                     src="https://picsum.photos/200/300"
                     alt=""
                  />
                  <div className={`${styles["profile_info"]}`}>
                     <p className={`${styles["profile_status"]}`}></p>
                     <p className={`${styles["profile_name"]}`}>
                        Caroline Gray
                     </p>
                  </div>
                  <p className={`${styles["profile_bio"]}`}>
                     Lorem ipsum is placeholder text commonly used in ..
                  </p>
               </div>
               <hr className={`${styles["hr"]}`} />
               <div className={`${styles["media"]}`}>
                  <div>media</div>
                  <div className={`${styles["media_container"]}`}>
                     <img
                        className={`${styles["media_content"]}`}
                        src="https://picsum.photos/200/300"
                        alt=""
                     />
                     <img
                        className={`${styles["media_content"]}`}
                        src="https://picsum.photos/200/300"
                        alt=""
                     />
                  </div>
               </div>
            </div>
            <Button btnContent={"Logout"} handleClick={() => logout()} />
         </div>
      </>
   );
}

export default RightSideBar;
