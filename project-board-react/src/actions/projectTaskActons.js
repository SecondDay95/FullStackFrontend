import axios from "axios";
import { GET_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from "./types";

export const addProjectTask = (project_task, history) => async dispatch => {

    try {
        await axios.post("http://localhost:8181/api/board", project_task);
        history.push("/projectBoard");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch(error)
    {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });

    }
}

export const getBacklog = () => async dispatch => {

    const res = await axios.get("http://localhost:8181/api/board/all");
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    });
}

export const deleteProjectTask = pt_id => async dispatch => {

    if (window.confirm(`You are deleting project task ${pt_id}. This operation cannot be unload. Are you sure?`))
    {
        await axios.delete(`http://localhost:8181/api/board/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });
    }
};

export const getProjectTask = (pt_id, history) => async dispatch => {

    try {
        const res = await axios.get(`http://localhost:8181/api/board/${pt_id}`);
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    }
    catch (error) {
        history.push("/projectBoard");
    }
};