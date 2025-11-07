import { useState } from "react";
import "./App.css";

function App() {
  // ✅ Question and Choice structure (like in your C# version)
  const questions = [
    {
      text: "What does C# stand for?",
      choices: [
        { value: "C Sharp", answer: true },
        { value: "C Slide" },
        { value: "C Snake" },
        { value: "C Square" },
      ],
    },
    {
      text: "Who developed the .NET Framework?",
      choices: [
        { value: "Google" },
        { value: "Microsoft", answer: true },
        { value: "Apple" },
        { value: "IBM" },
      ],
    },
    {
      text: "Which data type holds true/false in C#?",
      choices: [
        { value: "int" },
        { value: "string" },
        { value: "bool", answer: true },
        { value: "double" },
      ],
    },
    {
      text: "Which keyword is used to define a class in C#?",
      choices: [
        { value: "def" },
        { value: "function" },
        { value: "class", answer: true },
        { value: "struct" },
      ],
    },
  ];

  // ✅ State management
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[current];

  // ✅ Handle "Next" click
  const handleNext = () => {
    if (selected === null) {
      alert("Please select an answer first!");
      return;
    }

    // Check answer
    if (currentQuestion.choices[selected].answer) {
      setScore(score + 1);
    }

    // Move to next question or show result
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  };

  // ✅ Restart quiz
  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!showResult ? (
          <>
            <h2>Question No. {current + 1}</h2>
            <p className="question-text">{currentQuestion.text}</p>

            <div className="choices">
              {currentQuestion.choices.map((choice, index) => (
                <label key={index} className="choice-label">
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selected === index}
                    onChange={() => setSelected(index)}
                  />
                  {index + 1}. {choice.value}
                </label>
              ))}
            </div>

            <button className="next-btn" onClick={handleNext}>
              {current + 1 === questions.length ? "Finish Quiz" : "Next"}
            </button>
          </>
        ) : (
          <div className="result">
            <h2>Quiz Completed 🎉</h2>
            <p>
              Your Score: {score} / {questions.length}
            </p>
            <p>
              {score === questions.length
                ? "Perfect! 🔥"
                : score > questions.length / 2
                ? "Good job! 👍"
                : "Keep practicing 💪"}
            </p>
            <button className="restart-btn" onClick={handleRestart}>
              Restart
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;