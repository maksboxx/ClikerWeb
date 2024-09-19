let coinsScoreBlock = document.getElementById('scoreCoin')
let coinPerTapBlock = document.getElementById('coinPerTap')
let coinPerSecBlock=document.getElementById('coinPerSec')

let coin= document.getElementById('coin')
const reset=document.getElementById('reset')

let cursorUButton = document.getElementById('cursorU')
let shovelUButton = document.getElementById('shovelU')
let computerUBlock=document.getElementById('computerU')



let user=JSON.parse(localStorage.getItem('userInfo'))
let upgrades=JSON.parse(localStorage.getItem('upgrades'))

//Резерв монеток,прибыли за клик и прибыль в секунду.Что-то типа сейва.

function updProgress() {
    if (localStorage.getItem('userInfo') !== null) {
        // Ключ существует
        coinsScoreBlock.innerText=user.coinsScore
        coinPerTapBlock.innerText=user.coinPerTap
        coinPerSecBlock.innerText=user.coinPerSec
    } else {
        // Ключ не существует
        let userInfo={
            coinsScore:499,
            coinPerTap:1,
            coinPerSec:0
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        location.reload();
    }
}

//-------------- Сейв апгрейдов -------------------------

function updUpgrades() {
    if (localStorage.getItem('upgrades') !== null) {
        // Ключ существует
        cursorUButton.innerText=upgrades[0].costUpgrade
        shovelUButton.innerText=upgrades[1].costUpgrade
    } else {
        let upgradeList=[
            {
                lvlUpg:0,
                nameUpgrade:'Cursorio',
                costUpgrade:50,
                coinPerTapAdd:1,
                coinPerSecAdd:0,
                coefficient:1.15,
            },
            {
                lvlUpg:0,
                nameUpgrade:'Shovel',
                costUpgrade:500,
                coinPerTapAdd:5,
                coinPerSecAdd:2,
                coefficient:1.20,

            },
            {
                lvlUpg:0,
                nameUpgrade:'Computer',
                costUpgrade:1000,
                coinPerTapAdd:0,
                coinPerSecAdd:2,
                coefficient:1.25,
            },
            {
                lvlUpg:0,
                nameUpgrade:'Phone',
                costUpgrade:5000,
                coinPerTapAdd:0,
                coinPerSecAdd:5,
                coefficient:1.30,
            },
            {
                lvlUpg:0,
                nameUpgrade:'Apple',
                costUpgrade:10000,
                coinPerTapAdd:2,
                coinPerSecAdd:5,
                coefficient:1.35,
            },
    ]
        localStorage.setItem('upgrades',JSON.stringify(upgradeList))
    }
}

// Кнопка ресета

reset.onclick=function (){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('upgrades');
    location.reload();
}
// Восстанавливаем прогрес или создаем подложку под нового юзера
updProgress()
updUpgrades()

// Тап по монете

coin.onclick=function (){
    user.coinsScore+=user.coinPerTap
    coinsScoreBlock.innerText=user.coinsScore
    localStorage.setItem('userInfo',JSON.stringify(user))
}
// Функция для обновления всех значений
function upgradeParams() {
    coinsScoreBlock.innerText=user.coinsScore
    coinPerTapBlock.innerText=user.coinPerTap
    coinPerSecBlock.innerText=user.coinPerSec
}
// Функция для записи всех данных в LocalStorage.
function saveToLocalStorage(){
    localStorage.setItem('userInfo',JSON.stringify(user))
    localStorage.setItem('upgrades',JSON.stringify(upgrades))
}

// 1й апдейт - курсор
cursorUButton.onclick=function(){
    if (user.coinsScore>=upgrades[0].costUpgrade){
        user.coinsScore=user.coinsScore-upgrades[0].costUpgrade // отнимаем монеты за улучшение
        user.coinPerTap=user.coinPerTap+upgrades[0].coinPerTapAdd // добавляем монет за тап
        user.coinPerSec=user.coinPerSec+upgrades[0].coinPerSecAdd
        upgrades[0].costUpgrade = Math.ceil(upgrades[0].costUpgrade * upgrades[0].coefficient);// увеличиваем сумму за улучшение
        cursorUButton.innerText=upgrades[0].costUpgrade
        upgradeParams()
        saveToLocalStorage()

    }
    else alert('Not Enough Money')
}

// 2й апдейт - лопата
shovelUButton.onclick=function () {
    if (user.coinsScore>=upgrades[1].costUpgrade){
        user.coinsScore=user.coinsScore-upgrades[1].costUpgrade
        user.coinPerTap=user.coinPerTap+upgrades[1].coinPerTapAdd
        user.coinPerSec=user.coinPerSec+upgrades[1].coinPerSecAdd
        upgrades[1].costUpgrade = Math.ceil(upgrades[1].costUpgrade * upgrades[1].coefficient);
        shovelUButton.innerText=upgrades[1].costUpgrade
        upgradeParams()
        saveToLocalStorage()
    }
    else alert('Not Enough Money')
}
computerUBlock.onclick=function (){
    if (user.coinsScore>=upgrades[2].costUpgrade){
        user.coinsScore=user.coinsScore-upgrades[2].costUpgrade
        user.coinPerTap=user.coinPerTap+upgrades[2].coinPerTapAdd
        user.coinPerSec=user.coinPerSec+upgrades[2].coinPerSecAdd
        upgrades[2].costUpgrade = Math.ceil(upgrades[2].costUpgrade * upgrades[2].coefficient);
        computerUBlock.innerText=upgrades[2].costUpgrade
        upgradeParams()
        saveToLocalStorage()

    }
    else alert('Not Enough Money')
}

// Функция для монет в секунду
function addCoinsPerSec() {
    user.coinsScore+=user.coinPerSec
    coinsScoreBlock.innerText = user.coinsScore;
    localStorage.setItem('userInfo',JSON.stringify(user))
}
setInterval(addCoinsPerSec, 1000);

