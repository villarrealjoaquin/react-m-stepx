import { ReactNode, createContext, useReducer, useState } from "react";
import { stepReducer } from "../Reducers/step-reducer";

export const initialState = {
  currentStep: 0,
  formData: {},
};

export const StepContext = createContext(null);

export default function StepProvider({ children }: { children: ReactNode }) {
  const [state, dispath] = useReducer(stepReducer, initialState);
  const [isPortalActive, setIsPortalActive] = useState(false);

  const getAllInfo = () => {
    return state;
  }

  const toggleStep = () => {
    setIsPortalActive(!isPortalActive);
  }

  const getCurrentStep = () => {
    return state.currentStep;
  }

  const nextStep = () => {
    dispath({ type: "NEXT_STEP" });
  }

  const previousStep = () => {
    dispath({ type: "PREVIOUS_STEP" });
  }

  const updateData = (data: any) => {
    dispath({ type: "UPDATE_DATA", payload: data });
  }

  return (
    <>
      <StepContext.Provider value={{
        isPortalActive,
        getAllInfo,
        getCurrentStep,
        nextStep,
        previousStep,
        updateData,
        toggleStep,
      }}>
        {children}
      </StepContext.Provider>
    </>
  )
}

