import styles from "./PreLoader.module.css";

const PreLoader = () => {
   return (
      <section className={`${styles["preloader-wrapper"]} bg-glass`}>
         <div className={`${styles["preloader"]}`}></div>
      </section>
   );
};

export default PreLoader;
