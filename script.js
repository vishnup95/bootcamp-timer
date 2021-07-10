'use strict';

import Timer from './timer.js';

const durationInput = document.querySelector('#duration-input');
const startBtn = document.querySelector('#start-btn');
const pauseBtn = document.querySelector('#pause-btn');
const timerCircle = document.querySelector('circle');

const radius = timerCircle.getAttribute('r');
const periMeter = +radius * Math.PI * 2;
console.log(periMeter);
let currentOffset = 0;
timerCircle.setAttribute('stroke-dasharray', periMeter);

const timer = new Timer(durationInput, startBtn, pauseBtn, {
	onTick(numberToSub) {
		currentOffset = currentOffset - periMeter / numberToSub;
		timerCircle.setAttribute('stroke-dashoffset', currentOffset);
	},
	onComplete() {
		durationInput.value = '';
		timerCircle.setAttribute('stroke-dasharray', periMeter);
		timerCircle.setAttribute('stroke-dashoffset', 0);
		currentOffset = 0;
	},
});

// Note from video..
//  the formula for the offset mentioned in the video is perimeter*timeRemaining/totalDuration - perimeter
// he also uses the callback onStart to get the totalDuration
