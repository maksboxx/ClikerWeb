let coinsScoreBlock = document.getElementById('scoreCoin')
let coinPerTapBlock = document.getElementById('coinPerTap')
let coinPerSecBlock=document.getElementById('coinPerSec')

let coin= document.getElementById('coin')
const reset=document.getElementById('reset')

let cursorUButton = document.getElementById('cursorU')
let shovelUButton = document.getElementById('shovelU')
let computerUButton=document.getElementById('computerU')
let phoneUButton=document.getElementById('phoneU')
let appleUButton=document.getElementById('appleU')



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
        computerUButton.innerText=upgrades[2].costUpgrade
        phoneUButton.innerText=upgrades[3].costUpgrade
        appleUButton.innerText=upgrades[4].costUpgrade
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
function buyUpgrades(i){
    if (user.coinsScore>=upgrades[i].costUpgrade){
        user.coinsScore=user.coinsScore-upgrades[i].costUpgrade // отнимаем монеты за улучшение
        user.coinPerTap=user.coinPerTap+upgrades[i].coinPerTapAdd // добавляем монет за тап
        user.coinPerSec=user.coinPerSec+upgrades[i].coinPerSecAdd
        upgrades[i].costUpgrade = Math.ceil(upgrades[i].costUpgrade * upgrades[i].coefficient);// увеличиваем сумму за улучшение
        cursorUButton.innerText=upgrades[i].costUpgrade
        upgrades[i].lvlUpg++
        upgradeParams()
        saveToLocalStorage()
    }
    else alert('Not Enough Money')
}
// 1й апдейт - курсор
cursorUButton.onclick=function(){
    buyUpgrades(0)
}
// 2й апдейт - лопата
shovelUButton.onclick=function () {
    buyUpgrades(1)
}
// 3й апдейт - компьютер
computerUButton.onclick=function (){
    buyUpgrades(2)
}
phoneUButton.onclick=function (){
    buyUpgrades(3)
}
appleUButton.onclick=function (){
    buyUpgrades(4)
}


// Функция для монет в секунду
function addCoinsPerSec() {
    user.coinsScore+=user.coinPerSec
    coinsScoreBlock.innerText = user.coinsScore;
    localStorage.setItem('userInfo',JSON.stringify(user))
}
setInterval(addCoinsPerSec, 1000);

