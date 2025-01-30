import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRef, useState } from "react";
import { IFormQuestions, IOption } from "../types/createFormType";
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
  const [edit, setEdit] = useState<IFormQuestions & Partial<{ options: any[] }>>();
  const [options, setOptions] = useState<IOption[]>([]);


  const formik = useFormik<IFormQuestions>({
    initialValues: {
      question: "",
      type: "",
      validation: [],
    },
    onSubmit: (value: IFormQuestions) => handleSubmit(value),
  });

  const formikRef = useRef(formik);

  const handleCreateQuestion = (
    value: IFormQuestions & Partial<{ options: any[] }>
  ) => {

    const id = generateUniqueRandomNumber();
    dispatch(
      setFormData({
        formQuestions: formData?.formQuestions
          ? [...formData.formQuestions!, { ...value, id }]
          : [{ ...value, id }],
      })
    );
  };

  const handleEditQuestion = (value: IFormQuestions & Partial<{ options: any[] }>) => {
    const newF = formData?.formQuestions?.map((x) =>
      x.id === edit?.id ? { ...value, id: edit?.id } : x
    );
    dispatch(updateFormData({ ...formData, formQuestions: newF }));
    setEdit(undefined);
    setOptions([]);
  };

  const handleSubmit = (value: IFormQuestions) => {
    if (value) {
      if (edit) {
        if (["dropdown", "multi-select", "radio"].includes(value.type)) {
          handleEditQuestion({ ...value, options });
        } else {
          handleEditQuestion(value);
        }
      } else {
        if (["dropdown", "multi-select", "radio"].includes(value.type)) {
          handleCreateQuestion({ ...value, options });
        } else {
          handleCreateQuestion(value);
        }
      }
      formik.resetForm();
      setOptions([]);
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

  return {
    edit,
    formik,
    formikRef,
    setEdit,
    setOptions,
    options,
    handleSaveForm,
    handleBackToList,
  };
};
