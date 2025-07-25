import styles from "./PreLoader.module.css";

const PreLoader = () => {
   return (
      <section className={`${styles["preloader-wrapper"]}`}>
         <div className={`${styles["preloader"]}`}></div>
      </section>
   );
};

export default PreLoader;
