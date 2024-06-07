import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRef, useState } from "react";
import { IFormQuestions } from "../types/createFormType";
import { useFormik } from "formik";
import { generateUniqueRandomNumber } from "../utils/func";
import { resetFormData, setFormData, updateFormData } from "../redux/FormSlice";
import { createForm, updateForm } from "../redux/MainSlice";

export const useCreateForm = () => {
  const params = useParams();
  const editId = params?.id;
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form.formData);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<IFormQuestions>();

  const formik = useFormik<IFormQuestions>({
    initialValues: {
      question: "",
      type: "",
      validation: [],
    },
    onSubmit: (value: IFormQuestions) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  const handleCreateQuestion = (value: IFormQuestions) => {
    const id = generateUniqueRandomNumber();
    dispatch(
      setFormData({
        formQuestions: formData?.formQuestions
          ? [...formData.formQuestions!, { ...value, id }]
          : [{ ...value, id }],
      })
    );
  };

  const handleEditQuestion = (value: IFormQuestions) => {
    const newF = formData?.formQuestions?.map((x) =>
      x.id === edit?.id ? { ...value, id: edit?.id } : x
    );
    dispatch(updateFormData({ ...formData, formQuestions: newF }));
    setEdit(undefined);
  };

  const handleSubmit = (value: IFormQuestions) => {
    if (value) {
      if (edit) {
        handleEditQuestion(value);
      } else {
        handleCreateQuestion(value);
      }
      formik.resetForm();
    }
  };

  const handleBackToList = () => {
    dispatch(resetFormData());
    navigate("/");
  };

  const handleSaveForm = () => {
    if (formData) {
      if (!!formData?.formQuestions?.length) {
        if (editId) {
          dispatch(updateForm(formData));
        } else {
          dispatch(createForm(formData));
        }

        handleBackToList();
      }
    }
  };

  return { edit, formik, formikRef, setEdit, handleSaveForm, handleBackToList };
};
