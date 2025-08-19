import styles from "./Profile.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import assets from "../../assets/assets";
import Button from "../../components/Button/Button";
import toast from "react-hot-toast";

function Profile() {
   // auth context
   const { updateProfile, authUser } = useContext(AuthContext);

   // State for profile Update
   const [profilePic, setProfilePic] = useState(null);
   const [fullName, setFullName] = useState(authUser?.fullName || "");
   const [bio, setBio] = useState(authUser?.bio || "");

   // navigate hooks
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   // function to convert image file to base64
   const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => resolve(reader.result);
         reader.onerror = (error) => reject(error);
      });
   };

   // function to handle update profile submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         let payload = {
            fullName,
            bio,
         };
         if (profilePic) {
            const base64Image = await getBase64(profilePic);
            payload.profilePic = base64Image;
         }

         const success = await updateProfile(payload);
         if (success) {
            return navigate(from, { replace: true });
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <>
         <section className={`${styles["profile-outer-container"]}`}>
            <section
               className={`${styles["profile-inner-container"]} bg-glass`}
            >
               <form
                  onSubmit={handleSubmit}
                  className={`${styles["profile-form"]}`}
               >
                  <h1 className={`${styles["form_title"]}`}>Profile details</h1>
                  <div className={`${styles["input-wrapper"]}`}>
                     <label
                        htmlFor="image-upload"
                        className={`${styles["image-upload-wrapper"]}`}
                     >
                        <input
                           onChange={(e) => setProfilePic(e.target.files[0])}
                           type="file"
                           id="image-upload"
                           hidden
                           accept="image/*"
                        />
                        <img
                           className={`${styles["profile-image"]}`}
                           src={
                              profilePic
                                 ? URL.createObjectURL(profilePic)
                                 : authUser?.profilePic || assets.avatar_icon
                           }
                           alt="avatar"
                        />
                        upload profile image
                     </label>
                  </div>

                  <div className={`${styles["input-wrapper"]}`}>
                     <input
                        className={`${styles["input"]}`}
                        type="text"
                        placeholder="Your Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                     />
                  </div>

                  <div className={`${styles["input-wrapper"]}`}>
                     <textarea
                        className={`${styles["input"]}`}
                        placeholder="Write profile bio here"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                     ></textarea>
                  </div>

                  <Button btnContent={"Save"} btnType="submit" />
               </form>
               <div className={`${styles["profile-picture"]}`}>
                  <img
                     src={authUser?.profilePic || assets.avatar_icon}
                     alt="avatar"
                  />
               </div>
            </section>
         </section>
      </>
   );
}

export default Profile;
