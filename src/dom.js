import { STYLE, TEXT } from './constant';

const isEvent = (key) => key.startsWith('on');
const isNew = (prev, next) => (key) => prev[key] !== next[key];

function updateProperty(dom, name, value, newValue) {
	if (name === STYLE) {
		for (let key in value) {
			if (!newValue[key]) dom[name][key] = '';
		}

		for (let key in newValue) {
			dom[name][key] = newValue[key];
		}
	} else if (isEvent(name)) {
		const eventType = name.toLowerCase().substring(2);

		if (value) dom.removeEventListener(eventType, value);
		dom.addEventListener(eventType, newValue);
	} else if (name in dom && !dom instanceof SVGElement) {
		dom[name] = newValue == null ? '' : newValue;
	} else if (newValue == null || newValue === false) {
		dom.removeAttribute(name);
	} else {
		dom.setAttribute(name, newValue);
	}
}

//对应updateDom
function updateElement(dom, props, newProps) {
	Object.keys(newProps)
		.filter(isNew(props, newProps))
		.forEach((key) => updateProperty(dom, key, props[key], newProps[key]));
}

//对应createDom
function createElement(fiber) {
	//TODO SVG
	const dom = fiber.type === TEXT ? document.createTextNode('') : document.createElement(fiber.type);

	updateElement(dom, [], fiber.props);

	return dom;
}

export { updateElement };
