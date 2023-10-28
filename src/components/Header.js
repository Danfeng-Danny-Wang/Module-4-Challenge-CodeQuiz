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
    <header className="app-header">
      <div>
        <button
          className="btn"
          style={{ fontSize: "1.2rem", padding: "0.3rem 0.6rem" }}
          onClick={() => dispatch({ type: "finish" })}
        >
          View High Scores
        </button>
      </div>
      <h1>JavaScript Code Quiz</h1>
      <div className="timer">
        Time: {status === "finished" ? 0 : secondsRemaining}
      </div>
    </header>
  );
}

export default Header;
