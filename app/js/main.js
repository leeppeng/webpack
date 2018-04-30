import '../css/reset.scss';
// import '../css/css.css';
function component() {
	let element = document.createElement('h1');
	let elSpan = document.createElement('span');
	elSpan.className='title'
	element.innerHTML = 'Hello webpack';
	elSpan.innerHTML = 'test';
	element.appendChild(elSpan)
	return element;
}

document.body.appendChild(component());