import { Routes as BaseRoutes, Route } from "react-router-dom";
import { CreateFormControl, Dashboard, EditFormControl } from "./pages";

export const Routes = () => {
  return (
    <BaseRoutes>
      <Route path="/" Component={Dashboard} />
      <Route path="/create-form-control" Component={CreateFormControl} />
      <Route path="/edit-form-control/:id" Component={EditFormControl} />
    </BaseRoutes>
  );
};
