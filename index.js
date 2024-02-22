const timeframeAdjectives = {
  'Day': 'Daily',
  'Week': 'Weekly',
  'Month': 'Monthly',
};

const backgroundColorVariables = {
  'Work': '--light-red-work',
  'Play': '--soft-blue-play',
  'Study': '--light-red-study',
  'Exercise': '--lime-green-exercise',
  'Social': '--violet-social',
  'Self Care': '--soft-orange-self-care',
};

let currentTimeframe = 'Month';

class Card {
  constructor ({ title, timeframes }) {
    this.title = title;
    this.timeframes = timeframes;
    
    this.element = this.createElement();
    this.subElements = {
      hours: this.element.querySelector('.card__hours'),
      previous: this.element.querySelector('.card__previous'),
    };
    this.updateHours();
  }

  createTemplate () {
    return `
      <div class="card" style="background-color: var(${backgroundColorVariables[this.title]});">
        <img class="card__icon" src="./images/icon-${this.title.toLowerCase().replace(' ', '-')}.svg" alt="">
        <div class="card__content">
          <p class="card__title">${this.title}</p>
          <a class="card__more" href="/" aria-label="More on ${this.title}">
            <img src="./images/icon-ellipsis.svg" alt="">
          </a>
          <span class="card__hours"></span>
          <span class="card__previous"></span>
        </div>
      </div>
    `;
  }

  createElement () {
    const container = document.createElement('div');
    container.innerHTML = this.createTemplate();
    return container.firstElementChild;
  }

  updateHours () {
    this.subElements.hours.textContent = this.timeframes[timeframeAdjectives[currentTimeframe].toLowerCase()].current + 'hrs';
    this.subElements.previous.textContent = 
      'Last ' + currentTimeframe + ' - ' + this.timeframes[timeframeAdjectives[currentTimeframe].toLowerCase()].previous + 'hrs';
  }
}

let cards = [];
fetch('./data.json')
  .then((response) => (response.json()))
  .then((data) => {
    cards = data.map((category) => (new Card(category)));
    document.body.append(...cards.map((card) => card.element));
  });