import { notStrictEqual } from "assert";
import React, { useEffect, useState } from "react";
import "./styles.css";
const Workout = () => {
  const defaultTimer = 3;
  const [isActive, setIsActive] = useState(false);
  const [counting, setCounting] = useState(null);
  const [timer, setTimer] = useState(defaultTimer);
  const [complete, setComplete] = useState("");

  const tbodyCls = "col-sm mt-2 mb-2";
  const theadCls = "col-sm mt-3 mb-3 font-weight-bold";

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(function () {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setComplete(complete + counting + " Done!");
      reset();
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const reset = () => {
    setIsActive(false);
    setCounting(null);
    setTimer(defaultTimer);
  };

  const handleStart = (task) => {
    setIsActive(true);
    setCounting(task);
  };

  const renderTimer = (task) => {
    return (
      <div>
        <div>{counting === task && isActive ? timer : null}</div>
        <div>
          {counting === null ? (
            <button className="timer" onClick={() => handleStart(task)}>
              Start
            </button>
          ) : null}
          {counting === task ? (
            <button className="timer" onClick={() => reset()}>
              Retake Challenge
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <h3>Record Your Activity Today</h3>
      </div>
      <div className="container ml-0 table-striped">
        <div className="row">
          <div className={theadCls}>Tasks</div>
          <div className={theadCls}>Timer</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Curl Up</div>
          <div className={tbodyCls}>{renderTimer("Curl Up")}</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Push Up</div>
          <div className={tbodyCls}>{renderTimer("Push Up")}</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Jumping Jacks</div>
          <div className={tbodyCls}>{renderTimer("Jumping Jacks")}</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Squat</div>
          <div className={tbodyCls}>{renderTimer("Squat")}</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Plank Jacks</div>
          <div className={tbodyCls}>{renderTimer("Plank Jacks")}</div>
        </div>
      </div>
      <div className="mt-3">{complete}</div>
    </div>
  );
};

export default Workout;
