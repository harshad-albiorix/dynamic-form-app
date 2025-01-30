import { useDispatch, useSelector } from "react-redux";
import { CreateFormContainer } from "../../container";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setFormData } from "../../redux/FormSlice";

export const EditFormControl = () => {
  const params = useParams();
  const id = params?.id;
  const forms = useSelector((state: RootState) => state.main.data);
  const dispatch = useDispatch();

  const cFormData = forms?.find((x) => {
    if (id) {
      return x.id === +id;
    }
  });

  useEffect(() => {
    if (cFormData) {
      dispatch(setFormData(cFormData));
    }
  }, [cFormData]);

  return <CreateFormContainer />;
};
