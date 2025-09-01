export function renderPoliticsCard(container) {
  const politicsData = {
    subjects: ["Партия", "Граждане", "Элиты", "Движения", "Лоббисты"],
    means: ["Убеждение", "Насилие", "Дипломатия", "Пропаганда", "Диалог"],
    objects: ["Власть", "Ресурсы", "Повестка", "Законы", "Общество"],
    aims: ["Влияние", "Преобразование", "Развитие", "Доминирование", "Справедливость"]
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
      <h2>Формула Политики</h2>
      <div id="politicsFormula"></div>
      <button onclick="generatePoliticsFormula()">Сгенерировать</button>
    </div>

    <div class="card">
      <h2>Викторина</h2>
      <div id="quiz"></div>
    </div>
  `;

  container.innerHTML = html;

  window.generatePoliticsFormula = function () {
    const subj = getRandom(politicsData.subjects);
    const means = getRandom(politicsData.means);
    const obj = getRandom(politicsData.objects);
    const aim = getRandom(politicsData.aims);

    document.getElementById("politicsFormula").innerHTML = `
      Субъект: ${subj}<br>
      Средства: ${means}<br>
      Объект: ${obj}<br>
      Цель: ${aim}<br>
      <div class="formula">Формула: ${subj} → ${means} → ${obj} → ${aim}</div>
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
