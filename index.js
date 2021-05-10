class CountdownTimer {

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

    this.refs = {
      timerField: document.querySelector(`${this.selector}`),
      daysField: document.querySelector(`${this.selector} [data-value="days"]`),
      hoursField: document.querySelector(`${this.selector} [data-value="hours"]`),
      minsField: document.querySelector(`${this.selector} [data-value="mins"]`),
      secsField: document.querySelector(`${this.selector} [data-value="secs"]`),

    }
  }

  start() {
    this.intervalId = setInterval(() => {

      const currTime = Date.now();// текущее время
      const timeDif = this.targetDate.getTime() - currTime; //остаток до targetDate в миллисекундах

      const days = Math.floor(timeDif / (1000 * 60 * 60 * 24));
      const hours = this.pad(Math.floor((timeDif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const mins = this.pad(Math.floor((timeDif % (1000 * 60 * 60)) / (1000 * 60)));
      const secs = this.pad(Math.floor((timeDif % (1000 * 60)) / 1000));


      this.updateTimerContent(days, hours, mins, secs);

      if (timeDif < 0) {
        clearInterval(this.intervalId);
        this.clearTimerContent();
        console.log('Период акции закончился')
      }

    }, 1000)
  }

  updateTimerContent(days, hours, mins, secs) {
    this.refs.daysField.textContent = days;
    this.refs.hoursField.textContent = hours;
    this.refs.minsField.textContent = mins;
    this.refs.secsField.textContent = secs;
  }

  clearTimerContent() {
    this.refs.daysField.textContent = '00';
    this.refs.hoursField.textContent = '00';
    this.refs.minsField.textContent = '00';
    this.refs.secsField.textContent = '00';

    this.refs.timerField.insertAdjacentHTML('afterend', '<div class="add-div"> Период акции закончился :(  </div>')
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
};


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jun 17, 2021'),
});

timer.start()




