import React from "react";
import styles from "./ContactCard.module.css";
import assets from "../../assets/assets";

function ContactCard({ contact }) {
   return (
      <>
         <div className={`${styles["contact-card"]}`}>
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
                  {contact?.status}
               </p>
            </div>
            <div className={`${styles["contact-card__unread-count"]}`}>
               <span className={`${styles["contact-card__count"]}`}>
                  {contact?.unreadCount || 0}
               </span>
            </div>
         </div>
      </>
   );
}

export default ContactCard;
