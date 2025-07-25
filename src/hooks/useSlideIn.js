import { useState, useEffect } from "react";

const useSlideIn = (delay = 100) => {
   const [slideIn, setSlideIn] = useState(false);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setSlideIn(true);
      }, delay);

      return () => clearTimeout(timeout); // cleanup
   }, [delay]);

   return slideIn;
};

export default useSlideIn;
