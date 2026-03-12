// ----------  tabs-accordion
// ------------------------------------------------------------------------------
const tabsAccordion = {
	activeAccordionClass: 'accordion__item--open',

	switchTab(el, tabs, panels, index) {
		tabs.forEach((tab, i) => {
			const isActive = i === index;
			tab.classList.toggle('tabs-accordion__tab--active', isActive);
			tab.setAttribute('aria-selected', String(isActive));
			tab.setAttribute('tabindex', isActive ? '0' : '-1');
		});

		panels.forEach((panel, i) => {
			panel.classList.toggle('tabs-accordion__panel--active', i === index);
		});

		// Close all accordions in the specific component when switching tabs
		el.querySelectorAll('.js-accordion-item').forEach(item => {
			item.classList.remove(this.activeAccordionClass);
			const body = item.querySelector('.js-accordion-body');
			if (body) body.style.height = '0';
		});
	},

	toggleAccordion(button) {
		const parent = button.closest('.js-accordion-item');
		const body = parent.querySelector('.js-accordion-body');
		const content = parent.querySelector('.js-accordion-content');
		// Scope search to the immediate parent list only
		const accordionList = button.closest('.js-accordion');

		if (parent.classList.contains(this.activeAccordionClass)) {
			parent.classList.remove(this.activeAccordionClass);
			body.style.height = '0';
			return;
		}

		// Close others ONLY in this specific list
		accordionList.querySelectorAll('.js-accordion-item').forEach(item => {
			item.classList.remove(this.activeAccordionClass);
			const bodyItem = item.querySelector('.js-accordion-body');
			if (bodyItem) bodyItem.style.height = '0';
		});

		// Calculate height (since tab is active, content.scrollHeight will work)
		const height = content.scrollHeight + 'px';

		parent.classList.add(this.activeAccordionClass);
		body.style.height = height;

		setTimeout(() => {
			parent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}, 333);
	},

	initInstance(el) {
		const tabs = Array.from(el.querySelectorAll('.tabs-accordion__tab'));
		const panels = Array.from(el.querySelectorAll('.tabs-accordion__panel'));

		// Handle initial open items
		el.querySelectorAll('.js-accordion-item.accordion__item--open').forEach(item => {
			const body = item.querySelector('.js-accordion-body');
			const content = item.querySelector('.js-accordion-content');
			if (body && content) {
				body.style.height = content.scrollHeight + 'px';
			}
		});

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => this.switchTab(el, tabs, panels, index));
		});

		el.querySelectorAll('.js-accordion-button').forEach(button => {
			button.addEventListener('click', () => this.toggleAccordion(button));
		});
	},

	init() {
		const instances = document.querySelectorAll('.tabs-accordion');
		instances.forEach(el => this.initInstance(el));
	}
};

export default tabsAccordion;

