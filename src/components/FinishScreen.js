import { useQuiz } from "../Contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highscore, dispatch, name, scoreList } =
    useQuiz();

  return (
    <>
      <p>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}
      </p>
      <p>(The Highest score is: {highscore} points)</p>
      <button onClick={() => dispatch({ type: "restart" })}>Restart!</button>
      <p>You can enter you name here:</p>
      <input
        value={name}
        placeholder="Your name..."
        onChange={(e) =>
          dispatch({ type: "enterName", payload: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "submitName" })}>Enter</button>
      <div>
        <ul>
          {scoreList.map((score, index) => (
            <li
              key={index}
            >{`Name: ${score.name} --- ${score.points} points`}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FinishScreen;
