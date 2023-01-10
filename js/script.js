// Obtener todos los elementos
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

// Si das clic en Test (Botón principal)
start_btn.onclick = () => {
  // Ocultar el botón principal
  start_btn.classList.add("inactive");
  // Mostrar info
  info_box.classList.add("activeInfo"); // Mostar la info box
};

// Si das clic en Salir
exit_btn.onclick = () => {
  // Mostrar el botón principal
  start_btn.classList.remove("inactive");
  // Ocultar info
  info_box.classList.remove("activeInfo"); // Ocultar la info box
};

// Si das clic en Continuar
continue_btn.onclick = () => {
  // Ocultar info
  info_box.classList.remove("activeInfo");
  // Mostrar el formulario
  quiz_box.classList.add("activeQuiz");
  // Mandar a llamar las preguntas y empezar a contar las preguntas
  cont1 = 0; // Si
  cont2 = 0; // No
  que_cont = 0; // Total de preguntas
  showQuestions(0);
  queCounter(0);
  // Desactivar el siguiente hasta tener una respuesta
  next_btn.classList.add("disable");
};

let cont1 = 0; // Si
let cont2 = 0; // No
let que_cont = 0; // Total de preguntas
let statusP = 0; // El status de la pregunta actual (Si 1 /No 2)
let text;

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = () => {
  // Desactivar el siguiente hasta tener una respuesta
  next_btn.classList.add("disable");
  // Retirar el estado de checked de las opciones
  option_list.children[0].classList.remove("checked");
  option_list.children[1].classList.remove("checked");

  // Sumar los valores de preguntas
  if (statusP == 1) {
    cont1 += questions[que_cont].value;
  } else {
    cont2 += questions[que_cont].value;
  }

  // Sección para evaluar
  if (que_cont == 7) {
    if (cont1 < cont2) {
      text = `
                    <br>
                    <div>No se muestran razgos de autismo en tus resultados</div>
                    <div>Te recomendamos igualmente consultar con un especialista para descartarlo al 100%</div>
                    `;
      showResult(text);
    }
  }
  if (que_cont == 12) {
    if (cont1 < cont2) {
      text = `
                <br>
                    <div>De acuerdo con las respuestas obtenidas el niño/adolescente prestenta:</div>
                    <div>Transtorno del espectro autista de nivel <b>LEVE</b></div><br>
                    <div><b>Recomendaciones:</b></div><br>
                    <div>Te recomendamos hacer un diagnostico a profundidad, ya que al presentar un nivel de autismo leve pueden pasar desapercibidos varios rasgos
                    que definan si el niño/adolescente se encuentra dentro del espectro autista, como lo es el Asperger.</div>
                    `;
      showResult(text);
    }
  }

  // Aumentar las preguntas para irlas mostrando
  if (que_cont < questions.length - 1) {
    que_cont++;
    showQuestions(que_cont);
    queCounter(que_cont);
  } else {
    if (cont1 < cont2) {
      text = `
                <br>
                    <div>De acuerdo con las respuestas obtenidas el niño/adolescente prestenta:</div>
                    <div>Transtorno del espectro autista de nivel <b>MODERADO</b></div><br>
                    <div><b>Recomendaciones:</b></div><br>
                    <div>- Consultar lo más pronto posible con un especialista.</div>
                    <div>- Intervención Psicologica para tratar las emociones y sentimientos asociados.</div>
                    <div>- Sesiones de juego y actuaciones en las que el niño/adolescente participe activamente.</div>
                    <div>- Terapias conductuales.</div>
                    <div>- Los juegos educativos pueden mejorar el dia de los niños/adolescentes autistas.</div>
                    `;
    } else {
      text = `
                <br>
                    <div>De acuerdo con las respuestas obtenidas el niño/adolescente prestenta:</div>
                    <div>Transtorno del espectro autista de nivel <b>ALTO</b></div><br>
                    <div><b>Recomendaciones:</b></div><br>
                    <div>- Consultar lo más pronto posible con un especialista.</div>
                    <div>- Intervención Psicologica para tratar las emociones y sentimientos asociados.</div>
                    <div>- Sesiones de juego y actuaciones en las que el niño/adolescente participe activamente.</div>
                    <div>- Comunicacion verbal y contacto visual.</div>
                    <div>- Terapias del habla y lenguaje</div>
                    <div>- Terapias conductuales.</div>
                    <div>- Los juegos educativos pueden mejorar el dia de los niños/adolescentes autistas.</div>
                    `;
    }
    showResult(text);
  }
};

// Obtener las preguntas
const showQuestions = (index) => {
  const que_Text = document.querySelector(".que_text");
  let que_Tag = "<span>" + questions[index].question + "</span>";
  que_Text.innerHTML = que_Tag;
  const option = option_list.querySelectorAll(".option");

  // Mandar la opción escogida
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};

const optionSelected = (answer) => {
  // Activar el siguiente hasta tener una respuesta
  next_btn.classList.remove("disable");
  // Si la opción es la primera (Si) entonces marcar la segunda
  if (option_list.children[0] == answer) {
    option_list.children[0].classList.add("checked");
    option_list.children[1].classList.remove("checked");
  } else {
    option_list.children[1].classList.add("checked");
    option_list.children[0].classList.remove("checked");
  }

  let userAns = answer.textContent;

  // Establecer el status
  if (userAns == "Si") {
    statusP = 1;
  } else {
    statusP = 0;
  }
};

const showResult = (text) => {
  info_box.classList.remove("activeInfo"); // Ocultar info
  quiz_box.classList.remove("activeQuiz"); // Ocultar formulario
  result_box.classList.add("activeResult"); // Mostrar resultados
  const scoreText = result_box.querySelector(".text");

  let scoreTag = text;
  scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
};

const queCounter = (index) => {
  // Se muestra el número de preguntas
  let totalQueCounTag = "<span>Pregunta <p>" + (index + 1) + "</p></span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; // Actualizando
};

const quit_quiz = result_box.querySelector(".buttons .quit");
quit_quiz.onclick = () => {
  // window.location.reload(); // Cargar de nuevo la página
  window.location.href = "index.html"; // Mandar a index
};
