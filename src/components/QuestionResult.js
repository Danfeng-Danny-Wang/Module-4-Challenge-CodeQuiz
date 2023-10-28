import { useQuiz } from "../Contexts/QuizContext";

function QuestionResult() {
  const { answer, result } = useQuiz();

  if (answer === null) return null;

  return (
    <h4>
      <strong>{result ? "Correct!" : "Wrong!"}</strong>
    </h4>
  );
}

export default QuestionResult;
