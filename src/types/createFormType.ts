export type QuestionType =
  | ""
  | "text"
  | "number"
  | "textarea"
  | "date"
  | "dropdown"
  | "radio";

export type ValidationType = "required" | "minLength" | "maxLength";

interface ILength {
  min: number;
  max: number;
}

interface IOption {
  label: string;
  value: string;
}

interface IBaseFormQuestion {
  id?: number;
  question: string;
  type: QuestionType;
  validation: string[];
}

interface INumberFormQuestion extends IBaseFormQuestion {
  type: "number";
  length: ILength;
}

interface IDropdownFormQuestion extends IBaseFormQuestion {
  type: "dropdown";
  options: IOption[];
}

interface IRadioFormQuestion extends IBaseFormQuestion {
  type: "radio";
  options: IOption[];
}

export type IFormQuestions =
  | IBaseFormQuestion
  | INumberFormQuestion
  | IDropdownFormQuestion
  | IRadioFormQuestion;

export interface ICreateFormType {
  id: number;
  formName: string;
  formQuestions: IFormQuestions[];
}
