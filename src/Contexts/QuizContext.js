import { createContext, useContext, useReducer } from "react";

import questionsList from "../data/questions.json";

const QuizContext = createContext();

const initialState = {
  questions: questionsList.questions,
  status: "ready",
  index: 0,
  answer: null,
  result: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
      };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        result: action.payload === question.correctOption,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return {
        ...state,
        answer: null,
        result: null,
        index: state.index + 1,
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        status: "ready",
      };

    default:
      throw new Error("Unknow Action Type");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, result },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  return (
    <QuizContext.Provider
      value={{
        dispatch,
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        result,
        numQuestions,
        maxPossiblePoints,
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
