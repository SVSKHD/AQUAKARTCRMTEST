import { AnimatePresence, motion } from "framer-motion";

const PageWrapper = (props) => {
  const variants = {
    fadeIn: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    inactive: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
    fadeOut: {
      opacity: 0,
      y: -100,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };
  return (
    <>
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="fadeIn"
          animate="inactive"
          exit="fadeOut"
        >
          {props.children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
export default PageWrapper;
