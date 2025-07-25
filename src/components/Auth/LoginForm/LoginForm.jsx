import styles from "../Auth.module.css";
import Button from "../../Button/Button";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import useSlideIn from "../../../hooks/useSlideIn";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

// schema for login form
const schema = yup.object().shape({
   email: yup
      .string()
      .email("Please insert valid email")
      .required("Please insert your email"),
   password: yup.string().required("Please insert your password"),
});

function LoginForm() {
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
         const success = login("login", data);
         if (success) {
            <Navigate to="/" />;
            reset();
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
            <h1 className={`${styles["form_title"]}`}>Login</h1>
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
               btnContent={"Login Now"}
               btnUniqueStyle={"form_button"}
               handleClick={handleSubmit(onSubmit)}
            />
            <p className={`${styles["link"]}`}>
               Create an account? <Link to={"/auth/signup"}>Sign up</Link>
            </p>
         </form>
      </>
   );
}

export default LoginForm;
