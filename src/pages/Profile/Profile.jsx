import styles from "./Profile.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import assets from "../../assets/assets";
import Button from "../../components/Button/Button";

// schema for login form
const schema = yup.object().shape({
   email: yup
      .string()
      .email("Please insert valid email")
      .required("Please insert your email"),
   password: yup.string().required("Please insert your password"),
});

function Profile() {
   // auth context
   const { updateProfile } = useContext(AuthContext);

   // navigate hooks
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   // form hook
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   });

   // function to handle form submission
   const onSubmit = async (data) => {
      try {
         const success = await updateProfile(data);
         if (success) {
            navigate(from, { replace: true });
            reset();
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
               <form className={`${styles["profile-form"]}`}>
                  <h1 className={`${styles["form_title"]}`}>Profile details</h1>
                  <div className={`${styles["input-wrapper"]}`}>
                     <label
                        htmlFor="image-upload"
                        className={`${styles["image-upload-wrapper"]}`}
                     >
                        <input
                           type="file"
                           id="image-upload"
                           hidden
                           accept="image/*"
                        />
                        <img
                           className={`${styles["profile-image"]}`}
                           src={assets.avatar_icon}
                           alt="avatar"
                        />
                        upload profile image
                     </label>
                  </div>

                  <div className={`${styles["input-wrapper"]}`}>
                     <input
                        {...register("fullName")}
                        className={`${styles["input"]}`}
                        type="text"
                        placeholder="Your Full Name"
                     />
                     {errors.fullName && (
                        <p className={`${styles["error"]}`}>
                           {errors.email.message}
                        </p>
                     )}
                  </div>

                  <div className={`${styles["input-wrapper"]}`}>
                     <textarea
                        {...register("bio")}
                        className={`${styles["input"]}`}
                        placeholder="Write profile bio here"
                     ></textarea>
                     {errors.fullName && (
                        <p className={`${styles["error"]}`}>
                           {errors.email.message}
                        </p>
                     )}
                  </div>

                  <Button
                     btnContent={"Save"}
                     handleClick={handleSubmit(onSubmit)}
                  />
               </form>
               <div className={`${styles["profile-picture"]}`}>
                  <img src={assets.avatar_icon} alt="avatar" />
               </div>
            </section>
         </section>
      </>
   );
}

export default Profile;
