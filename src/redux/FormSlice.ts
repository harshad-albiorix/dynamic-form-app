import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { ICreateFormType } from "../types/createFormType";

export interface IFormInitialValue {
  formData: Partial<ICreateFormType> | null;
}

export const formInitialValue: IFormInitialValue = {
  formData: null,
};

export const FormSlice = createSlice({
  name: "form",
  initialState: formInitialValue,
  reducers: {
    setFormData(state, actions: PayloadAction<Partial<ICreateFormType>>) {
      state.formData = { ...state.formData, ...actions.payload };
    },
    deleteQuestion(state, actions: PayloadAction<number>) {
      const newFormQuestions = current(state.formData?.formQuestions)?.filter(
        (x) => x.id !== actions.payload
      );

      state.formData = { ...state.formData, formQuestions: newFormQuestions };
    },
    updateFormData(state, actions: PayloadAction<Partial<ICreateFormType>>) {
      state.formData = actions.payload;
    },
    resetFormData(state) {
      state.formData = null;
    },
  },
});

export const { setFormData, deleteQuestion, updateFormData, resetFormData } =
  FormSlice.actions;

export default FormSlice.reducer;
