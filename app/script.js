//selecting all required elements
const start_btn_home = document.querySelector(".start_btn");
const start_btn = document.querySelector(".start_btn #button_play");
const info_box = document.querySelector(".info_box");
const highscores = document.querySelector("#highscores");
const scoreTextPoint = document.getElementById("score");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const loader = document.getElementById("loader");
loader.classList.add("hidden");

// if startQuiz button clicked
start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); //show info box
};

// if exitQuiz button clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //hide info box
};

// if continueQuiz button clicked
continue_btn.onclick = () => {
  
  info_box.classList.remove("activeInfo"); //hide info box
  start_btn_home.classList.add("hidden");

  loader.classList.remove("hidden");
  const myTimeout = setTimeout(startQuiz, 3000);

  function startQuiz() {    
    loader.classList.add("hidden");
    start_btn_home.classList.remove("hidden");
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuestions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(30); //calling startTimer function
    startTimerLine(0);
  }
};

let timeValue = 30;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    window.location.reload();
};

// if quitQuiz button clicked
quit_quiz.onclick = () => {
  window.location.reload(); //reload the current window
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuestions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Tempo Restante"; //change the timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
  }
};

// Função para embaralhar as opções
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para exibir perguntas e opções
function showQuestions(index) {
    loader.classList.add("hidden");
    const que_text = document.querySelector(".que_text");
    const option_list = document.querySelector(".option_list"); // Certifique-se de ter este elemento no HTML

    // Obtendo a pergunta e opções
    let question = questions[index].question;
    let options = [...questions[index].options]; // Copiar o array de opções para não modificar o original
    let correctAnswer = questions[index].answer;

    // Embaralhar as opções
    options = shuffle(options);

    // Criando o HTML para a pergunta
    let que_tag = `<span>${questions[index].numb}. ${question}</span>`;

    // Criando o HTML para as opções
    let option_tag = options.map((option, i) => `
        <div class="option" data-answer="${option === correctAnswer ? 'true' : 'false'}">
            <p class="choice-prefix">${String.fromCharCode(65 + i)}</p>
            <p class="choice-text" data-number="${i + 1}">
                <span class="question">${option}</span>
            </p>
        </div>
    `).join('');

    // Atualizando o HTML com a pergunta e opções
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    // Definindo o atributo onclick para todas as opções
    const optionElements = option_list.querySelectorAll(".option");
    optionElements.forEach(option => {
        option.setAttribute("onclick", "optionSelected(this)");
    });
}


// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }
// // getting questions and options from array
// function showQuestions(index) {
//   loader.classList.add("hidden");
//   const que_text = document.querySelector(".que_text");
//   //creating a new span and div tag for question and option and passing the value using array index
//   let que_tag =
//     "<span>" +
//     questions[index].numb +
//     ". " +
//     questions[index].question +
//     "</span>";
//   let option_tag =
//     '<div class="option"><p class="choice-prefix">A</p><p class="choice-text" data-number="1"><span class="question">' +
//     questions[index].options[0] +
//     "</span></div>" +
//     '<div class="option"><p class="choice-prefix">B</p><p class="choice-text" data-number="2"><span class="question">' +
//     questions[index].options[1] +
//     "</span></p></div>" +
//     '<div class="option"><p class="choice-prefix">C</p><p class="choice-text" data-number="3"><span class="question">' +
//     questions[index].options[2] +
//     "</span></p></div>" +
//     '<div class="option"><p class="choice-prefix">D</p><p class="choice-text" data-number="4"><span class="question">' +
//     questions[index].options[3] +
//     "</span></p></div>";
//   que_text.innerHTML = que_tag; //adding new span tag inside que_tag
//   option_list.innerHTML = option_tag; //adding new div tag inside option_tag

//   const option = option_list.querySelectorAll(".option");

