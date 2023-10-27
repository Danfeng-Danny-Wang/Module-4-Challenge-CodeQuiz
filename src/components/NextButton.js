import { useQuiz } from "../Contexts/QuizContext";

function NextButton() {
  const { dispatch, answer, numQuestions, index } = useQuiz();
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "nextQuestion" })}>Next!</button>
    );

  if (index === numQuestions - 1)
    return (
      <button onClick={() => dispatch({ type: "finish" })}>Finish!</button>
    );
}

export default NextButton;
