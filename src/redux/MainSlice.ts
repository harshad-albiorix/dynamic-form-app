import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICreateFormType } from "../types/createFormType";

export interface IMainInitialValue {
  data: Partial<ICreateFormType>[];
}

export const mainInitialValue: IMainInitialValue = {
  data: [],
};

export const MainSlice = createSlice({
  name: "main",
  initialState: mainInitialValue,
  reducers: {
    createForm(state, actions: PayloadAction<Partial<ICreateFormType>>) {
      state.data.push(actions.payload);
    },
    removeForm(state, actions: PayloadAction<number>) {
      state.data = state.data.filter((x) => x.id !== actions.payload);
    },
    updateForm(state, actions: PayloadAction<Partial<ICreateFormType>>) {
      const payload = actions.payload;
      const id = payload.id;
      const curIndex = state.data.findIndex((x) => x.id === id);
      if (curIndex > -1) {
        state.data[curIndex] = payload;
      }
    },
  },
});

export const { createForm, removeForm, updateForm } = MainSlice.actions;

export default MainSlice.reducer;
