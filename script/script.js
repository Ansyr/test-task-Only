const mainSection = document.querySelector(".main__pins");
const mainImage = document.querySelector(".mainbg");

const PIN_OPACITY_NORMAL = "0.7";
const PIN_OPACITY_SELECTED = "1";

const PINS = [
  {
    left: 1373,
    top: 225,
    text: "Жилой комплекс",
    color: "blue",
  },
  {
    left: 580,
    top: 282,
    text: "Вокзал",
    color: "blue",
  },
  {
    left: 1148,
    top: 404,
    text: "Главный корпус",
    color: "green",
  },
  {
    left: 1414,
    top: 475,
    text: "Арена",
    color: "blue",
  },
  {
    left: 1081,
    top: 629,
    text: "Зал",
    color: "blue",
  },
  {
    left: 1306,
    top: 669,
    text: "Отель",
    color: "green",
  },
  {
    left: 1593,
    top: 713,
    text: "Отель",
    color: "blue",
  },
  {
    left: 446,
    top: 716,
    text: "Мост",
    color: "blue",
  },
  {
    left: 1107,
    top: 790,
    text: "Отель",
    color: "green",
  },
  {
    left: 687,
    top: 482,
    text: "Стадион",
    color: "green",
  },
];

class PinButton {
  constructor(left, top, text, color) {
    this.text = text;
    this.color = color;
    this.top = top;
    this.left = left;
    this.element = this.createPinButton();
  }

  createPinButton() {
    const pinButton = document.createElement("div");

    pinButton.classList.add("pin-button");
    pinButton.style.position = "absolute";
    pinButton.style.left = `${this.left}px`;
    pinButton.style.top = `${this.top}px`;
    pinButton.classList.add(`pin-button_${this.color}`);

    const pinButtonIcon = document.createElement("div");
    pinButtonIcon.classList.add("pin-button__icon");
    pinButtonIcon.textContent = "+";

    const pinButtonSpoiler = document.createElement("div");
    pinButtonSpoiler.classList.add("pin-button__spoiler");

    const pinButtonSpoilerInner = document.createElement("div");
    pinButtonSpoilerInner.classList.add("pin-button__spoiler-inner");
    pinButtonSpoilerInner.textContent = this.text;

    pinButtonSpoiler.appendChild(pinButtonSpoilerInner);
    pinButton.appendChild(pinButtonIcon);
    pinButton.appendChild(pinButtonSpoiler);

    return pinButton;
  }

  addToHTML(container) {
    container.appendChild(this.element);
  }

  updatePosition(left, top) {
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }
}

const updateImageSizes = () => {
  const aspectRatio = 1920 / 1080;
  const windowAspectRatio = window.innerWidth / window.innerHeight;

  if (windowAspectRatio > aspectRatio) {
    mainImage.style.width = "100vw";
    mainImage.style.height = "auto";
  } else {
    mainImage.style.width = "auto";
    mainImage.style.height = "100vh";
  }
};
const open = (e) => {
  const target = e.target.closest(".pin-button");

  if (target) {
    const spoiler = target.querySelector(".pin-button__spoiler");
    const spoilerInner = target.querySelector(".pin-button__spoiler-inner");
    const icon = target.querySelector(".pin-button__icon");

    if (!target.classList.contains("_show")) {
      spoiler.style.width = `${spoilerInner.clientWidth}px`;
      target.style.opacity = PIN_OPACITY_SELECTED;
      icon.textContent = "-";
      target.classList.add("_show");
    } else {
      if (target.classList.contains("_show")) {
        spoiler.style.width = `${0}px`;
        target.style.opacity = PIN_OPACITY_NORMAL;
        icon.textContent = "+";
        target.classList.remove("_show");
      }
    }
  } else {
    const allPins = document.querySelectorAll(".pin-button");
    allPins.forEach((pin) => {
      const spoiler = pin.querySelector(".pin-button__spoiler");
      const icon = pin.querySelector(".pin-button__icon");
      pin.style.opacity = PIN_OPACITY_NORMAL;
      spoiler.style.width = "0";
      icon.textContent = "+";

      pin.classList.remove("_show");
    });
  }
};



const pinMap = PINS.map(({ left, top, color, text }) => {
  return new PinButton(left, top, text, color);
});

pinMap.forEach((pin) => {
  pin.addToHTML(mainSection);
});

mainSection.addEventListener("click", open);

window.addEventListener("load", () => {
  updateImageSizes();

  pinMap.forEach((pin) => {
    const pinX = (mainImage.clientWidth / 1920) * pin.left;
    const pinY = (mainImage.clientHeight / 1080) * pin.top;
    pin.updatePosition(pinX, pinY);
  });

  const resizeEvent = new Event("resize");
  window.dispatchEvent(resizeEvent);
});

window.addEventListener("resize", () => {
  updateImageSizes();

  pinMap.forEach((pin) => {
    const pinX = (mainImage.clientWidth / 1920) * pin.left;
    const pinY = (mainImage.clientHeight / 1080) * pin.top;
    pin.updatePosition(pinX, pinY);
  });
});
