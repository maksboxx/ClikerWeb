let coinsScoreBlock = document.getElementById('scoreCoin')
let coinPerTapBlock = document.getElementById('coinPerTap')
let coinPerSecBlock=document.getElementById('coinPerSec')
let coin= document.getElementById('coin')
const reset=document.getElementById('reset')
let cursorUButton = document.getElementById('cursorU')
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
            coinsScore:0,
            coinPerTap:1,
            coinPerSec:1
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        location.reload();
    }
}
function updUpgrades() {
    if (localStorage.getItem('upgrades') !== null) {
        // Ключ существует
        cursorUButton.innerText=upgrades[0].costUpgrade
    } else {
        let upgradeList=[
            {
                lvlUpg:0,
                nameUpgrade:'Cursorio',
                costUpgrade:100,
                coinPerTapAdd:1,
            },
    ]
        localStorage.setItem('upgrades',JSON.stringify(upgradeList))
    }
}
reset.onclick=function (){
    localStorage.removeItem('userInfo');
    localStorage.removeItem('upgrades');
    location.reload();
}

updProgress()
updUpgrades()
coin.onclick=function (){
    user.coinsScore+=user.coinPerTap
    coinsScoreBlock.innerText=user.coinsScore
    localStorage.setItem('userInfo',JSON.stringify(user))
}

cursorUButton.onclick=function(){
    if (user.coinsScore>=upgrades[0].costUpgrade){
        user.coinsScore=user.coinsScore-upgrades[0].costUpgrade
        coinsScoreBlock.innerText=user.coinsScore
        user.coinPerTap=user.coinPerTap+upgrades[0].coinPerTapAdd // добавляем монет за тап
        upgrades[0].costUpgrade = Math.ceil(upgrades[0].costUpgrade * 1.50);// увеличиваем сумму за улучшение
         cursorUButton.innerText=upgrades[0].costUpgrade
         coinPerTapBlock.innerText=user.coinPerTap
        localStorage.setItem('userInfo',JSON.stringify(user))
        localStorage.setItem('upgrades',JSON.stringify(upgrades))
    }
    else alert('Not Enough Money')
}
function addCoinsPerSec() {
    user.coinsScore+=user.coinPerSec
    coinsScoreBlock.innerText = user.coinsScore;
    localStorage.setItem('userInfo',JSON.stringify(user))
}
setInterval(addCoinsPerSec, 1000);

