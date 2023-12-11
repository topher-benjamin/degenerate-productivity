import { useState } from "react";
import useTimer from "./hooks/useTimer";

function App() {
  const rewards = [
    "10 minutes of YouTube",
    "15 minutes of guitar",
    "15 minutes of SuperHotVR",
    "1 Reeses Peanut Butter Cup",
    "1 alcoholic beverage tonight",
    "1 Athletic article",
    "Facebook 5 minutes",
    "Instagram 5 minutes",
  ];

  const [winnings, setWinnings] = useState([]);

  // frequency as a percentage
  const REWARD_FREQUENCY = 30;
  const POMODORO_TIME = 1500;

  /**
   * Generates a reward based on a random roll.
   * If the roll is less than the REWARD_FREQUENCY, a random reward is added to the winnings.
   */
  const generateReward = () => {
    // determine if any reward will be received at all
    console.log("generating reward");
    const roll = Math.floor(Math.random() * 100);
    console.log(`Roll: ${roll}`);

    if (roll < REWARD_FREQUENCY) {
      const reward = getRandomReward();
      setWinnings([...winnings, reward]);
    }
  };

  /**
   *
   * @returns a random reward from the rewards array
   */
  const getRandomReward = () => {
    const randomIndex = Math.floor(Math.random() * rewards.length);
    return rewards[randomIndex];
  };

  const { timeLeft, start, stop, reset, isRunning } = useTimer(
    POMODORO_TIME,
    generateReward
  );

  const formatTime = (timeLeft) => {
    console.log('timeleft', timeLeft);
    let date = new Date(null);
    date.setSeconds(timeLeft);
    return  date.toISOString().substr(11, 8);
  }

  return (
    <div className="App bg-slate-800 text-center min-h-screen flex flex-col space-y-10 text-gray-200">
      <header className=" flex flex-col items-center">
        <h1 className="text-3xl font-bold underline">
          Degenerate Productivity
        </h1>
        <p className="italic">Bringing gambling addiction to your daily work</p>
      </header>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold underline">Rewards</h2>
        <ul className="list-disc">
          {rewards.map((reward, index) => (
            <li key={index}>{reward}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row justify-evenly ">
        {/* TODO: dynamically change button text based on timer state */}
        {!isRunning && (
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={start}
            disabled={isRunning}
          >
            Start Timer
          </button>
        )}
        {isRunning && (
          <button
            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
            onClick={stop}
            disabled={!isRunning}
          >
            Stop Timer
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
          onClick={reset}
        >
          Reset Timer
        </button>
      </div>
      <div>
        <h2 className="text-2xl font-bold underline">Timer</h2>
        <p>Time left: {formatTime(timeLeft)}</p>
      </div>
      <div>
        <h2 className="text-2xl font-bold underline">Today's Winnings</h2>
        <ul className="list-disc">
          {winnings.map((winnings, index) => (
            <li key={index}>{winnings}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
