//  Station releated action define here
import { ActionType } from "./stationActions";
// import store
import store from '../store';

//distract dispatch from store
const { dispatch } = store;

//get all station
export const getAllStation = async () => {
    try {
        //start loading
        dispatch({ type: ActionType?.LOADING, payload: true })

        // When We have api we just pass here payload with dynamic data
        dispatch({ type: ActionType?.GET_ALL_STATION, payload: null })

    } catch (error: any) {
        dispatch({ type: ActionType?.ERROR })
    }
};

//get single station
export const getSingleStation = async (id: any) => {

    try {
        //start loading
        dispatch({ type: ActionType?.LOADING, payload: true })

        // When We have api we need to get responce with id and pass it into the payload
        dispatch({ type: ActionType?.GET_SINGLE_STATION, payload: id })

    } catch (error: any) {
        dispatch({ type: ActionType?.ERROR })
    }
};