import styles from "../Auth.module.css";
import Button from "../../Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

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
   const onSubmit = async (data) => {
      try {
         const success = await login("login", data);
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
         <form
            className={`${styles["form"]} ${
               slideIn ? styles["slide-in"] : ""
            } bg-glass`}
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
