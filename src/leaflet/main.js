const handElement = document.querySelector(".hand");
const leafletElement = document.querySelector(".leaflet");
const pageElements = document.querySelectorAll(".page");

let selectedItem;
let handPos = { x: 0, y: 0 };
let targetPos = { x: 0, y: 0 };
let distX;
let distY;

function getTargetElement(element, className) {
  while (!element.classList.contains(className)) {
    element = element.parentNode;

    if (element.nodeName === "BODY") {
      element = null;
      return;
    }
  }

  return element;
}

function closeLeaflet() {
  pageElements[2].classList.remove("page-opened");
  setTimeout(() => {
    pageElements[0].classList.remove("page-opened");
  }, 500);
}

function zoomIn(element) {
  const rect = element.getBoundingClientRect();
  const dx = window.innerWidth / 2 - (rect.x + rect.width / 2);
  const dy = window.innerHeight / 2 - (rect.y + rect.height / 2);
  let angle;

  switch (+element.parentNode.parentNode.parentNode.dataset.page) {
    case 1:
      angle = -30;
      break;
    case 2:
      angle = 0;
      break;
    case 3:
      angle = 30;
      break;
  }

  leafletElement.style.transform = `translate3d(${dx}px, ${dy}px, 50vw) rotateY(${angle}deg)`;
  selectedItem = element;
  document.body.classList.add("zoom-in");
  selectedItem.classList.add("selected-item");
}

function zoomOut() {
  leafletElement.style.transform = `translate3d(0, 0, 0)`;
  if (selectedItem) {
    document.body.classList.remove("zoom-in");
    selectedItem.classList.remove("selected-item");
    selectedItem = null;
  }
}

function renderHand() {
  distX = targetPos.x - handPos.x;
  distY = targetPos.y - handPos.y;
  handPos.x = handPos.x + distX * 0.1;
  handPos.y = handPos.y + distY * 0.1;
  handElement.style.transform = `translate(${handPos.x}px, ${handPos.y}px)`;
  requestAnimationFrame(renderHand);
}

renderHand();

leafletElement.addEventListener("click", (event) => {
  let pageElement = getTargetElement(event.target, "page");
  if (pageElement) {
    pageElement.classList.add("page-opened");
  }

  let closeBtnElement = getTargetElement(event.target, "button__close");
  if (closeBtnElement) {
    closeLeaflet();
    zoomOut();
  }

  let menuItemElement = getTargetElement(event.target, "menu-item");
  if (menuItemElement && !selectedItem) {
    zoomIn(menuItemElement);
  }

  let backBtnElement = getTargetElement(event.target, "button__back");
  if (backBtnElement) {
    zoomOut();
  }
});

leafletElement.addEventListener("animationend", () => {
  leafletElement.style.animation = "none";
});

window.addEventListener("mousemove", (event) => {
  targetPos.x = event.clientX - window.innerWidth * 0.7;
  targetPos.y = event.clientY - window.innerHeight * 0.7;
});
