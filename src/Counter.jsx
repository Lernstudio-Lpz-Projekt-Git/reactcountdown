import React, { useState, useEffect } from "react";
import "./counter.css";

const Counter = (props) => {
  // (1) Alle Funktions-Deklarationen der Componente werden registriert:
  // reset() - getUserSum()

  // (2) Erste Initialisierung der Componenten-States mit den useState-Values
  // Mit der Initialisierung wird die gesamte Componente, das Game gestartet und einzelne useEffects() ausgelöst.
  const [initGame, setInitGame] = useState(false);
  const [randNumber, setRandNumbers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(props.times);
  const [sum, setSum] = useState(0);
  const [userSum, setUserSum] = useState(0);
  const MAXINT = 6;
  // useEffect(), ist eine Kombination aus den Methoden componentDidMount(), componentDidUpdate() und componentWillUnmount()
  // Und sind Class-Lifecycle-Methoden. Wird eine Componente zum ersten Mal aufgerufen, wird nach der constructor-Methode,
  // die Methode componentDidMount() aufgerufen.
  // In einer funktionalen Componente verwenden wir die useEffect()-Methode mit einem leeren Dependency-Array-[].

  // (3) Der useState-Value "initGame" wird in Line 11 auf "false" gesetzt und löst
  // useEffect in Zeile 24 aus, da dort als Dependency-Value (Zeile 34) "initGame" auf Änderung wartet.
  useEffect(() => {
    function getRandomInt(max) {
      const erg = 1 + Math.floor(Math.random() * max);
      console.log(erg);
      return erg;
    }
    setRandNumbers([]);
    for (let i = 0; i < MAXINT; i++) {
      setRandNumbers((randNumber) => [...randNumber, getRandomInt(10)]);
    }
  }, [initGame]);

  // (4) Das useState-Array "randNumber" wird in Line 32 mit MAXINT Zahlen befüllt und löst
  // useEffect in Zeile 38 aus, da dort als Dependency-Value (Zeile 49) "randNumber" auf Änderung wartet.
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

  // (5) Der useState-Value "isActive" wird in Line 12 auf "false" & "seconds" wird in Line 13 auf "10" gesetzt und löst
  // useEffect in Zeile 53 aus, da dort als Dependency-Value (Zeile 65) "isActive" & "seconds" auf Änderungen warten.
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

  // (6) Nach dem Klick auf den Button: "Start Game" werden untenstehende States wieder zurückgesetzt bzw. das Game wird neu initalisiert.
  function reset() {
    setUserSum(0);
    setSeconds(props.times);
    setIsActive(true);
    setInitGame(!initGame);
  }
  // (7) Nach dem Klick auf eines der Zahlen-Button, werden die Werte mit dem State "userSum" addiert.
  // Von hier aus könnte das Game ausgewertet werden, in dem wir ein useEffect() mit dem Dependency-Value "userSum" nutzen.
  // Dieser wird nach jeder Änderung von "userSum" das Ergebnis auswerten und die gewünschte Reaktion auslösen.
  function getUserSum(e) {
    setUserSum((userSum) => Number(userSum + Number(e.target.value)));
  }

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
