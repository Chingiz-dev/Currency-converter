const leftFunction = (data) => {
  //     console.log(data);
  //     console.log(base);
  //     console.log(myrates);
  //     console.log(rateName);
  //     console.log(rateValue);
  let base = data.base;
  let myrates = data.rates;
  let rateName = Object.keys(myrates)[0];
  let rateValue = Object.values(myrates)[0];
  rateLeft = rateValue;
  changeOutputTextRight();
  currencyForOneLeft.innerHTML = `1 ${base} = ${rateValue} ${rateName}`;
};

const rightFunction = (data) => {
  let base = data.base;
  let myrates = data.rates;
  let rateName = Object.keys(myrates)[0];
  let rateValue = Object.values(myrates)[0];
  rateRight = rateValue;
  changeOutputTextLeft();
  currencyForOneRight.innerHTML = `1 ${base} = ${rateValue} ${rateName}`;
};

const startLeftFetch = (base, symbols) => {
  let query = `https://api.ratesapi.io/api/latest?base=${base}&symbols=${symbols}`;
  fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      leftFunction(data);
    })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      dimmer.style.display = "none";
    });
};

const startRightFetch = (base, symbols) => {
  let query = `https://api.ratesapi.io/api/latest?base=${base}&symbols=${symbols}`;
  fetch(query)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      rightFunction(data);
    })
    .catch((error) => {
      alert(error);
    });
};

const setCurrencies = (curLeft, curRight) => {
  if (curLeft === curRight) {
    rateLeft = 1;
    rateRight = 1;
    changeOutputTextRight();
    changeOutputTextLeft();
    currencyForOneLeft.innerHTML = `1${curLeft} = 1${curRight}`;
    currencyForOneRight.innerHTML = `1${curRight} = 1${curLeft}`;
  } else {
    dimmer.style.display = "block";
    startLeftFetch(curLeft, curRight);
    startRightFetch(curRight, curLeft);
  }
};

const changeLeftCurrency = (e) => {
  leftSelect.classList.remove("selected");
  currentLeftCurrencyName = e.target.value;
  setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
};

const changeRightCurrency = (e) => {
  rightSelect.classList.remove("selected");
  currentRightCurrencyName = e.target.value;
  setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
};

const setLeftCurrency = (e) => {
  //    console.log(e.target.value);
  leftCurrencies.forEach((item) => {
    item.checked = false;
  });
  leftSelect.classList.add("selected");
  currentLeftCurrencyName = e.target.value;
  setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
};

const setRightCurrency = (e) => {
  rightCurrencies.forEach((item) => {
    item.checked = false;
  });
  rightSelect.classList.add("selected");
  currentRightCurrencyName = e.target.value;
  setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
};

const showRightAmount = () => {
  amountInputRight.style.display = "none";
  rightResult.style.display = "block";
  changeOutputTextRight();
};

const showLeftAmount = () => {
  amountInputLeft.style.display = "none";
  leftResult.style.display = "block";
  changeOutputTextLeft();
};

const swapSides = () => {
  let localLeftRateName = currentLeftCurrencyName;
  //let localRightRateName = currentRightCurrencyName;
  currentLeftCurrencyName = currentRightCurrencyName;
  currentRightCurrencyName = localLeftRateName;

  let localLeftRateValue = rateLeft;
  //let localRightRateValue = rateRight;
  rateLeft = rateRight;
  rateRight = localLeftRateValue;

  // let localLeftAmount = amountInputLeft.value;
  // let localRightAmount = amountInputRight.value;

  amountInputLeft.value = rightResult.innerText;
  amountInputRight.value = leftResult.innerText;

  leftSelect.classList.add("selected");
  leftSelect.value = currentLeftCurrencyName;
  leftCurrencies.forEach((item) => {
    if (item.value == currentLeftCurrencyName) {
      item.checked = true;
      leftSelect.classList.remove("selected");
      leftSelect.value = "CNY";
    } else {
      item.checked = false;
    }
  });

  rightSelect.classList.add("selected");
  rightSelect.value = currentRightCurrencyName;
  rightCurrencies.forEach((item) => {
    if (item.value == currentRightCurrencyName) {
      item.checked = true;
      rightSelect.classList.remove("selected");
      rightSelect.value = "CNY";
    } else {
      item.checked = false;
    }
  });

  setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
  if (rightResult.style.display === "block") {
    showLeftInput();
    showRightAmount();
    //  console.log("rightResult.style.display === 'block'");
  } else {
    showRightInput();
    showLeftAmount();
    // console.log("rightResult.style.display === 'none'");
  }
};

const showLeftInput = () => {
  //amountInputLeft.value = '';
  amountInputLeft.style.display = "block";
  leftResult.style.display = "none";
};

const showRightInput = () => {
  //amountInputRight.value = '';
  amountInputRight.style.display = "block";
  rightResult.style.display = "none";
};

const changeOutputTextRight = () => {
  rightResult.innerText = (amountInputLeft.value * rateLeft).toFixed(4);
};
const changeOutputTextLeft = () => {
  leftResult.innerText = (amountInputRight.value * rateRight).toFixed(4);
};

const leftResult = document.querySelector(".left-result");
const rightResult = document.querySelector(".right-result");
const dimmer = document.querySelector(".dimmer");
const changer = document.querySelector(".arrows");
const currencyForOneLeft = document.getElementById(
  "currency-for-one-left-HTML"
);
const currencyForOneRight = document.getElementById(
  "currency-for-one-right-HTML"
);

const amountInputLeft = document.getElementById("amount-input-left");
const amountInputRight = document.getElementById("amount-input-right");

const leftCurrencies = document.getElementsByName("left-currencies");
const rightCurrencies = document.getElementsByName("right-currencies");

const leftSelect = document.querySelector(".left-currency-select");
const rightSelect = document.querySelector(".right-currency-select");

leftSelect.addEventListener("change", setLeftCurrency);
rightSelect.addEventListener("change", setRightCurrency);

for (let i = 0; i < leftCurrencies.length; i++) {
  leftCurrencies[i].onclick = changeLeftCurrency;
}
for (let i = 0; i < rightCurrencies.length; i++) {
  rightCurrencies[i].onclick = changeRightCurrency;
}

let currentLeftCurrencyName = "RUB";
let currentRightCurrencyName = "USD";
let rateLeft;
let rateRight;
amountInputLeft.value = 1;
amountInputRight.value = 1;
setCurrencies(currentLeftCurrencyName, currentRightCurrencyName);
showLeftAmount();

amountInputLeft.onkeyup = showRightAmount;
amountInputRight.onkeyup = showLeftAmount;
rightResult.onclick = showRightInput;
leftResult.onclick = showLeftInput;
changer.onclick = swapSides;
