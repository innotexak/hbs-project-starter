// ----------  tabs-accordion
// ------------------------------------------------------------------------------

const tabsAccordion = {
	el: null,
	tabs: null,
	panels: null,

	switchTab(index) {
		this.tabs.forEach((tab, i) => {
			const isActive = i === index;
			tab.classList.toggle('tabs-accordion__tab--active', isActive);
			tab.setAttribute('aria-selected', String(isActive));
			tab.setAttribute('tabindex', isActive ? '0' : '-1');
		});

		this.panels.forEach((panel, i) => {
			panel.classList.toggle('tabs-accordion__panel--active', i === index);
		});

		// Close all accordions when switching tabs
		this.el.querySelectorAll('.accordion__item').forEach(item => {
			item.classList.remove('accordion__item--open');
			item.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
		});
	},

	toggleAccordion(trigger) {
		const item = trigger.closest('.accordion__item');
		const isOpen = item.classList.contains('accordion__item--open');

		// Close all items in the same accordion list
		const allItems = item.closest('.accordion').querySelectorAll('.accordion__item');
		allItems.forEach(i => {
			i.classList.remove('accordion__item--open');
			i.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
		});

		// If it wasn't open before, open it now
		if (!isOpen) {
			item.classList.add('accordion__item--open');
			trigger.setAttribute('aria-expanded', 'true');
		}
	},

	init() {
		this.el = document.querySelector('.tabs-accordion');
		if (!this.el) return;

		this.tabs = Array.from(this.el.querySelectorAll('.tabs-accordion__tab'));
		this.panels = Array.from(this.el.querySelectorAll('.tabs-accordion__panel'));

		// Strip any leftover hidden attributes from accordion bodies on init
		this.el.querySelectorAll('.accordion__body').forEach(body => {
			body.removeAttribute('hidden');
		});

		// Sync aria-expanded with any pre-opened items from data
		this.el.querySelectorAll('.accordion__item').forEach(item => {
			const isOpen = item.classList.contains('accordion__item--open');
			item.querySelector('.accordion__trigger').setAttribute('aria-expanded', String(isOpen));
		});

		// Tab clicks
		this.tabs.forEach((tab, index) => {
			tab.addEventListener('click', () => this.switchTab(index));

			// Keyboard left/right arrow navigation
			tab.addEventListener('keydown', e => {
				if (e.key === 'ArrowRight') {
					const next = (index + 1) % this.tabs.length;
					this.switchTab(next);
					this.tabs[next].focus();
				}
				if (e.key === 'ArrowLeft') {
					const prev = (index - 1 + this.tabs.length) % this.tabs.length;
					this.switchTab(prev);
					this.tabs[prev].focus();
				}
			});
		});

		// Accordion triggers
		const triggers = this.el.querySelectorAll('.accordion__trigger');
		triggers.forEach(trigger => {
			trigger.addEventListener('click', () => this.toggleAccordion(trigger));
		});
	}
};

export default tabsAccordion;
