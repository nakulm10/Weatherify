// import React, { useState, useEffect } from "react";
// import "./ScrollUpButton.css"; // Create this CSS file for styling
// import 

// function ScrollUpButton() {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     window.addEventListener("scroll", toggleVisibility);
//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   const toggleVisibility = () => {
//     if (window.pageYOffset > 300) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div
//       className={`scroll-up-btn ${isVisible ? "visible" : ""}`}
//       onClick={scrollToTop}
//     >
//       <i className="fas fa-arrow-up"></i>
//     </div>
//   );
// }

// export default ScrollUpButton;
