function gerarQuestoes(area) {
  const perguntas = [
    `Como a IA pode ajudar em ${area}?`,
    `Por que aplicar IA em tarefas do dia a dia na área de ${area}?`,
    `Quais são os benefícios do uso da IA em ${area}?`,
    `Como a IA melhora os processos em ${area}?`,
    `Em que a IA impacta o futuro de ${area}?`,
    `Como a IA transforma a produtividade em ${area}?`,
    `A IA pode substituir tarefas manuais em ${area}?`,
    `De que forma a IA facilita análises em ${area}?`,
    `Por que investir em IA na área de ${area}?`,
    `A IA é realmente útil para quem estuda ${area}?`
  ];

  const respostas = [
    `A IA auxilia nas decisões em ${area.toLowerCase()} com dados precisos.`,
    `É utilizada para automatizar rotinas complexas em ${area.toLowerCase()}.`,
    `Contribui com análises preditivas aplicadas em ${area.toLowerCase()}.`,
    `Ajuda na redução de erros em processos de ${area.toLowerCase()}.`,
    `Permite ganhos de produtividade em ${area.toLowerCase()}.`,
    `Facilita a organização de dados em ${area.toLowerCase()}.`,
    `Acelera diagnósticos e soluções em ${area.toLowerCase()}.`,
    `É usada para detectar padrões e falhas em ${area.toLowerCase()}.`,
    `Otimiza tarefas administrativas em ${area.toLowerCase()}.`,
    `Fortalece a inovação tecnológica na área de ${area.toLowerCase()}.`
  ];

  return perguntas.map((q, i) => {
    const correta = respostas[i];
    const erradas = [
      "Não é recomendada para isso.",
      "Depende do caso, mas geralmente não."
    ];
    const opcoes = [correta, ...erradas].sort(() => Math.random() - 0.5);
    return {
      q: q,
      a: opcoes,
      c: opcoes.indexOf(correta)
    };
  });
}

const questionsData = {
  informatica: {
    facil: gerarQuestoes("Informática"),
    medio: gerarQuestoes("Informática"),
    dificil: gerarQuestoes("Informática")
  },
  administracao: {
    facil: gerarQuestoes("Administração"),
    medio: gerarQuestoes("Administração"),
    dificil: gerarQuestoes("Administração")
  },
  quimica: {
    facil: gerarQuestoes("Química"),
    medio: gerarQuestoes("Química"),
    dificil: gerarQuestoes("Química")
  }
};

let currentQ = 0, score = 0, questions = [];

function startGame() {
  const area = document.getElementById("area-select").value;
  const nivel = document.getElementById("nivel-select").value;
  const name = document.getElementById("username").value;
  if (!name) return alert("Digite seu nome!");
  questions = questionsData[area][nivel];
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  document.getElementById("greeting").textContent = `Boa sorte, ${name}!`;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQ];
  document.getElementById("question-text").textContent = q.q;
  const answers = document.getElementById("answers");
  answers.innerHTML = "";
  q.a.forEach((alt, i) => {
    const btn = document.createElement("button");
    btn.textContent = `${String.fromCharCode(65 + i)}) ${alt}`;
    btn.onclick = () => checkAnswer(i);
    answers.appendChild(btn);
  });
}

function checkAnswer(index) {
  const q = questions[currentQ];
  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.c) btn.classList.add("correct");
    if (i === index && index !== q.c) btn.classList.add("incorrect");
  });
  if (index === q.c) score++;
}

function nextQuestion() {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "block";
  document.getElementById("final-username").textContent = document.getElementById("username").value;
  document.getElementById("score").textContent = score;
  document.getElementById("total").textContent = questions.length;

  document.getElementById("feedback").textContent =
    score === questions.length ? "PERFEITO!" :
    score >= questions.length / 2 ? "Mandou bem!" : "Continue tentando!";

  document.getElementById("badge").textContent =
    score === questions.length ? "🏆 Gênio" :
    score >= questions.length / 2 ? "🎖️ Explorador" : "📘 Iniciante";

  const name = document.getElementById("username").value;
  let ranking = []; // ranking resetado aqui!
  ranking.push({ name, score });
  localStorage.setItem("iaquiz_ranking", JSON.stringify(ranking));

  const list = document.getElementById("ranking");
  list.innerHTML = "";
  ranking.forEach((entry, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${entry.name} - ${entry.score} pts`;
    list.appendChild(li);
  });

  document.getElementById("chatbot").textContent =
    "Parabéns, " + name + "! Eu, Robô IA, reconheço seu esforço!";
}

function toggleTheme() {
  const status = document.getElementById("theme-status");
  const isLight = document.body.classList.toggle("light-mode");
  status.textContent = isLight ? "Claro" : "Escuro";
  localStorage.setItem("iaquiz_theme", isLight ? "light" : "dark");
}

window.onload = () => {
  const savedTheme = localStorage.getItem("iaquiz_theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    document.getElementById("theme-status").textContent = "Claro";
  }
};
