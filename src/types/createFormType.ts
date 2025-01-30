export type QuestionType =
  | ""
  | "text"
  | "email"
  | "number"
  | "textarea"
  | "date"
  | "dropdown"
  | "radio"
  | "multi-select"
  | "checkbox";

export type ValidationType = "required" | "minLength" | "maxLength";

interface ILength {
  min: number;
  max: number;
}

export interface IOption {
  label: string;
  value: string;
  field: string;
}

interface IBaseFormQuestion {
  id?: number;
  question: string;
  type: QuestionType;
  validation: string[];
}

interface IOtherFormQuestion extends IBaseFormQuestion {
  type: "";
}

interface ITextFormQuestion extends IBaseFormQuestion {
  type: "text";
}

interface IEmailFormQuestion extends IBaseFormQuestion {
  type: "email";
}

interface IDateFormQuestion extends IBaseFormQuestion {
  type: "date";
}

interface ITextareaFormQuestion extends IBaseFormQuestion {
  type: "textarea";
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

interface IDropdownWithMultiSelectFormQuestion extends IBaseFormQuestion {
  type: "multi-select";
  options: IOption[];
}

//checkbox
interface ICheckboxFormQuestion extends IBaseFormQuestion {
  type: "checkbox";
  options: IOption[];
}

export type IFormQuestions =
  | ITextFormQuestion
  | IEmailFormQuestion
  | IDateFormQuestion
  | ITextareaFormQuestion
  | INumberFormQuestion
  | IDropdownFormQuestion
  | IRadioFormQuestion
  | IDropdownWithMultiSelectFormQuestion
  | ICheckboxFormQuestion
  | IOtherFormQuestion;

export interface ICreateFormType {
  id: number;
  formName: string;
  formQuestions: IFormQuestions[];
}
