import styles from "./Profile.module.css";

function Profile() {
   return (
      <>
         <section className={`${styles["profile-outer-container"]}`}>
            <section className={`${styles["profile-inner-container"]}`}>
               <div>profile page</div>
            </section>
         </section>
      </>
   );
}

export default Profile;
