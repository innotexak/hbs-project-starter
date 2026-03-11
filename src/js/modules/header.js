// ----------  header
// ------------------------------------------------------------------------------

const header = {
	burger: null,
	drawer: null,
	drawerClose: null,
	nav: null,

	get focusableElements() {
		return this.nav.querySelectorAll('a, button');
	},

	openDrawer() {
		document.body.classList.add('drawer-is-open');
		this.burger.setAttribute('aria-expanded', 'true');
		this.drawer.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		// Focus the close button
		this.drawerClose.focus();
		// Make nav links focusable
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '0'));
	},

	closeDrawer() {
		document.body.classList.remove('drawer-is-open');
		this.burger.setAttribute('aria-expanded', 'false');
		this.drawer.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		// Return focus to burger
		this.burger.focus();
		// Remove focusability from nav links
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
	},

	init() {
		this.burger = document.querySelector('.header__burger');
		this.drawer = document.querySelector('.header__drawer');
		this.drawerClose = document.querySelector('.header__drawer-close');
		this.nav = document.querySelector('.header__nav');

		if (!this.burger || !this.nav) return;

		// Nav links not focusable by default on mobile (nav is visually hidden)
		if (window.innerWidth < 1024) {
			this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
		}

		// Burger open
		this.burger.addEventListener('click', () => this.openDrawer());

		// Close button
		if (this.drawerClose) {
			this.drawerClose.addEventListener('click', () => this.closeDrawer());
		}

		// Close on Escape
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && document.body.classList.contains('drawer-is-open')) {
				this.closeDrawer();
			}
		});

		// Close on backdrop click (if you keep a backdrop element)
		if (this.drawer) {
			this.drawer.addEventListener('click', e => {
				if (e.target === this.drawer) this.closeDrawer();
			});
		}

		// Re-evaluate tabindex on resize (e.g. user rotates device to desktop width)
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1024) {
				// Desktop: nav always visible, all links naturally focusable
				this.focusableElements.forEach(el => el.removeAttribute('tabindex'));
				// Also close drawer if it was open
				if (document.body.classList.contains('drawer-is-open')) {
					document.body.classList.remove('drawer-is-open');
					document.body.style.overflow = '';
					this.burger.setAttribute('aria-expanded', 'false');
				}
			} else {
				// Mobile/tablet: only focusable when drawer is open
				if (!document.body.classList.contains('drawer-is-open')) {
					this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
				}
			}
		});
	}
};

export default header;
