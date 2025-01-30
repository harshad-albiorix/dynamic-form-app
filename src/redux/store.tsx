import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import FormSlice, { formInitialValue } from "./FormSlice";
import MainSlice, { mainInitialValue } from "./MainSlice";

export type rootReducerType = {
  main: typeof mainInitialValue;
  form: typeof formInitialValue;
};

export const RootReducer = combineReducers({
  main: MainSlice,
  form: FormSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const pstore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
