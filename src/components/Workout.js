import React, { useEffect, useState } from "react";
import "./styles.css";
const Workout = () => {
  const defaultTimer = 60;
  const [isActive, setIsActive] = useState(false);
  const [counting, setCounting] = useState(null);
  const [timer, setTimer] = useState(defaultTimer);
  const [taskDone, setTaskDone] = useState(false);
  const [link, setLink] = useState(null);
  const [tasks, setTasks] = useState([
    { task: "Curl Up", completed: false },
    { task: "Push Up", completed: false },
    { task: "Jumping Jacks", completed: false },
    { task: "Squat", completed: false },
    { task: "Half Burpees", completed: false },
    { task: "Plank", completed: false },
    { task: "Jump Squat", completed: false },
    { task: "Plank to Jump Squat", completed: false },
    { task: "Twisting Mountain Climbing", completed: false },
    { task: "Plank Jumps", completed: false },
  ]);

  // get the certain user
  const allUsers = useSelector((state) => {
    return state.allUsers;
  });

  let user = null;
  if (id !== "") {
    user = allUsers.find((user) => user._id === id);
    if (!user) {
      console.error("Can't find this user: " + id);
      history.goBack();
    }
  }

  /*
      { task: "Jumping Jacks", completed: false },
    { task: "Squat", completed: false },
    { task: "Half Burpees", completed: false },
    { task: "Plank", completed: false },
    { task: "Jump Squat", completed: false },
    { task: "Plank to Jump Squat", completed: false },
    { task: "Twisting Mountain Climbing", completed: false },
    { task: "Plank Jumps", completed: false },
  */

  // styling
  const tbodyClass = "col-sm mt-2 mb-2";
  const theadClass = "col-sm mt-3 mb-3 font-weight-bold";

  // today
  const today = require("moment")(new Date()).format("YYYY-MM-DD");

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
        <div>{counting === task && isActive ? timer + " s" : null}</div>
        <div>
          {counting === null ? (
            <button className="button" onClick={() => handleStart(task)}>
              Start
            </button>
          ) : null}
          {counting === task ? (
            <button className="button" onClick={() => reset()}>
              Retake Challenge
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  const handleTask = (task) => {
    let tasksCopy = [...tasks];
    let index = tasksCopy.findIndex((ele) => ele.task === task);
    if (index > -1) {
      tasksCopy[index].completed = true;
      setTasks(tasksCopy);
    }
    let indexOfToday = tasks.find((ele) => ele.completed === false);
    if (typeof indexOfToday !== "object") {
      setTaskDone(true);
    }
  };

  const handleLink = (url) => {
    if (url.search("https://youtu.be") !== -1) {
      setLink(url);
    }
  };

  const submitRecord = () => {
    const added_record = {
      date: today,
      url: link,
    };

    // dispatch(addRecord(added_record, history));
  };

  return (
    <div>
      <div>
        <h3>Record Your Activity Today {today}</h3>
      </div>
      <div className="container ml-0 mb-5 table-striped">
        <div className="row">
          <div className={theadClass}>Tasks</div>
          <div className={theadClass}>Timer</div>
          <div className={theadClass}>Mark Done</div>
        </div>
        {tasks.map((task) => {
          return (
            <div className="row" key={task.task}>
              <div className={tbodyClass}>{task.task}</div>
              <div className={tbodyClass}>
                {task.completed ? null : renderTimer(task.task)}
              </div>
              <div className={tbodyClass}>
                {task.completed ? (
                  <p>DONE</p>
                ) : (
                  <button
                    className="button"
                    onClick={() => handleTask(task.task)}
                  >
                    Click to Mark Completed
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {taskDone ? (
          <div>
            <label>Paste your YouTube Video URL here:</label>
            <input type="text" onChange={(e) => handleLink(e.target.value)} />
            <button
              className="button ml-3"
              type="submit"
              disabled={link === null}
              onClick={submitRecord}
            >
              Submit
            </button>
            <p style={{ color: "red" }}>
              {link === null
                ? "Please make sure to provide valid YouTube URL"
                : null}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Workout;
