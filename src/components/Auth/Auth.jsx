import styles from "./Auth.module.css";
import assets from "../../assets/assets";
import SignupForm from "./SignupForm/SignupForm";
import { Navigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import PreLoader from "../PreLoader/PreLoader";

function Auth() {
   // check if the user is authenticated and if so, redirect to home page
   const { authUser, isLoading } = useContext(AuthContext);
   const { authType } = useParams();
   const isLogin = authType === "login";

   if (isLoading) return <PreLoader />;

   if (authUser) return <Navigate to="/" />;

   return (
      <section className={`${styles["auth"]} sm:flex glass-morphic-bg`}>
         <div className={`${styles["auth_left-wrapper"]} sm:justify-end`}>
            <img
               className={`${styles["auth_logo"]}`}
               src={assets.logo_big}
               alt="Logo"
            />
         </div>

         <div className={`${styles["auth_right-wrapper"]}`}>
            <div className={`${styles["form-slider"]}`}>
               {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
         </div>
      </section>
   );
}

export default Auth;
