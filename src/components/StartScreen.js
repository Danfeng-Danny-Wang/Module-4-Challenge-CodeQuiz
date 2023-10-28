import { useQuiz } from "../Contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to the JavaScript Code Quiz</h2>
      <h3>{numQuestions} questions to test your JavaScript knowledge!</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Gooooo!
      </button>
    </div>
  );
}

export default StartScreen;
