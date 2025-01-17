import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!

const questions = [
  {
    id: 1,
    questionText:
      " On ___ ___, he asked me what day it was.\r\n“It's ___ ___.”",
    options: ["November 3rd", "December 3rd", "October 3rd", "September 3rd"],
    correctAnswerIndex: 2,
  },
  {
    id: 2,
    questionText:
      "Clueless and 10 Things I Hate About You are both based on literary works.\r\nWhich are they based on?",
    options: [
      "Pride & Prejudice and Hamlet",
      "Romeo & Juliet and Jane Eyre",
      "Hamlet and Emma",
      "Emma and Taming of the Shrew",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 3,
    questionText:
      "According to Elle Woods, the best way to pick up something you dropped is with a ...",
    options: [
      "swish and flick",
      "bend and snap",
      "arch and grab",
      "bow and snatch",
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 4,
    questionText:
      "What film is this iconic line from? “Yo, hold my poodle! Hold my poodle!”",
    options: ["Clueless", "White Chicks", "Legally Blonde", "Scary Movie"],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    questionText:
      "“It's like I have ESPN or something!” is referring to Karen's ability to sense ______.",
    options: [
      "the weather with her breasts",
      "the time of day with her ears",
      "people's moods with her eyes",
      "the weather with her knees",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 6,
    questionText: "“Why should I listen to you, anyway?\r\nYou're __________.”",
    options: [
      "a fake woke poser with a trustfund",
      "a loser who can't dress right",
      "a virgin who can't drive",
      "just mad you can't eat carbs",
    ],
    correctAnswerIndex: 2,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
        state.currentQuestionIndex += 1;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
