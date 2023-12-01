//bring action with type
// import { StaticStations } from '../../utiles/constants';
import { Action, ActionType } from './stationActions';

//define state variable with their type
export interface stationState {
    allStation: Array<object>;
    singleStation: object;
    playingStation: object;
    loading: boolean;
    error: string;
}

//our initial state define here
//this the initial value of our state
const initialState: stationState = {
    allStation: [],
    singleStation: {},
    playingStation: {},
    loading: false,
    error: '',
};

const stationReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType?.GET_ALL_STATION:
            return {
                ...state,
                allStation: action?.payload,
                loading: false,
            };
        case ActionType?.GET_SINGLE_STATION:
            // eslint-disable-next-line no-case-declarations
            const selectedStation = state?.allStation.find((station) => station?.id === action?.payload);
            return {
                ...state,
                singleStation: selectedStation,
                playingStation: selectedStation,
                loading: false,
            };
        case ActionType?.LOADING:
            return {
                ...state,
                loading: true,
            };
        case ActionType?.ERROR:
            return {
                ...state,
                Error: 'Something is rong',
                loading: false,
            };
        default:
            return state;
    }
};

export default stationReducer;