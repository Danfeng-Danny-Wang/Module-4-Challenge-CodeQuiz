import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch, name, scoreList } =
    useQuiz();

  return (
    <>
      <div>
        <p className="result">
          You scored <strong>{points}</strong> out of {maxPossiblePoints}
        </p>
        <p className="highscore">(The Highest score is: {highscore} points)</p>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart!
        </button>
      </div>
      <div className="scoreboard">
        <p>You can enter you name here:</p>
        <input
          value={name}
          placeholder="Your name..."
          onChange={(e) =>
            dispatch({ type: "enterName", payload: e.target.value })
          }
        />
        <button
          className="btn"
          onClick={() => dispatch({ type: "submitName" })}
        >
          Enter
        </button>
        <div>
          <ul>
            {scoreList.map((score, index) => (
              <li
                key={index}
              >{`Name: ${score.name} --- ${score.points} points`}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FinishScreen;
