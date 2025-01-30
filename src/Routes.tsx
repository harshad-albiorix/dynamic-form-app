import { Routes as BaseRoutes, Route } from "react-router-dom";
import {
  CreateFormControl,
  Dashboard,
  EditFormControl,
  Preview,
} from "./pages";

export const Routes = () => {
  return (
    <BaseRoutes>
      <Route path="/" Component={Dashboard} />
      <Route path="/create-form-control" Component={CreateFormControl} />
      <Route path="/edit-form-control/:id" Component={EditFormControl} />
      <Route path="/preview/:id" Component={Preview} />
    </BaseRoutes>
  );
};
