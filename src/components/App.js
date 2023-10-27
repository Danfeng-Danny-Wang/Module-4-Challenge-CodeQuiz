import { useQuiz } from "../Contexts/QuizContext";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";

function App() {
  const { status } = useQuiz();

  return (
    <div>
      <Header />

      <Main>{status === "ready" && <StartScreen />}</Main>
    </div>
  );
}

export default App;
