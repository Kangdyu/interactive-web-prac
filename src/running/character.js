export function Character(info) {
  this.mainElement = document.createElement("div");
  this.mainElement.classList.add("character");
  this.mainElement.innerHTML = `
  <div class="character-torso">
    <div class="character-front"></div>
    <div class="character-back"></div>
  </div>
  `;
  this.mainElement.style.left = `${info.xPos}%`;
  document.querySelector(".stage").appendChild(this.mainElement);

  this.scrollState = false;
  this.lastScroll = 0;
  this.xPos = info.xPos;
  this.speed = 0.5;
  this.direction;
  this.isRunning = false;
  this.animationId;

  this.init();
}

Character.prototype = {
  constructor: Character,
  init: function () {
    window.addEventListener("scroll", () => {
      clearTimeout(this.scrollState);

      if (!this.scrollState) {
        this.mainElement.classList.add("running");
      }

      this.scrollState = setTimeout(() => {
        this.scrollState = false;
        this.mainElement.classList.remove("running");
      }, 200);

      if (this.lastScroll > pageYOffset) {
        // 앞
        this.mainElement.setAttribute("data-direction", "forward");
      } else {
        // 뒤
        this.mainElement.setAttribute("data-direction", "backward");
      }

      this.lastScroll = pageYOffset;
    });

    window.addEventListener("keydown", (event) => {
      if (this.isRunning) return;

      if (event.keyCode === 37) {
        // 왼쪽 화살표
        this.mainElement.setAttribute("data-direction", "left");
        this.mainElement.classList.add("running");
        this.direction = "left";
        this.isRunning = true;
        this.run(this);
      } else if (event.keyCode === 39) {
        // 오른쪽 화살표
        this.mainElement.setAttribute("data-direction", "right");
        this.mainElement.classList.add("running");
        this.direction = "right";
        this.isRunning = true;
        this.run(this);
      }
    });

    window.addEventListener("keyup", (event) => {
      this.mainElement.classList.remove("running");
      this.isRunning = false;
      cancelAnimationFrame(this.animationId);
    });
  },
  run: function (self) {
    if (self.direction === "left") {
      self.xPos -= self.speed;
    } else if (self.direction === "right") {
      self.xPos += self.speed;
    }
    if (self.xPos < 10) {
      self.xPos = 10;
    } else if (self.xPos > 80) {
      self.xPos = 80;
    }
    self.mainElement.style.left = `${self.xPos}%`;

    self.animationId = requestAnimationFrame(function () {
      self.run(self);
    });
  },
};
