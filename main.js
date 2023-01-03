const range = document.querySelectorAll(".slider input");
const progress = document.querySelector(".slider__progress");
const inputValue = document.querySelectorAll(".number");
const form = document.querySelector(".form");

const data = {
  min: 0,
  max: 10000,
  gap: 1000,
};

inputValue[0].min = data.min;
inputValue[1].min = data.min;
inputValue[1].max = data.max;
inputValue[0].max = data.max;
range[0].min = data.min;
range[0].max = data.max;
range[1].min = data.min;
range[1].max = data.max;
let gap = data.gap;

function changeSliderByNumber() {
  if (inputValue[1].value - inputValue[0].value < gap){
    inputValue[0].value = inputValue[1].value - gap;
  }
  range[0].value = inputValue[0].value;
  range[1].value = inputValue[1].value;
  progress.style.left = (range[0].value / range[0].max) * 100 + "%";
  progress.style.right = 100 - (range[1].value / range[1].max) * 100 + "%";
  sendData(inputValue[1].value, inputValue[0].value);
}

function sendData(max, min) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      max: max,
      min: min,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

function changeSliderByRange(e) {
  let min = parseInt(range[0].value);
  let max = parseInt(range[1].value);
  if (max - min < gap) {
    if (e.target.className === "slider__min") {
      range[0].value = max - gap;
    } else {
      range[1].value = min + gap;
    }
  } else {
    progress.style.left = (min / range[0].max) * 100 + "%";
    progress.style.right = 100 - (max / range[1].max) * 100 + "%";
    inputValue[0].value = min;
    inputValue[1].value = max;
  }
}

changeSliderByNumber();

inputValue.forEach((num) => {
  num.addEventListener("change", () => changeSlider2());
});

range.forEach((inp) => {
  inp.addEventListener("input", (e) => changeSliderByRange(e));
  inp.addEventListener("change", () =>
    sendData(inputValue[1].value, inputValue[0].value)
  );
});
