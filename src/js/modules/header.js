// ----------  header
// ------------------------------------------------------------------------------

const header = {
	burger: null,
	drawer: null,
	drawerClose: null,
	dropdownToggles: null,

	get focusableElements() {
		return this.drawer.querySelectorAll('a, button');
	},

	openDrawer() {
		this.drawer.classList.add('is-open');
		this.drawer.setAttribute('aria-hidden', 'false');
		this.burger.setAttribute('aria-expanded', 'true');
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '0'));
		this.drawerClose.focus();
		document.body.style.overflow = 'hidden';
	},

	closeDrawer() {
		this.drawer.classList.remove('is-open');
		this.drawer.setAttribute('aria-hidden', 'true');
		this.burger.setAttribute('aria-expanded', 'false');
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
		this.burger.focus();
		document.body.style.overflow = '';
	},

	toggleDropdown(item) {
		const isOpen = item.classList.contains('is-open');

		// close all open dropdowns first
		this.dropdownToggles.forEach(toggle => {
			toggle.closest('.nav__item--has-dropdown').classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
		});

		// open clicked one if it was closed
		if (!isOpen) {
			item.classList.add('is-open');
			item.querySelector('.nav__link').setAttribute('aria-expanded', 'true');
		}
	},

	init() {
		this.burger = document.querySelector('.header__burger');
		this.drawer = document.getElementById('mobile-drawer');
		this.drawerClose = document.querySelector('.header__drawer-close');
		this.dropdownToggles = document.querySelectorAll('.nav--drawer .nav__item--has-dropdown > .nav__link');

		if (!this.burger || !this.drawer) return;

		// burger open
		this.burger.addEventListener('click', () => this.openDrawer());

		// close button
		this.drawerClose.addEventListener('click', () => this.closeDrawer());

		// close on escape
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && this.drawer.classList.contains('is-open')) {
				this.closeDrawer();
			}
		});

		// close on backdrop click
		this.drawer.addEventListener('click', e => {
			if (e.target === this.drawer) this.closeDrawer();
		});

		// mobile accordion dropdowns
		this.dropdownToggles.forEach(toggle => {
			toggle.addEventListener('click', e => {
				e.preventDefault();
				const item = toggle.closest('.nav__item--has-dropdown');
				this.toggleDropdown(item);
			});
		});
	}
};

export default header;
