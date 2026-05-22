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
			const isActive = i === index;
			panel.classList.toggle('tabs-accordion__panel--active', isActive);
			panel.hidden = !isActive;
		});

		el.querySelectorAll('.js-accordion-item').forEach(item => {
			item.classList.remove(this.activeAccordionClass);
			const body = item.querySelector('.js-accordion-body');
			const trigger = item.querySelector('.js-accordion-button');
			if (body) {
				body.style.height = '0';
				body.hidden = true;
			}
			if (trigger) trigger.setAttribute('aria-expanded', 'false');
		});
	},

	toggleAccordion(button) {
		const parent = button.closest('.js-accordion-item');
		const body = parent.querySelector('.js-accordion-body');
		const content = parent.querySelector('.js-accordion-content');
		const accordionList = button.closest('.js-accordion');

		const isOpen = parent.classList.contains(this.activeAccordionClass);

		if (isOpen) {
			parent.classList.remove(this.activeAccordionClass);
			body.style.height = '0';
			body.hidden = true;
			button.setAttribute('aria-expanded', 'false');
			return;
		}

		accordionList.querySelectorAll('.js-accordion-item').forEach(item => {
			item.classList.remove(this.activeAccordionClass);
			const bodyItem = item.querySelector('.js-accordion-body');
			const trigger = item.querySelector('.js-accordion-button');
			if (bodyItem) {
				bodyItem.style.height = '0';
				bodyItem.hidden = true;
			}
			if (trigger) trigger.setAttribute('aria-expanded', 'false');
		});

		parent.classList.add(this.activeAccordionClass);
		body.hidden = false;
		body.style.height = content.scrollHeight + 'px';
		button.setAttribute('aria-expanded', 'true');

		setTimeout(() => {
			parent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}, 333);
	},

	initInstance(el) {
		const tabs = Array.from(el.querySelectorAll('.tabs-accordion__tab'));
		const panels = Array.from(el.querySelectorAll('.tabs-accordion__panel'));

		tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => this.switchTab(el, tabs, panels, index));

			tab.addEventListener('keydown', e => {
				let newIndex = index;

				switch (e.key) {
					case 'ArrowRight':
						newIndex = (index + 1) % tabs.length;
						break;
					case 'ArrowLeft':
						newIndex = (index - 1 + tabs.length) % tabs.length;
						break;
					case 'Home':
						newIndex = 0;
						break;
					case 'End':
						newIndex = tabs.length - 1;
						break;
					default:
						return;
				}

				e.preventDefault();
				tabs[newIndex].focus();
				this.switchTab(el, tabs, panels, newIndex);
			});
		});

		el.querySelectorAll('.js-accordion-button').forEach(button => {
			button.addEventListener('click', () => this.toggleAccordion(button));
		});
	},

	init() {
		document.querySelectorAll('.tabs-accordion').forEach(el => this.initInstance(el));
	}
};

export default tabsAccordion;
