
//all auth related Action type will be defined here
export enum ActionType {
    GET_ALL_POSTS = 'GET_ALL_POSTS',
    GET_SINGLE_POSTS= 'GET_SINGLE_POSTS',
    //for loading screen
    LOADING = 'LOADING',
    //ERROR
    ERROR = 'ERROR'
}

//operations type define

interface actionGetAllStation {
    type: ActionType.GET_ALL_POSTS;
    payload: unknown;
}

interface actionGetSingleStation {
    type: ActionType.GET_SINGLE_POSTS;
    payload: unknown;

}

// Loading and error
interface loading {
    type: ActionType.LOADING;
    payload: boolean;
}
interface error {
    type: ActionType.ERROR;
}

export type Action =
    | actionGetAllStation
    | actionGetSingleStation
    | loading
    | error;
