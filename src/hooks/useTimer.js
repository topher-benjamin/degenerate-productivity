import { useState, useEffect } from "react";

const SECOND = 1000;

/**
 * Custom hook for a timer functionality.
 *
 * @param {number} initialTime - The initial time in seconds for the timer.
 * @param {function} onEnd - The callback function to be called when the timer ends.
 * @returns {object} An object containing the timer control functions and the current timer state.
 * @property {function} start - Function to start the timer.
 * @property {function} stop - Function to stop the timer.
 * @property {function} reset - Function to reset the timer to its initial state.
 * @property {number} timeLeft - The remaining time in seconds.
 * @property {boolean} isRunning - Indicates whether the timer is currently running.
 */
const useTimer = (initialTime, onEnd) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime === 1) {
                clearInterval(timer); // Clear interval immediately when it reaches 1
                if (onEnd) {
                    console.log('onEnd invoked', prevTime)
                  onEnd(); // Call the callback function
                }
                return 0; // Set time to 0
              }
              return prevTime - 1;
        });
      }, SECOND);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, onEnd]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  return { start, stop, reset, timeLeft, isRunning };
};

export default useTimer;
