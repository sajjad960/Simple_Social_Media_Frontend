//  Station releated action define here
import { ActionType } from "./postActions";
// import store
import store from '../store';

//distract dispatch from store
const { dispatch } = store;

//get all station
export const getAllPosts = async () => {
    try {
        //start loading
        dispatch({ type: ActionType?.LOADING, payload: true })

        // When We have api we just pass here payload with dynamic data
        dispatch({ type: ActionType?.GET_ALL_POSTS, payload: null })

    } catch (error: unknown) {
        dispatch({ type: ActionType?.ERROR })
    }
};

//get single station
export const getSinglePost = async (id: unknown) => {

    try {
        //start loading
        dispatch({ type: ActionType?.LOADING, payload: true })

        // When We have api we need to get responce with id and pass it into the payload
        dispatch({ type: ActionType?.GET_SINGLE_POSTS, payload: id })

    } catch (error: unknown) {
        dispatch({ type: ActionType?.ERROR })
    }
};