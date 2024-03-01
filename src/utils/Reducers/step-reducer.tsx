import { initialState } from "../Provider/step-provider";

export type StepState = typeof initialState

export type StepAction =
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "UPDATE_DATA"; payload: Record<string, unknown> }
  | { type: "RESET_STATE" }

export const stepReducer = (state: StepState, action: StepAction) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREVIOUS_STEP":
      return { ...state, currentStep: state.currentStep - 1 };
    case "UPDATE_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    default:
      return state;
  }
}