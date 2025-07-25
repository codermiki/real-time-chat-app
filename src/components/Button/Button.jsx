import styles from "./Button.module.css";

function Button({
   btnContent,
   btnUniqueStyle,
   handleClick,
   btnType = "button",
}) {
   return (
      <>
         <button
            className={`${styles["button"]} ${
               btnUniqueStyle ? styles[btnUniqueStyle] : ""
            }`}
            onClick={handleClick}
            type={btnType}
         >
            {btnContent}
         </button>
      </>
   );
}

export default Button;
