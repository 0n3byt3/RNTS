import {configureStore} from '@reduxjs/toolkit'
import catagoryReducer from '../feature/catagory.slice'

const store = configureStore({
  reducer: {
	  catagory: catagoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
