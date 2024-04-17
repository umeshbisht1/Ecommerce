import { configureStore ,combineReducers} from '@reduxjs/toolkit'
import userReducer from './createslice.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import  cartreducer from './Addcartslice.js'

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}
const rootReducer = combineReducers({
  userReducer,cartreducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer )

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  
})

export const persistor = persistStore(store)