//   // set onclick attribute to all available options
//   for (i = 0; i < option.length; i++) {
//     option[i].setAttribute("onclick", "optionSelected(this)");
//   }
// }
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter); // Limpar o temporizador
    clearInterval(counterLine); // Limpar o temporizador da linha

    let userAns = answer.querySelector(".choice-text").textContent; // Obtendo a resposta selecionada
    let allOptions = option_list.children.length; // Número total de opções
    let isCorrect = answer.getAttribute("data-answer") === 'true'; // Verifica se a resposta está correta

    if (isCorrect) {
        // Se a resposta estiver correta
        userScore += 1; // Incrementa a pontuação
        scoreTextPoint.innerHTML = userScore * 10; // Atualiza a pontuação exibida
        answer.classList.add("correct"); // Adiciona classe de resposta correta
        answer.insertAdjacentHTML("beforeend", tickIconTag); // Adiciona ícone de tique
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        // Se a resposta estiver incorreta
        answer.classList.add("incorrect"); // Adiciona classe de resposta incorreta
        answer.insertAdjacentHTML("beforeend", crossIconTag); // Adiciona ícone de cruz
        console.log("Wrong Answer");

        // Destaca a resposta correta
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].getAttribute("data-answer") === 'true') {
                option_list.children[i].classList.add("correct"); // Adiciona classe de resposta correta
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adiciona ícone de tique
                console.log("Auto selected correct answer.");
            }
        }
    }

    // Desabilita todas as opções
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    // Exibe o botão para a próxima pergunta
    next_btn.classList.add("show");
}




// //if user clicked on option
// function optionSelected(answer) {
//   clearInterval(counter); //clear counter
//   clearInterval(counterLine); //clear counterLine
//   let userAns = answer.querySelector(".choice-text").textContent; //getting user selected option
//   let correcAns = questions[que_count].answer; //getting correct answer from array
//   const allOptions = option_list.children.length; //getting all option items
//   if (userAns == correcAns) {
//     //if user selected option is equal to array's correct answer
//     userScore += 1; //upgrading score value with 1
//     scoreTextPoint.innerHTML = userScore * 10;
//     answer.classList.add("correct"); //adding green color to correct selected option
//     answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
//     console.log("Correct Answer");
//     console.log("Your correct answers = " + userScore);
//   } else {
//     answer.classList.add("incorrect"); //adding red color to correct selected option
//     answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
//     console.log("Wrong Answer");

//     for (i = 0; i < allOptions; i++) {
//       if (option_list.children[i].textContent == correcAns) {
//         //if there is an option which is matched to an array answer
//         option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
//         option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
//         console.log("Auto selected correct answer.");
//       }
//     }
//   }
//   for (i = 0; i < allOptions; i++) {
//     option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
//   }
//   next_btn.classList.add("show"); //show the next button if user selected any option
// }

function showResult() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 3) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>E parabéns!! 🎉, você fez <p>" +
      userScore * 10 +
      "</p> de <p>" +
      questions.length * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 1) {
    // if user scored more than 1
    let scoreTag =
      "<span>E legal 😎, você fez  <p>" +
      userScore * 10 +
      "</p> de <p>" +
      questions.length * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>e desculpe 😐, Você fez apenas <p>" +
      userScore * 10 +
      "</p> de <p>" +
      questions.length * 10 +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; //changing the value of timeCount with time value
    time--; //decrement the time value
    if (time < 9) {
      //if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; //add a 0 before time value
    }
    if (time < 0) {
      //if timer is less than 0
      clearInterval(counter); //clear counter
      timeText.textContent = "Intervalo"; //change the time text to time off
      const allOptions = option_list.children.length; //getting all option items
      let correcAns = questions[que_count].answer; //getting correct answer from array
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          //if there is an option which is matched to an array answer
          option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
      }
      next_btn.classList.add("show"); //show the next button if user selected any option
    }
  }
}

function startTimerLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 549) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> de <p>" +
    questions.length +
    "</p> Questões</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}
