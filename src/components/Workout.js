import { notStrictEqual } from "assert";
import React, { useEffect, useState } from "react";
import "./styles.css";
const Workout = () => {
  const defaultTimer = 3;
  const [isActive, setIsActive] = useState(false);
  const [counting, setCounting] = useState(null);
  const [timer, setTimer] = useState(defaultTimer);
  const [curlUp, setCurlUp] = useState(false);
  const [pushUp, setPushUp] = useState(false);
  const [jumpingJacks, setJumpingJacks] = useState(false);
  const [squat, setSquat] = useState(false);
  const [plankJacks, setPlankJacks] = useState(false);

  const complete = curlUp && pushUp && jumpingJacks && squat && plankJacks;
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
          <div className={theadCls}>Mark Done</div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Curl Up</div>
          <div className={tbodyCls}>
            {curlUp ? null : renderTimer("Curl Up")}
          </div>
          <div className={tbodyCls}>
            {curlUp ? (
              <p>DONE</p>
            ) : (
              <button
                className="workout-button"
                onClick={() => setCurlUp(true)}
              >
                Click to Mark Curl Up DONE
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Push Up</div>
          <div className={tbodyCls}>
            {pushUp ? null : renderTimer("Push Up")}
          </div>
          <div className={tbodyCls}>
            {pushUp ? (
              <p>DONE</p>
            ) : (
              <button
                className="workout-button"
                onClick={() => setPushUp(true)}
              >
                Click to Mark Push Up DONE
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Jumping Jacks</div>
          <div className={tbodyCls}>
            {jumpingJacks ? null : renderTimer("Jumping Jacks")}
          </div>
          <div className={tbodyCls}>
            {jumpingJacks ? (
              <p>DONE</p>
            ) : (
              <button
                className="workout-button"
                onClick={() => setJumpingJacks(true)}
              >
                Click to Mark Jumping Jacks DONE
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Squat</div>
          <div className={tbodyCls}>{squat ? null : renderTimer("Squat")}</div>
          <div className={tbodyCls}>
            {squat ? (
              <p>DONE</p>
            ) : (
              <button className="workout-button" onClick={() => setSquat(true)}>
                Click to Mark Squat DONE
              </button>
            )}
          </div>
        </div>
        <div className="row">
          <div className={tbodyCls}>2 Minute Plank Jacks</div>
          <div className={tbodyCls}>
            {plankJacks ? null : renderTimer("Plank Jacks")}
          </div>
          <div className={tbodyCls}>
            {plankJacks ? (
              <p>DONE</p>
            ) : (
              <button
                className="workout-button"
                onClick={() => setPlankJacks(true)}
              >
                Click to Mark Plank Jacks DONE
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-3">{complete ? <p>Tasks Done!</p> : null}</div>
    </div>
  );
};

export default Workout;
