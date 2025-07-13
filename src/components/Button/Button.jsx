import styles from "./Button.module.css";

function Button({ btnContent }) {
   return (
      <>
         <button className={`${styles["button"]}`}>{btnContent}</button>
      </>
   );
}

export default Button;
