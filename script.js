const questions = [
  "Знать мат анализ",
  "Пить бензин",
  "Не быть пакетом (целлофановым)",
  "Иметь права на вертолёт",
  "Пожертвовать почку младенца, не имея младенца",
  "Крутить сальтухи",
  "Разговаривать на голубином",
  "Подписать контракт (не важно какой)",
  "Быть викингом",
  "Дружить с Наполеоном (торт или человек, не важно)",
  "Чирикать на английском (обязательно Present Simple)",
  "Сморкаться по-монгольски",
  "Получить диплом инженера по левитации",
  "Знать правило РПП",
  "Быть первым некрофилом в космосе",
  "Получить все ачивки из УК РФ",
  "Написать диссертацию о чебуреках",
  "Уметь делать сальто в 4-мерном пространстве",
  "Спасти детей в Африке от воды",
  "Синтезировать тако из урановых стержней",
  "Измерить площадь Норвегии вручную ватной палочкой",
  "Быть иноагентом",
  "Видеть сквозь стены только красные ценники в «Пятёрочке»",
  "Уметь молчать на всех языках мира",
  "Сдать на 5 тест на ВИЧ и СПИД",
  "Объяснить голубю, что такое ипотека",
  "Выйти из лифта до того, как он закроется",
  "Знать наизусть состав всех видов шаурмы",
  "Победить собственный будильник в честном бою",
  "Иметь запасной план на случай встречи с динозавром"
];

const results = [
  {min:0,max:20,title:"Пакет с амбициями",seal:"🛍",copy:"Лидерский потенциал пока находится в режиме энергосбережения. Зато ты честно отвечал — а это уже подозрительно зрелый поступок.",caption:"Комиссия советует начать с малого: не улететь в пакет."},
  {min:21,max:45,title:"Заместитель по хаосу",seal:"⚡",copy:"Ты уже не просто наблюдатель. В твоих действиях чувствуется уверенность человека, который подписал контракт и даже не спросил, с кем.",caption:"Есть потенциал. Нет инструкции."},
  {min:46,max:70,title:"Лидер сомнительного масштаба",seal:"👑",copy:"Ты опасно близок к величию. Где-то плачет математический анализ, голуби нервничают, а Наполеон уже забронировал столик.",caption:"Высокий уровень легендарности. Проверка реальности не пройдена."},
  {min:71,max:90,title:"Абсолютный альфа-викинг",seal:"🔥",copy:"Ты не ищешь возможности — ты создаёшь новые разделы в энциклопедии невозможного. Тебе пора выдать диплом, вертолёт и личного голубя-переводчика.",caption:"Уровень угрозы здравому смыслу: критический."},
  {min:91,max:100,title:"ПРЕДСЕДАТЕЛЬ ВСЕЛЕННОЙ",seal:"✦",copy:"На этом этапе тест должен был сам попросить у тебя автограф. Ты настолько легендарен, что даже целлофановый пакет рядом с тобой начинает шуршать уважительно.",caption:"Комиссия распущена. Ты теперь и есть комиссия."}
];

const intro = document.querySelector("#intro");
const quiz = document.querySelector("#quiz");
const result = document.querySelector("#result");
const questionText = document.querySelector("#questionText");
const currentNum = document.querySelector("#currentNum");
const questionIndex = document.querySelector("#questionIndex");
const progressFill = document.querySelector("#progressFill");
const answeredCount = document.querySelector("#answeredCount");
const answerButtons = [...document.querySelectorAll(".answer-btn")];
let index = 0;
let answers = [];

function show(section) {
  [intro, quiz, result].forEach(el => el.classList.toggle("hidden", el !== section));
  window.scrollTo({top: 0, behavior: "smooth"});
}

function startQuiz() {
  index = 0;
  answers = [];
  renderQuestion();
  show(quiz);
}

function renderQuestion() {
  const number = String(index + 1).padStart(2, "0");
  currentNum.textContent = number;
  questionIndex.textContent = `ВОПРОС № ${number}`;
  questionText.textContent = questions[index];
  progressFill.style.width = `${(index / questions.length) * 100}%`;
  answeredCount.textContent = `Отвечено: ${answers.length}`;
}

function chooseAnswer(answer) {
  answers[index] = answer;
  if (index < questions.length - 1) {
    index++;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const points = answers.reduce((sum, answer) => sum + (answer === "yes" ? 1 : answer === "maybe" ? 0.5 : 0), 0);
  const score = Math.round((points / questions.length) * 100);
  const tier = results.find(item => score >= item.min && score <= item.max) || results[0];
  document.querySelector("#resultSeal").textContent = tier.seal;
  document.querySelector("#resultTitle").textContent = tier.title;
  document.querySelector("#resultCopy").textContent = tier.copy;
  document.querySelector("#scoreValue").textContent = `${score}%`;
  document.querySelector("#scoreFill").style.width = `${score}%`;
  document.querySelector("#scoreCaption").textContent = tier.caption;
  document.querySelector("#resultKicker").textContent = `ВЕРДИКТ КОМИССИИ · ${answers.length} ИЗ ${questions.length} ОТВЕТОВ`;
  show(result);
}

document.querySelector("#startBtn").addEventListener("click", startQuiz);
document.querySelector("#restartBtn").addEventListener("click", startQuiz);
document.querySelector("#quitBtn").addEventListener("click", () => show(intro));
answerButtons.forEach(button => button.addEventListener("click", () => chooseAnswer(button.dataset.answer)));
document.querySelector("#shareBtn").addEventListener("click", async () => {
  const shareText = `Мой результат теста на лидера: ${document.querySelector("#resultTitle").textContent} — ${document.querySelector("#scoreValue").textContent}. А ты лидер?`;
  try {
    if (navigator.share) await navigator.share({title: "Тест на лидера", text: shareText});
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      document.querySelector("#shareBtn").textContent = "Скопировано ✓";
    } else {
      window.prompt("Скопируй результат:", shareText);
    }
  } catch (error) {
    if (error.name !== "AbortError") window.prompt("Скопируй результат:", shareText);
  }
});