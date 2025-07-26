import styles from "./Auth.module.css";
import assets from "../../assets/assets";
import SignupForm from "./SignupForm/SignupForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import PreLoader from "../PreLoader/PreLoader";

function Auth() {
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   // Auth Context
   const { isAuth, isLoading } = useContext(AuthContext);
   const { authType } = useParams();
   const isLogin = authType === "login";

   // check if user is authenticated
   useEffect(() => {
      if (isAuth) {
         navigate(from, { replace: true });
      }
   }, [isAuth, from, navigate]);

   if (isLoading) return <PreLoader />;

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
