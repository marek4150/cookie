let cookies = 0;
let cps = 0; 
const shop = {
    grandma: {
        count: 0,
        cost: 15,
        baseCps: 1
    },
    factory: {
        count: 0,
        cost: 100,
        baseCps: 10
    }
};

let goldenCookieCost = 500;

const cookieCountEl = document.getElementById('cookie-count');
const cpsCountEl = document.getElementById('cps-count');
const notificationEl = document.getElementById('notification');

document.getElementById('main-cookie').addEventListener('click', () => {
    cookies++;
    updateUI();
});

function buyItem(itemType) {
    let item = shop[itemType];
    if (cookies >= item.cost) {
        cookies -= item.cost;
        item.count++;
        
        item.cost = Math.ceil(item.cost * 1.15);
        
        recalculateCPS();
        updateUI();
    }
}

function buyGoldenCookie() {
    if (cookies >= goldenCookieCost) {
        cookies -= goldenCookieCost;
        
        goldenCookieCost = Math.ceil(goldenCookieCost * 1.20);
        
        let chance = Math.random();
        if (chance <= 0.05) {
            let bonus = Math.floor(cookies * 5); 
            cookies += bonus;
            showNotification(`Zlatá sušenka ti přidala ${bonus} sušenek!`);
        } else {
            showNotification(`Zlatá sušenka nepřinesla žádný bonus.`);
        }
        
        updateUI();
    }
}

function recalculateCPS() {
    cps = (shop.grandma.count * shop.grandma.baseCps) + 
          (shop.factory.count * shop.factory.baseCps);
}

function updateUI() {
    cookieCountEl.innerText = Math.floor(cookies);
    cpsCountEl.innerText = cps;

    document.getElementById('cost-grandma').innerText = shop.grandma.cost;
    document.getElementById('count-grandma').innerText = shop.grandma.count;
    document.getElementById('btn-grandma').disabled = cookies < shop.grandma.cost;

    document.getElementById('cost-factory').innerText = shop.factory.cost;
    document.getElementById('count-factory').innerText = shop.factory.count;
    document.getElementById('btn-factory').disabled = cookies < shop.factory.cost;

    document.getElementById('cost-golden').innerText = goldenCookieCost;
    document.getElementById('btn-golden').disabled = cookies < goldenCookieCost;
}

let notificationTimeout;
function showNotification(msg) {
    notificationEl.innerText = msg;
    clearTimeout(notificationTimeout);
    notificationTimeout = setTimeout(() => {
        notificationEl.innerText = "";
    }, 4000);
}

setInterval(() => {
    if (cps > 0) {
        cookies += cps / 10;
        updateUI();
    }
}, 100);

updateUI();