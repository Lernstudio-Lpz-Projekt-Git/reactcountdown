import React, { useState, useEffect } from "react";
import "./counter.css";

const Counter = (props) => {
  const [seconds, setSeconds] = useState(props.times);
  const [initGame, setInitGame] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [randNumber, setRandNumbers] = useState([]);
  const [sum, setSum] = useState(0);
  const [userSum, setUserSum] = useState(0);
  const MAXINT = 6;

  function getRandomInt(max) {
    const erg = 1 + Math.floor(Math.random() * max);
    console.log(erg);
    return erg;
  }

  useEffect(() => {
    setRandNumbers([]);
    for (let i = 0; i < MAXINT; i++) {
      setRandNumbers((randNumber) => [...randNumber, getRandomInt(10)]);
    }
  }, [initGame]);

  useEffect(() => {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    };
    setSum(randNumber.slice(0, 4).reduce((a, b) => a + b, 0));
    shuffle(randNumber);
  }, [randNumber]);

  function reset() {
    setUserSum(0);
    setSeconds(props.times);
    setIsActive(true);
    setInitGame(!initGame);
    console.log(randNumber);
  }

  function getUserSum(e) {
    console.log(e.target.value);
    setUserSum((userSum) => Number(userSum + Number(e.target.value)));
  }

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive || seconds < 1) {
      clearInterval(interval);
      setIsActive(false);
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="app">
      <h1
        className={`${
          userSum === sum
            ? "setgreen"
            : userSum > sum
            ? "setred"
            : sum - userSum < 2
            ? "setyellow"
            : ""
        }`}
      >
        {userSum}
      </h1>
      <h2>{sum}</h2>
      <div className="numbers">
        {randNumber.map((n, i) => (
          <button
            className="button_numb"
            key={i}
            value={n}
            disabled={!isActive}
            onClick={getUserSum}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="time">{seconds} s</div>
      <div className="row">
        <button
          className={`button button-primary button-primary-${
            isActive ? "inactive" : "active"
          }`}
          onClick={reset}
          disabled={isActive}
        >
          {isActive ? "Run ..." : "Start Game"}
        </button>
      </div>
    </div>
  );
};

export default Counter;
