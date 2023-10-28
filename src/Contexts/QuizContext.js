import { createContext, useContext, useReducer } from "react";

import questionsList from "../data/questions.json";

const QuizContext = createContext();

const SECS_PER_QUESTION = 10;
const initialState = {
  questions: questionsList.questions,
  status: "ready",
  index: 0,
  answer: null,
  result: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  name: "",
  scoreList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
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

    case "enterName":
      return {
        ...state,
        name: action.payload,
      };

    case "submitName":
      const currentScore = {
        name: state.name,
        points: state.points,
      };

      return {
        ...state,
        scoreList: [...state.scoreList, currentScore],
      };

    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        scoreList: state.scoreList,
        status: "ready",
        name: "",
      };

    case "tick":
      if (state.status !== "active")
        return {
          ...state,
        };
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknow Action Type");
  }
}

function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      result,
      secondsRemaining,
      name,
      scoreList,
    },
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
        secondsRemaining,
        name,
        scoreList,
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
