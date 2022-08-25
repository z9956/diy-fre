import { peek, pop, push } from './heapify';

let taskQueue = [];
let currentCallback = null;
let frameDeadline = 0;
const frameLength = 1000 / 60;

export function scheduleCallback(callback) {
	const startTime = getTime();
	const timeout = 3000;
	const dueTime = startTime + timeout;

	let newTask = {
		callback,
		startTime,
		dueTime,
	};

	push(taskQueue, newTask);
	currentCallback = flush;
	planWork();
}

function flush(iniTime) {
	let currentTime = iniTime;
	let currentTask = peek(taskQueue);

	while (currentTask) {
		const didout = currentTask.dueTime <= currentTime;
		if (!didout && shouldYeild()) break;

		let callback = currentTask.callback;
		currentTask.callback = null;

		let next = callback(didout);
		next ? (currentTask.callback = next) : pop(taskQueue);

		currentTask = peek(taskQueue);
		currentTask = getTime();
	}

	return !!currentTask;
}

function flushWork() {
	if (currentCallback) {
		let currentTime = getTime();
		frameDeadline = currentTime + frameLength;
		let more = currentCallback(currentTime);
		more ? planWork() : (currentCallback = null);
	}
}

export const planWork = (() => {
	if (typeof MessageChannel !== 'undefined') {
		const { port1, port2 } = new MessageChannel();
		port1.onmessage = flushWork;
		return (cb) => (cb ? requestAnimationFrame(cb) : port2.postMessage(null));
	}
	return (cb) => setTimeout(cb || flushWork);
})();

export function shouldYeild() {
	return getTime() >= frameDeadline;
}

export const getTime = () => performance.now();
