import { ReactNode, createContext } from "react";

// const initialState = {
//   currentStep: 0,
//   formData: {},
// };

// const stepReducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "NEXT":
//       return {
//         ...state,
//         currentStep: state.currentStep + 1,
//       }
//   }
// }

const StepContext = createContext(null);

export default function StepProvider({ children }: { children: ReactNode }) {
  // const [state, dispath] = useReducer(null, initialState);


  return (
    <>
      <StepContext.Provider value={{

      }}>
        {children}
      </StepContext.Provider>
    </>
  )

}