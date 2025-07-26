import styles from "./Auth.module.css";
import assets from "../../assets/assets";
import SignupForm from "./SignupForm/SignupForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import PreLoader from "../PreLoader/PreLoader";

function Auth() {
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   // check if the user is authenticated and if so, redirect to home page
   const { isAuth, isLoading } = useContext(AuthContext);
   const { authType } = useParams();
   const isLogin = authType === "login";

   if (isLoading) return <PreLoader />;

   if (isAuth) return navigate(from, { replace: true });

   return (
      <section className={`${styles["auth"]} sm:flex bg-glass`}>
         <div className={`${styles["auth_left-wrapper"]} sm:justify-end`}>
            <img
               className={`${styles["auth_logo"]}`}
               src={assets.logo_big}
               alt="Logo"
            />
         </div>

         <div className={`${styles["auth_right-wrapper"]}`}>
            <div className={`${styles["form-container"]}`}>
               {isLogin ? <LoginForm /> : <SignupForm />}
            </div>
         </div>
      </section>
   );
}

export default Auth;
