const stageElement = document.querySelector(".stage");
const houseElement = document.querySelector(".house");
const barElement = document.querySelector(".progress-bar");
const frontWallElements = document.querySelectorAll(".wall-front");

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

window.addEventListener("scroll", function () {
  const scrollRatio = pageYOffset / maxScrollValue;
  const zMove = scrollRatio * 2980 - 300;
  houseElement.style.transform = `translateZ(${zMove}vw)`;
  barElement.style.width = `${scrollRatio * 100}%`;
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
