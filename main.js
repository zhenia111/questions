'use strict';

const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
		id: 1
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
		id: 2
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
		id: 3
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
		id: 4
	},
];
const blockWrapperQuiz = document.querySelector('.quiz');
const body = document.body;
const res = {
	success: 0,
	wrong: 0
}

window.location.href = "http://127.0.0.1:5500/index.html#1";
renderQuestionsHTML([questions[0]]);
checkAnswer();

window.addEventListener('hashchange', () => {
	let [baseUrl, idHref] = window.location.href.split('#');
	let elem = questions.find(item => item.id == idHref);
	if (!elem) {
		showNotFound();
	} else {
		renderQuestionsHTML([elem]);
		checkAnswer();
	}
})

function renderQuestionsHTML(data) {
	let arrQuestionsHTML =[];
	data.forEach((elem,i) => {
		let answersOneQuestion = '';
		elem.answers.forEach((answer, i) => {
			answersOneQuestion += `
			<li>
 				<label>
 					<input data-id=${i} type="radio" class="answer" name="answer" />
 					<span>${answer}</span>
				</label>
 			</li>
			`;
		});
		arrQuestionsHTML.push(`
		<div class="quiz" id="quiz">
		<div class="quiz-header" id="header">
			<!-- Заголовок вопроса -->
			<h2 class="title">${elem.question}</h2>
			<h3 class="summary">Вопрос №${i+1}</h3>
			<p class="result">успех ${res.success}/${res.wrong} ошибка</p>
		</div>
		<ul class="quiz-list" id="list">
			${answersOneQuestion}
		</ul>
		<button class="quiz-submit submit" id="submit">Ответить</button>
		</div>
		`);  
	});
	body.innerHTML = arrQuestionsHTML.join('');
}

function checkAnswer() {
	let quizBtn = document.querySelector('.quiz-submit');
		quizBtn.addEventListener('click', () => {

			let arrOfUrl = window.location.href.split('#');
			let idHref = arrOfUrl[1];
			let elem = questions.find(item => item.id == idHref);
			let answers = document.querySelectorAll('.answer');
			let counter =0;
			answers.forEach(answer=>{
				if(!answer.checked){
					counter+=1;
				}
			})
			if(counter == answers.length){
				alert('Выберете вариант ответа');
				return;
			}
			answers.forEach(answer => {
				if (answer.checked) {
					let chosenAnswer = answer.nextElementSibling.innerHTML;
					elem.answers[+elem.correct - 1] == chosenAnswer ? res.success += 1 : res.wrong +=1;
					console.log(res);
					if (idHref < questions.length) {
						idHref = +idHref + 1;
						window.location.href = `http://127.0.0.1:5500/index.html#${idHref}`;
					} else {
						alert(`правильных ответов: ${res.success}, неправильных ответов:${res.wrong}`);
					}
				} 
			})
			renderQuestionsHTML([elem]);
		});
}

function showNotFound() {

	// const div = document.createElement('div');

	// div.classList.add('notfound');

	// let pageNotFound =`
	// <h1 class="notfound__text">404</h1>
	// <div class="notfound__inner">
	// 	<h4 class="notfound__sbcr">Такой страницы нет</h4>
	// </div>
	// `;
	// div.innerHTML = pageNotFound;
	// document.body.prepend(div);

	document.body.innerHTML = `
	<div class="notfound">
		<h1 class="notfound__text">404</h1>
		<div class="notfound__inner">
			<h4 class="notfound__sbcr">Такой страницы нет</h4>
		</div>
	</div>
	`;
}