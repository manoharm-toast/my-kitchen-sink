// Dependencies
import React from "react";
import { Counter } from "./Counter";
import { motion, AnimatePresence } from "framer-motion";
// Styles
import "./tailwind.output.css";

const App = () => {
  const [[pageCount, direction], setCount] = React.useState([0, 0]);

  const variants = {
    exit: (direction) => {
      console.error("direction", direction);
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 1,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    enter: (direction) => {
      console.error("direction", direction);
      return {
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
      };
    },
  };

  const downvariants = {
    exit: (direction) => {
      console.error("direction", direction);
      return {
        y: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      x: 10,
      y: 10,
      opacity: 1,
      duration: 0.2,
    },
    enter: (direction) => {
      console.error("direction", direction);
      return {
        y: direction > 0 ? -1000 : 1000,
        opacity: 0,
      };
    },
  };

  const nextOrPrev = (newDirection) => {
    setCount([pageCount + newDirection, newDirection]);
  };

  const transition = {
    type: "keyframes",
    duration: 1,
  };
  return (
    <div>
      <div className="flex justify-center pt-10">
        <button
          className="mr-2 px-2 border-2 bg-blue-300"
          onClick={() => {
            nextOrPrev(-1);
          }}
        >
          prev
        </button>
        <button
          className=" px-2 border-2 bg-blue-300"
          onClick={() => {
            nextOrPrev(1);
          }}
        >
          next
        </button>
      </div>
      <div className="p-10 relative">
        <div className="flex justify-center p-24 bg-blue-200 border-8">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={pageCount}
              variants={downvariants}
              className="bg-white p-16"
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={transition}
            >
              <Counter count={pageCount} />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="top-0 mt-10 absolute p-10 z-20 bg-blue-400 border-8">
          <div className="w-18 h-64">left nav</div>
        </div>
      </div>
    </div>
  );
};

export default App;
