const listRandomNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
const listRandomNumberMultiplier = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

const listRandomNumberHard = ["12", "21", "13", "2.4", "1.5", "6", "3", "2", "9", "10"]
const listRandomNumberMultiplierHard = ["13", "2", "33", "4.5", "5", "62", "72", "11", "9", "1.3"]

const bntMultiplierHard = document.querySelector('#mainContainer__btnHard')
const circularProgress = document.querySelector('.circular-progress')
const progressValueNumber = document.querySelector('.progress-value')
const hitCountText = document.querySelector('.section-score__hits__nubem')
const errorCountText = document.querySelector('.section-score__err__nubem')
const emojiHard = document.querySelector('.hard-emoji')

// Sorteador dos números
let randomNumber = Math.floor(Math.random() * 10)
let randomNumberMultiplier = Math.floor(Math.random() * 10)
// Números dinâmicos
const dynamicNumber = document.querySelector('.mainContainer__dynamicNumber')
const dynamicNumberSecond = document.querySelector('.mainContainer__dynamicNumberSecond')

const showNumbers = () => {
	dynamicNumber.textContent = listRandomNumber[randomNumber]
	dynamicNumberSecond.textContent = listRandomNumberMultiplier[randomNumberMultiplier]
}

const showNumbersHard = () => {
	dynamicNumber.textContent = listRandomNumberHard[randomNumber]
	dynamicNumberSecond.textContent = listRandomNumberMultiplierHard[randomNumberMultiplier]
}


showNumbers()

if (localStorage.checkBtn) {
	showNumbersHard()
	console.log(`${listRandomNumberHard[randomNumber]} X ${listRandomNumberMultiplierHard[randomNumberMultiplier]} = ${listRandomNumberHard[randomNumber] * listRandomNumberMultiplierHard[randomNumberMultiplier]}`)
	emojiHard.classList.toggle('hardVisible')
}

const inputResponse = document.querySelector('.mainContainer__inputResponse')
const submitResponse = document.querySelector('.mainContainer__submitResponse')

const checkButton = () => {

	if (localStorage.checkBtn) {
		localStorage.removeItem("checkBtn")
	}else {
		localStorage.setItem("checkBtn", "checado")		
	}
	if (localStorage.checkBtn) {
		console.log('está checado')
	}
	location.reload()
}


bntMultiplierHard.addEventListener('click', checkButton)

let progressStartValue = 0
let hitCounter = 0
let errorCount = 0


const progressFunction = () => {
	progressStartValue = progressStartValue + 10
	progressEndValue = 100

		circularProgress.style.background = `conic-gradient(#00caec ${progressStartValue * 3.6}deg, #ededed 0deg)`
		if (progressStartValue >= progressEndValue) {
			let progressValueNumberInt = progressValueNumber.textContent
			progressValueNumber.textContent = parseInt(progressValueNumberInt) + 1
			progressStartValue = 0
			circularProgress.style.background = `conic-gradient(#00caec ${progressStartValue * 3.6}deg, #ededed 0deg)`
		}
}

const hitCounterAdd = () => {
	hitCounter++
	hitCountText.textContent = hitCounter

}

const errorCounterAdd = () => {
	errorCount++
	errorCountText.textContent = errorCount
}

const saveScore = () => {
	localStorage.setItem("hitScore", hitCounter)
	localStorage.setItem("errorScore", errorCount)
}

if (localStorage.hitScore && localStorage.errorScore) {
	hitCountText.textContent = localStorage.hitScore
	errorCountText.textContent = localStorage.errorScore
}

const submit = () => {
	if (bntMultiplierHard.checked || localStorage.checkBtn) {
		if (inputResponse.value == listRandomNumberHard[randomNumber] * listRandomNumberMultiplierHard[randomNumberMultiplier]) {
			randomNumber = Math.floor(Math.random() * 10)
			randomNumberMultiplier = Math.floor(Math.random() * 10)

			showNumbersHard()
			progressFunction()
			hitCounterAdd()
			saveScore()
		}else {
			errorCounterAdd()
			saveScore()
		}

		inputResponse.value = ''

		console.log(`Próxima, ${listRandomNumberHard[randomNumber]} X ${listRandomNumberMultiplierHard[randomNumberMultiplier]} = ${listRandomNumberHard[randomNumber] * listRandomNumberMultiplierHard[randomNumberMultiplier]}`)

		return listRandomNumberHard[randomNumber] * listRandomNumberMultiplierHard[randomNumberMultiplier]
	}


	if (inputResponse.value == listRandomNumber[randomNumber] * listRandomNumberMultiplier[randomNumberMultiplier]) {

		console.log(`A resposta está correta, ${listRandomNumber[randomNumber]} X ${listRandomNumberMultiplier[randomNumberMultiplier]} é: ${inputResponse.value}`)

		randomNumber = Math.floor(Math.random() * 10)
		randomNumberMultiplier = Math.floor(Math.random() * 10)

		showNumbers()
		progressFunction()


		inputResponse.value = ''

		hitCounterAdd()
		saveScore()

		console.log(`Próxima, ${listRandomNumber[randomNumber]} X ${listRandomNumberMultiplier[randomNumberMultiplier]}`)

	}
	else {
		console.log('resposta errada')
		errorCounterAdd()
		saveScore()
	}
}


console.log(`${listRandomNumber[randomNumber]} X ${listRandomNumberMultiplier[randomNumberMultiplier]} = ${listRandomNumber[randomNumber] * listRandomNumberMultiplier[randomNumberMultiplier]}`) 

const submitResponseKeyEnter = (e) => {
    const tecla = e.key
    if (tecla === 'Enter') {
        submit()
    }

}
submitResponse.addEventListener('click', submit)
document.addEventListener('keypress', submitResponseKeyEnter)