// ----------  header
// ------------------------------------------------------------------------------

const header = {
	burger: null,
	drawer: null,
	drawerClose: null,
	drawerNavSlot: null,
	nav: null,
	navOriginalParent: null,
	navNextSibling: null,

	get focusableElements() {
		return this.drawer.querySelectorAll('a, button');
	},

	moveNavToDrawer() {
		// Remember original position so we can restore it
		this.navOriginalParent = this.nav.parentElement;
		this.navNextSibling = this.nav.nextElementSibling;
		this.drawerNavSlot.appendChild(this.nav);
		// Make links focusable inside drawer
		this.nav.querySelectorAll('a').forEach(el => el.setAttribute('tabindex', '0'));
	},

	restoreNav() {
		// Put nav back between logo and CTA
		if (this.navNextSibling) {
			this.navOriginalParent.insertBefore(this.nav, this.navNextSibling);
		} else {
			this.navOriginalParent.appendChild(this.nav);
		}
		// Remove tabindex so links aren't reachable while drawer is closed
		this.nav.querySelectorAll('a').forEach(el => el.setAttribute('tabindex', '-1'));
	},

	openDrawer() {
		this.moveNavToDrawer();
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
		this.restoreNav();
		this.burger.focus();
		document.body.style.overflow = '';
	},

	init() {
		this.burger = document.querySelector('.header__burger');
		this.drawer = document.getElementById('mobile-drawer');
		this.drawerClose = document.querySelector('.header__drawer-close');
		this.drawerNavSlot = document.querySelector('.drawer-nav-slot');
		this.nav = document.querySelector('.header__nav');

		if (!this.burger || !this.drawer || !this.nav) return;

		// Nav links not focusable by default (nav is in desktop header)
		this.nav.querySelectorAll('a').forEach(el => el.setAttribute('tabindex', '-1'));

		// Burger open
		this.burger.addEventListener('click', () => this.openDrawer());

		// Close button
		this.drawerClose.addEventListener('click', () => this.closeDrawer());

		// Close on Escape
		document.addEventListener('keydown', e => {
			if (e.key === 'Escape' && this.drawer.classList.contains('is-open')) {
				this.closeDrawer();
			}
		});

		// Close on backdrop click
		this.drawer.addEventListener('click', e => {
			if (e.target === this.drawer) this.closeDrawer();
		});
	}
};

export default header;
