import {configureStore} from '@reduxjs/toolkit'
import catagoryReducer from '../feature/catagory.slice.tsx'

export default configureStore({
  reducer: {
	  catagory: catagoryReducer,
  },
});
