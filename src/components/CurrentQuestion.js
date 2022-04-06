import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz } from "reducers/quiz";
import {
  ButtonContainer,
  Button,
  Title,
  NextButton,
} from "components_styled/StyledElements";
import ProgressBar from "./ProgressBar";
// import party from "party-js";
// import howcouldthishappen from "../assets/howcouldthishappentome.mp3";
// import howdareyou from "../assets/howdareyou.mp3";
// import letmeaskyou from "../assets/letmeaskyousomething.mp3";
// import teachyou from "../assets/teachyouafewthings.mp3";

// const arr = [howcouldthishappen, howdareyou, letmeaskyou, teachyou];
// const audio = [];
// for (const sound of arr) {
//   const newsound = new Audio();
//   newsound.src = sound;
//   audio.push(newsound);
// }

export const CurrentQuestion = ({ setQuizDone }) => {
  // const randomAudioIndex = Math.floor(Math.random() * audio.length);
  const [hasAnswered, setHasAnswered] = useState(false);
  const dispatch = useDispatch();
  const question = useSelector(
    (store) => store.quiz.questions[store.quiz.currentQuestionIndex]
  );

  const quizOver = useSelector((store) => store.quiz.quizOver);

  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }));
    setTimeout(() => setHasAnswered(true), 800);
    // if (question.correctAnswerIndex === index) {
    //   party.confetti(document.body, {
    //     count: party.variation.range(100, 500),
    //     size: party.variation.range(1.8, 2.6),
    //     shapes: ["star"],
    //   });
    // } else {
    //   audio[randomAudioIndex].play();
    //   // party.resolvableShapes["myImage"] = "👍";
    //   party.confetti(document.body, {
    //     count: party.variation.range(500, 1000),
    //     size: party.variation.range(0.8, 1.6),
    //     color: party.Color.fromHex("#4a412a"),
    //     // shapes: ["myImage"],
    //     shapes: ["square"],
    //   });
    // }
  };

  const handleNextButton = () => {
    dispatch(quiz.actions.goToNextQuestion());
    setHasAnswered(false);
  };

  if (quizOver) {
    setQuizDone(true);
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  return (
    <>
      <Title>Question: {question.questionText}</Title>
      <ButtonContainer>
        {question.options.map((item, index) => {
          return (
            <Button
              disabled={hasAnswered}
              onClick={() => onAnswerSubmit(question.id, index)}
              key={item}
              >
              {item}
            </Button>   
          );
        })}
        </ButtonContainer>
        <ProgressBar/>
        {hasAnswered && <NextButton onClick={handleNextButton}>Next</NextButton>}
    </>
  );
};





