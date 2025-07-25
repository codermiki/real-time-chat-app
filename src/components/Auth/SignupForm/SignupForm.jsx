import styles from "../Auth.module.css";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useSlideIn from "../../../hooks/useSlideIn";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import toast from "react-hot-toast";

// schema for signup form
const schema = yup.object().shape({
   fullName: yup.string().required("Please insert your full name"),
   email: yup
      .string()
      .email("Please insert valid email")
      .required("Please insert your email"),
   password: yup
      .string()
      .required("Please insert your password")
      .min(6, "Password must be at least 6 characters"),
});

function SignupForm() {
   // slide in animation
   const slideIn = useSlideIn();

   // auth context
   const { login } = useContext(AuthContext);

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
   const onSubmit = (data) => {
      try {
         const success = login("signup", data);
         if (success) {
            reset();
            <Navigate to="/" />;
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   return (
      <>
         <form
            className={`${styles["form"]} ${
               slideIn ? styles["slide-in"] : ""
            } glass-morphic-bg`}
         >
            <h1 className={`${styles["form_title"]}`}>Sign up</h1>
            <div className={`${styles["input-wrapper"]}`}>
               <input
                  {...register("fullName")}
                  className={`${styles["input"]}`}
                  type="text"
                  placeholder="Full Name"
               />
               {errors.fullName && (
                  <p className={`${styles["error"]}`}>
                     {errors.fullName.message}
                  </p>
               )}
            </div>
            <div className={`${styles["input-wrapper"]}`}>
               <input
                  {...register("email")}
                  className={`${styles["input"]}`}
                  type="email"
                  placeholder="Email Address"
               />
               {errors.email && (
                  <p className={`${styles["error"]}`}>{errors.email.message}</p>
               )}
            </div>
            <div className={`${styles["input-wrapper"]}`}>
               <input
                  {...register("password")}
                  className={`${styles["input"]}`}
                  type="password"
                  placeholder="Password"
               />
               {errors.password && (
                  <p className={`${styles["error"]}`}>
                     {errors.password.message}
                  </p>
               )}
            </div>
            <Button
               btnContent={"Create Account"}
               btnUniqueStyle={"form_button"}
               handleClick={handleSubmit(onSubmit)}
            />
            <div className={`${styles["agreement"]}`}>
               <input type="checkbox" name="agree" id="agree" />
               <label htmlFor="agree">
                  Agree to the terms of use & privacy policy.
               </label>
            </div>
            <p className={`${styles["link"]}`}>
               Already have an account?{" "}
               <Link to={"/auth/login"}>Login here</Link>
            </p>
         </form>
      </>
   );
}

export default SignupForm;
