import { useQuiz } from "../Contexts/QuizContext";

function QuestionResult() {
  const { answer, result } = useQuiz();

  if (answer === null) return null;

  return (
    <div>
      <strong>{result ? "Correct!" : "Wrong!"}</strong>
    </div>
  );
}

export default QuestionResult;
