/**
 * Timer is a base class. It creates a base Timer with a default value of 30s
 * to count down
 * @constructor
 * @param {HTMLElement} durationInput The DOM Element of an input.
 */

class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;
		// default value
		this.timerValue = 30;
		this.timerId;
		this.perTick = 50;

		if (callbacks) {
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		// when we call start in this way, `this` is binded to the button. (startButton)
		this.startButton.addEventListener('click', this.start);
		// using bind.
		this.durationInput.addEventListener(
			'input',
			this.updateTimerDuration.bind(this)
		);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start = () => {
		this.tick();
		this.timerId = setInterval(this.tick, this.perTick);
	};

	pause = () => {
		clearInterval(this.timerId);
	};

	tick = () => {
		if (this.timerValue <= 0) {
			this.pause();
			this.onComplete();
		} else {
			// using a getter and setter..
			// do we need a getter here?
			if (this.onTick) {
				this.onTick(this.magicNumber);
			}
			this.timeRemaining = this.timeRemaining - this.perTick / 1000;
		}
	};

	get timeRemaining() {
		return this.timerValue;
	}

	set timeRemaining(time) {
		this.timerValue = time.toFixed(2);
		this.durationInput.value = this.timerValue;
	}

	updateTimerDuration() {
		this.timerValue = this.durationInput.value;
		// A solution exists where
		this.magicNumber = Number(this.timerValue) / (this.perTick / 1000);
	}
}

export default Timer;
