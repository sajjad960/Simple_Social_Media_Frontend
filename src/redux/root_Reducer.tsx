import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
// our all reducer goes here,
import postReducer from './postRedux/postReducer'

const rootReducers = combineReducers({
    // station reducer
    postReducer,
});

export default rootReducers;

//This RootState is required to use useSelector later on
export type RootState = ReturnType<typeof rootReducers>;

// made a custom app selector to grab state value from reducer
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
