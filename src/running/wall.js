const stageElement = document.querySelector(".stage");
const houseElement = document.querySelector(".house");
const barElement = document.querySelector(".progress-bar");
const frontWallElements = document.querySelectorAll(".wall-front");
const leftWallElement = document.querySelector(".wall-left");
const rightWallElement = document.querySelector(".wall-right");
const backgroundElement = document.querySelector(".background");

const mousePos = {
  x: 0,
  y: 0,
};
let mouseSensitivity = 5;
let maxScrollValue;

function setFrontWalls() {
  for (let [index, frontWall] of frontWallElements.entries()) {
    frontWall.style.transform = `translateZ(${-300 * index}vw)`;
  }
}

function resizeHandler() {
  maxScrollValue = document.body.offsetHeight - window.innerHeight;
}

function changeColor(color, ...elems) {
  for (let elem of elems) {
    elem.style.background = color;
  }
}

function changeColorTheme(move) {
  if (move < 0) {
    // 여로
    changeColor(
      "rgb(187,204,204)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 300) {
    // 츄츄
    changeColor(
      "rgb(187, 221, 102)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 600) {
    // 레헬른
    changeColor(
      "rgb(253, 159, 221)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 900) {
    // 아르카나
    changeColor(
      "rgb(85, 204, 255)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 1200) {
    // 모라스
    changeColor(
      "rgb(17, 68, 136)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 1500) {
    // 에스페라
    changeColor(
      "rgb(102, 102, 221)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 1800) {
    // 문브릿지
    changeColor(
      "rgb(136, 102, 102)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 2100) {
    // 고통의 미궁
    changeColor(
      "rgb(51, 68, 51)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 2400) {
    // 리멘
    changeColor(
      "rgb(85, 68, 102)",
      leftWallElement,
      rightWallElement,
      barElement
    );
  } else if (move < 2700) {
    // 검멘
    changeColor("rgb(32, 0, 2)", leftWallElement, rightWallElement, barElement);
  }
}

window.addEventListener("scroll", function () {
  const scrollRatio = pageYOffset / maxScrollValue;
  const zMove = scrollRatio * 2900 - 300;
  houseElement.style.transform = `translateZ(${zMove}vw)`;
  barElement.style.width = `${scrollRatio * 100}%`;

  changeColorTheme(zMove);
  backgroundElement.style.filter = `blur(10px) brightness(${
    4 - scrollRatio * 3
  })`;
});

window.addEventListener("mousemove", function (event) {
  mousePos.x = -1 + (event.clientX / window.innerWidth) * 2;
  mousePos.y = 1 - (event.clientY / window.innerHeight) * 2;
  stageElement.style.transform = `rotateX(${
    mousePos.y * mouseSensitivity
  }deg) rotateY(${mousePos.x * mouseSensitivity}deg)`;
});

window.addEventListener("resize", resizeHandler);

setFrontWalls();
resizeHandler();
