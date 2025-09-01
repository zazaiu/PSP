export function renderPowerCard(container) {
    const powerData = {
      sources: ["Народ", "Монарх", "Сила", "Бог", "Олигархия"],
      legitimacy: ["Выборы", "Харизма", "Традиции", "Закон", "Наследование"],
      institutions: ["Государство", "Армия", "Партия", "Лидер", "Церковь"],
      goals: ["Контроль", "Порядок", "Влияние", "Стабильность", "Подчинение"]
    };
  
    const questions = [
      {
        text: "Легитимность — это контроль над армией и полицией.",
        correct: false,
        explanation: "Нет, это контроль. Легитимность — это признание власти обществом."
      },
      {
        text: "Влияние — это способность управлять поведением людей.",
        correct: true,
        explanation: "Влияние — это возможность убеждать, давить или использовать авторитет."
      },
      {
        text: "Ресурсы включают деньги, армию и СМИ.",
        correct: true,
        explanation: "Ресурсы — это экономическая, военная и информационная мощь."
      },
      {
        text: "Контроль — это когда люди добровольно признают власть.",
        correct: false,
        explanation: "Нет, это легитимность. Контроль связан с принуждением."
      }
    ];
  
    const html = `
      <div class="card">
        <h2>Формула Власти</h2>
        <div id="powerFormula"></div>
        <button onclick="generatePowerFormula()">Сгенерировать</button>
      </div>
  
      <div class="card">
        <h2>Викторина</h2>
        <div id="quiz"></div>
      </div>
    `;
  
    container.innerHTML = html;
  
    window.generatePowerFormula = function () {
      const source = getRandom(powerData.sources);
      const legit = getRandom(powerData.legitimacy);
      const inst = getRandom(powerData.institutions);
      const goal = getRandom(powerData.goals);
  
      document.getElementById("powerFormula").innerHTML = `
        Источник: ${source}<br>
        Легитимность: ${legit}<br>
        Институт: ${inst}<br>
        Цель: ${goal}<br>
        <div class="formula">Формула: ${source} → ${legit} → ${inst} → ${goal}</div>
      `;
    };
  
    function getRandom(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  
    renderQuiz();
  
    function renderQuiz() {
      const quizContainer = document.getElementById("quiz");
      quizContainer.innerHTML = "";
  
      questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("mb-3");
  
        questionDiv.innerHTML = `
          <p><strong>${index + 1}. ${q.text}</strong></p>
          <button class="btn btn-outline-success me-2" onclick="checkAnswer(${index}, true)">Верно</button>
          <button class="btn btn-outline-danger" onclick="checkAnswer(${index}, false)">Неверно</button>
          <div id="feedback-${index}" class="mt-1"></div>
        `;
  
        quizContainer.appendChild(questionDiv);
      });
    }
  
    window.checkAnswer = function(index, userAnswer) {
      const question = questions[index];
      const feedback = document.getElementById(`feedback-${index}`);
      const correct = userAnswer === question.correct;
  
      feedback.innerHTML = correct
        ? `<span style="color: green;">✅ Правильно!</span> ${question.explanation}`
        : `<span style="color: red;">❌ Неверно.</span> ${question.explanation}`;
    };
  }
  