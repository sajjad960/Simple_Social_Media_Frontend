
//all auth related Action type will be defined here
export enum ActionType {
    GET_ALL_STATION = 'GET_ALL_STATION',
    GET_SINGLE_STATION = 'GET_SINGLE_STATION',
    //for loading screen
    LOADING = 'LOADING',
    //ERROR
    ERROR = 'ERROR'
}

//operations type define

interface actionGetAllStation {
    type: ActionType.GET_ALL_STATION;
    payload: any;
}

interface actionGetSingleStation {
    type: ActionType.GET_SINGLE_STATION;
    payload: any;

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
