import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../services/BaseService'
import authReducer from './auth/slice'
import postReducer from './post/slice'

const rootReducer = combineReducers({
  post: postReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
