
const btnStartElement = document.getElementById("btn-start");
const btnTryElement = document.getElementById("btn-try");
const secElement = document.getElementById("sec");
const clockElement = document.getElementById('timer')
const cardNumbers = document.querySelectorAll('.card-numb');
const inputNumbers = document.querySelectorAll('.input-numb');
const result = document.getElementById('answer')
let randomNum;


btnStartElement.addEventListener('click', ()=>{
    randomNum = fiveRandomNumbers();
    result.innerText=''
    startGame(randomNum);
});

btnTryElement.addEventListener('click', ()=>{
    tryNum();
})

//-------------------------------
//     Function
//-------------------------------


function tryNum(){
    let arrayNumeriUguali = [];
    let arrNumSimili = [];

    console.log(randomNum);

    for(let i = 0; i<5; i++){

        if(inputNumbers[i].value == randomNum[i]){
            arrayNumeriUguali.push(inputNumbers[i].value);
            
        }else if(randomNum.includes(parseInt(inputNumbers[i].value))){
            arrNumSimili.push(inputNumbers[i].value);
            console.log(inputNumbers[i].value)
        }

    }

    
    if(arrayNumeriUguali.length > 0 && arrNumSimili.length > 0){
        answer.innerText = `Hai indovinato: ${arrayNumeriUguali},
        e hai quasi indovinato: ${arrNumSimili}`
    }else if (arrayNumeriUguali.length > 0 && arrNumSimili.length == 0){
        answer.innerText = `Hai indovinato: ${arrayNumeriUguali}`
    }else if(arrayNumeriUguali.length == 0 && arrNumSimili.length > 0){
        answer.innerText = `non hai indovinato nulla,
        ma hai quasi indovinato: ${arrNumSimili}`;
    }else{
        answer.innerText = `non hai indovinato nulla`;
    }

}

/**
 * Restituisce un numero random
 * @param {any} min
 * @param {any} max
 * @returns {any}
 */
function randomNumberGenerator (min, max){
    let random = Math.floor(Math.random() * (max - min + 1) + min);
    return random
};

/**
 * Restituisce un array di 5 numeri random diversi
 * @returns {any}
 */
function fiveRandomNumbers(){

    let arrRandomNumbers = [];
    let number;

    do{
        number = randomNumberGenerator(1,20);
        if(!arrRandomNumbers.includes(number)){
            arrRandomNumbers.push(number)
        }
    }while(arrRandomNumbers.length < 5);

    return arrRandomNumbers;

}

/**
 * inserisce gli elementi di un array di input come innerText di un array di elementi
 * @returns {any}
 */
function allocateMultipleinnerText (arrInput, arrEl){

    for(let i = 0; i < arrInput.length; i++){
        arrEl[i].innerText = arrInput[i]
    }

}

function startGame(arrInput){
    countDown(arrInput);

}

function countDown (arrInputCount){

    allocateMultipleinnerText(arrInputCount, cardNumbers);

    let q = 999;
    let countDownNumbers = setInterval(
        function(){

        btnTryElement.disabled = true;
        btnStartElement.disabled = true;
        btnTryElement.classList.add('disablebtn');
        btnStartElement.classList.add('disablebtn');

        q=q.toString();

        if(q<100){
            q = '0' + q
        }else if(q<10){
            q = '00' + q;
        }

        if(q<300){
            clockElement.classList.add('timeout')
        };


            secElement.innerText = q[0] + '.' +  q[1] + q[2];
            q--;
        }, 10);

    //countDownNumbers;

    let countDown = setTimeout(
        function(){

            for(let i = 0; i<5; i++){

                cardNumbers[i].innerText='';

                

               
            }
            clearInterval(countDownNumbers);
            secElement.innerText= '0.00';
            clockElement.classList.remove('timeout');
            q='';
            btnTryElement.disabled = false;
            btnStartElement.disabled = false;
            btnTryElement.classList.remove('disablebtn');
            btnStartElement.classList.remove('disablebtn');
        },
        10000
    )

    //countDown;   
    
}