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
      <h4>View High Scores</h4>
      <p>Time: {status === "finished" ? 0 : secondsRemaining}</p>
    </div>
  );
}

export default Header;
