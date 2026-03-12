import './global/init-helpers';

const scriptSections = document.querySelectorAll('[data-script]');
const scriptFileArray = [];
if (scriptSections.length > 0) {
	scriptSections.forEach(section => {
		const fileName = section.dataset.script;
		if (scriptFileArray.includes(fileName)) return;
		scriptFileArray.push(fileName);
		import(`./modules/${fileName}`).then(mod => {
			mod.default.init();
		});
	});
}

// const accordionButtons = document.querySelectorAll('.js-accordion-button');
// const accordionItems = document.querySelectorAll('.js-accordion-item');
// const activeAccordionClass = 'accordion-test__item--active';

// accordionButtons.forEach(button => {
// 	button.addEventListener('click', () => {
// 		console.log(button);

// 		const parent = button.closest('.js-accordion-item');
// 		const body = parent.querySelector('.js-accordion-body');
// 		const content = parent.querySelector('.js-accordion-content');
// 		if (parent.classList.contains(activeAccordionClass)) {
// 			parent.classList.remove(activeAccordionClass);
// 			body.style.height = '0';
// 			return;
// 		}

// 		accordionItems.forEach(item => {
// 			item.classList.remove(activeAccordionClass);
// 			const bodyItem = item.querySelector('.js-accordion-body');
// 			bodyItem.style.height = '0';
// 		});

// 		const height = content.offsetHeight + 'px';

// 		parent.classList.add(activeAccordionClass);
// 		body.style.height = height;
// 		setTimeout(() => {
// 			parent.scrollIntoView({ behavior: 'smooth' });
// 		}, 333);
// 	});
// });
