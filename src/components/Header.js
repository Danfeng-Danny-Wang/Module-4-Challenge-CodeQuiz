import { useEffect } from "react";
import { useQuiz } from "../Contexts/QuizContext";

function Header() {
  const { status, dispatch, secondsRemaining } = useQuiz();

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <div>
      <button onClick={() => dispatch({ type: "finish" })}>
        <h4>View High Scores</h4>
      </button>
      <span>Time: {status === "finished" ? 0 : secondsRemaining}</span>
    </div>
  );
}

export default Header;
