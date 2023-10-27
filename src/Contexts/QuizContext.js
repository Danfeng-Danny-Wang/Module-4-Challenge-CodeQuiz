import { createContext, useContext, useReducer } from "react";

import questionsList from "../data/questions.json";

const QuizContext = createContext();

const initialState = {
  questions: questionsList.questions,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
      };

    default:
      throw new Error("Unknow Action Type");
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        status,
        index,
        answer,
        points,
        numQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext is used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
