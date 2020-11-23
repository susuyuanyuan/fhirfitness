import axios from "axios";
const URL = "http://localhost:5000/api/fitness";

function setRunStatus(runStats) {
  return {
    type: "SET_RUN_STATUS",
    runStats,
  };
}

function requestFetchSuccess(user) {
  return {
    type: "USER_FETCH_SUCCESS",
    users,
    totalUserCount,
  };
}

function requestFail(error) {
  return {
    type: "USER_FETCH_FAIL",
    error,
  };
}

// get user
export function getUsers(id) {
  return (dispatch, getState) => {
    if (getState().runStats === RUN_STATUS.LOADING) {
      return;
    }
    dispatch(setRunStatus(RUN_STATUS.LOADING));
    axios
      .get(URL + "&id=" + id)
      .then((response) => {
        const newUsers = overwrite
          ? response.data.docs
          : deDupUsers(getState().allUsers.concat(response.data.docs));
        dispatch(requestFetchSuccess(newUsers, response.data.totalDocs));
      })
      .catch((err) => {
        console.error(err);
        dispatch(requestFail(err));
      });
  };
}

// update or add user
export function updateUser(user, history) {
  console.log(user);
  return (dispatch, getState) => {
    axios
      .post(URL + USER_API, user)
      .then(() => {
        dispatch(setRunStatus(RUN_STATUS.FETCH_NEW));
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        dispatch(requestFail(err));
      });
  };
}
