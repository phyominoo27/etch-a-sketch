const grid = document.querySelector(".grid-container");
const reset = document.querySelector(".reset");
const warning = document.querySelector(".warning");
const select = document.querySelector(".select");

let color = "black";

function gridLayout(size) {
  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
  for (let i = 0; i < size * size; i++) {
    grid.appendChild(createGrid(800 / size));
  }
  paint();
}

function createGrid(divsize) {
  const divChild = document.createElement("div");
  divChild.classList.add("grid-item");
  divChild.style.width = divChild.style.height = `${divsize}px`;
  return divChild;
}

function paint() {
  const allGridSelect = document.querySelectorAll(".grid-item");
  allGridSelect.forEach((gridItem) => {
    gridItem.addEventListener("mouseover", () => {
      let value = gridItem.getAttribute("value");
      if (value < 10) {
        changeDarkening(gridItem, value);
      }
      if (color === "random") {
        gridItem.style.backgroundColor = `hsl(${
          Math.random() * 360
        }, 100%, 50%)`;
      } else {
        gridItem.style.backgroundColor = color;
      }
    });
  });
}

function changeDarkening(gridItem, value) {
  value++;
  gridItem.style.opacity = `${value * 10}%`;
  gridItem.setAttribute("value", value);
}

// Color black or white or random change
function changeColor(input) {
  color = input;
}

// Rest
reset.addEventListener("click", () => {
  while (grid.hasChildNodes()) {
    grid.removeChild(grid.firstChild);
  }
  gridLayout(16);
});

gridLayout(16);

// Grid size changes and warning
function changeSize(input) {
  if (input >= 2 && input <= 100) {
    gridLayout(input);
  } else {
    const warningMsg = document.createElement("div");
    warningMsg.textContent = "Please only enter a number between 2 and 100. ";
    warning.appendChild(warningMsg);
  }
}

select.addEventListener("click", () => {
  if (warning.hasChildNodes()) {
    setTimeout(function () {
      warning.removeChild(warning.firstChild);
    }, 3000);
  }
});

function borderToggle() {
  const grid = document.querySelectorAll(".grid-item");
  grid.forEach((item) => {
    if (item.style.border == "1px solid black") {
      item.style.border = "0px solid black";
    } else {
      item.style.border = "1px solid black";
    }
  });
}
