import React from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const answers = useSelector((store) => store.quiz.answers)
  let counter = 0;
  console.log(answers)
  return (
    <div className="quiz-done">
      <h1>Quiz is done!</h1>
      {answers.map((answer, index) => {

        const correctAnswer = answer.question.options[answer.question.correctAnswerIndex];
        if (correctAnswer === answer.answer) {
          counter++
        }

        return (
          <React.Fragment key={answer.questionId}>
            <h2>Question {index+1}:<br />{answer.question.questionText}</h2>
            {/* <h1>{answer.question.questionText}</h1> */}
            <p>You answered {answer.answer} which was {answer.isCorrect ? "correct!" : "sadly incorrect."}</p>
            {/* <h2>You were {answer.isCorrect ? 'right!' : 'wrong HAHA.'}</h2> */}
            {!answer.isCorrect && <p>The correct answer was {correctAnswer}</p>}
            
          </React.Fragment>
        )
      })}

      <p>You got {counter} / 5 correct!</p>
      {counter > 4 
        ? <p>WOOOOOOOOOOOOOHOOOOOOOOOOO!</p>
        : counter > 2 
          ? <p>Not bad!</p>
          : <p>Better luck next time!</p>
      }
    </div>
  );
};

export default Summary;
