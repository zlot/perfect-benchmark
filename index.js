"use strict";

const process = require("process");
const colors = require("colors");
const async = require("async");

const defaultNumIterations = 25;


let benchmark = (func, funcName, numIterations, callback) => {

	numIterations = +numIterations;

	if (isNaN(numIterations) || numIterations < 1) {
		numIterations = defaultNumIterations;
	}

	let iterationCounter = 0;
	let executionTimes = [];

	async.whilst(() => {	// condition

		return iterationCounter < numIterations;

	}, innerCallback => {	// loop body

		iterationCounter++;

		let startTime = Date.now();

		func(() => {
			let endTime = Date.now();
			executionTimes.push(endTime - startTime);

			innerCallback();
		});

	}, () => {	// after iteration

		let sum = 0;

		for (let i = 0; i < executionTimes.length; i++) {
			sum += executionTimes[i];
		}

		outputResultsInAPrettyWay(funcName, sum / executionTimes.length, executionTimes);

		if (typeof callback === "function") {
			callback();
		}

	});

};


let prettifyTime = milliseconds => {
	return parseInt(milliseconds / 1000) + " s " + (milliseconds % 1000).toFixed(1) + " ms";
};


let prettifyTimes = times => {
	let result = "";

	for (let i = 0; i < times.length; i++) {
		result += prettifyTime(times[i]);

		if (i !== times.length - 1) {
			result += ", ";
		}
	}

	return result;
};


let outputResultsInAPrettyWay = (label, averageTime, executionTimes) => {
	console.log("Exectuted " + label.bold + " " + executionTimes.length + " times.");
	console.log("Average duration: " + prettifyTime(averageTime).bold);
	console.log(("Individual durations: " + prettifyTimes(executionTimes)).grey);
	console.log();	// newline
};


module.exports = benchmark;