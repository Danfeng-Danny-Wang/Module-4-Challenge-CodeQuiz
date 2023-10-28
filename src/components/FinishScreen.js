import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  return (
    <>
      <p>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}
      </p>
      <p>(The Highest score is: {highscore} points)</p>
      <button onClick={() => dispatch({ type: "restart" })}>Restart!</button>
    </>
  );
}

export default FinishScreen;
