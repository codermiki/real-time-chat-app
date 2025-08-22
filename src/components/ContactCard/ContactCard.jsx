import styles from "./ContactCard.module.css";
import assets from "../../assets/assets";

function ContactCard({
   contact,
   unseenMessages,
   isOnline,
   onClickFn,
   isSelected,
}) {
   return (
      <>
         <div
            onClick={onClickFn}
            className={`${styles["contact-card"]} ${
               isSelected ? styles["selected"] : ""
            }`}
         >
            <img
               className={`${styles["contact-card__image"]}`}
               src={contact?.profilePic || assets.avatar_icon}
               alt=""
            />
            <div className={`${styles["contact-card__info"]}`}>
               <h3 className={`${styles["contact-card__name"]}`}>
                  {contact?.fullName}
               </h3>
               <p className={`${styles["contact-card__status"]}`}>
                  {isOnline ? "Online" : "Offline"}
               </p>
            </div>
            <div className={`${styles["contact-card__unread-count"]}`}>
               <span className={`${styles["contact-card__count"]}`}>
                  {unseenMessages || ""}
               </span>
            </div>
         </div>
      </>
   );
}

export default ContactCard;
