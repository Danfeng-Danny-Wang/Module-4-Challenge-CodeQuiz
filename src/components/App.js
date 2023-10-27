import { useQuiz } from "../Contexts/QuizContext";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Footer from "./Footer";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";

function App() {
  const { status } = useQuiz();

  return (
    <div>
      <Header />

      <Main>
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Question />
            <Footer>
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
