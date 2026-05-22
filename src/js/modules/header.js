// ----------  header
// ------------------------------------------------------------------------------

const header = {
	burger: null,
	drawer: null,
	drawerClose: null,
	nav: null,
	drawerFooter: null,

	// Dynamic array returning interactive items in the exact DOM visual order
	get focusableElements() {
		const elements = [];

		// 1. Close icon is always first
		if (this.drawerClose) elements.push(this.drawerClose);

		// 2. Navigation items
		if (this.nav) {
			const navItems = this.nav.querySelectorAll('a, button');
			elements.push(...Array.from(navItems));
		}

		// 3. Footer elements (CTA and bottom tabs)
		if (this.drawerFooter) {
			const footerItems = this.drawerFooter.querySelectorAll('a, button');
			elements.push(...Array.from(footerItems));
		}

		// Filter out any elements hidden by display: none or explicitly disabled
		return elements.filter(el => {
			const style = window.getComputedStyle(el);
			return style.display !== 'none' && style.visibility !== 'hidden';
		});
	},

	openDrawer() {
		document.body.classList.add('drawer-is-open');
		this.burger.setAttribute('aria-expanded', 'true');
		if (this.drawer) this.drawer.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';

		// Set tabindex="0" so these elements can be safely reached inside the trap
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '0'));

		// Force focus instantly onto the close button
		if (this.drawerClose) {
			this.drawerClose.focus();
		}
	},

	closeDrawer() {
		document.body.classList.remove('drawer-is-open');
		this.burger.setAttribute('aria-expanded', 'false');
		if (this.drawer) this.drawer.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';

		// Reset tabindex back to blocking state
		this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));

		// Return focus cleanly back to the burger button
		this.burger.focus();
	},

	handleKeyDown(e) {
		// Only run code if the mobile drawer menu is currently active
		if (!document.body.classList.contains('drawer-is-open')) return;

		// --- 1. HANDLE ESCAPE KEY ---
		if (e.key === 'Escape') {
			e.preventDefault();
			this.closeDrawer();
			return;
		}

		// --- 2. HANDLE TAB TRAP BOUNDARIES ---
		if (e.key === 'Tab') {
			const focusables = this.focusableElements;
			if (focusables.length === 0) return;

			const firstElement = focusables[0]; // Close button
			const lastElement = focusables[focusables.length - 1]; // Last item in footer

			if (e.shiftKey) {
				// Shift + Tab: If user is on Close button, cycle backward to Last Item
				if (document.activeElement === firstElement) {
					lastElement.focus();
					e.preventDefault();
				}
			} else {
				// Tab: If user is on Last Item, cycle forward to Close button
				if (document.activeElement === lastElement) {
					firstElement.focus();
					e.preventDefault();
				}
			}
		}
	},

	init() {
		this.burger = document.querySelector('.header__burger');
		this.drawer = document.querySelector('.header__drawer');
		this.drawerClose = document.querySelector('.header__drawer-close');
		this.nav = document.querySelector('.header__nav');
		this.drawerFooter = document.querySelector('.header__drawer-footer');

		if (!this.burger || !this.nav) return;

		// Block focus pathways if initialized on mobile screen size
		if (window.innerWidth < 1024) {
			this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
		}

		// Click Event Handlers
		this.burger.addEventListener('click', () => this.openDrawer());
		if (this.drawerClose) {
			this.drawerClose.addEventListener('click', () => this.closeDrawer());
		}

		// Single centralized keyboard observer for Esc and Tab trap
		document.addEventListener('keydown', e => this.handleKeyDown(e));

		// Close on dark backdrop click
		if (this.drawer) {
			this.drawer.addEventListener('click', e => {
				if (e.target === this.drawer) this.closeDrawer();
			});
		}

		// Desktop vs Mobile Resize Reset
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1024) {
				this.focusableElements.forEach(el => el.removeAttribute('tabindex'));
				if (document.body.classList.contains('drawer-is-open')) {
					document.body.classList.remove('drawer-is-open');
					document.body.style.overflow = '';
					this.burger.setAttribute('aria-expanded', 'false');
				}
			} else {
				if (!document.body.classList.contains('drawer-is-open')) {
					this.focusableElements.forEach(el => el.setAttribute('tabindex', '-1'));
				}
			}
		});
	}
};

export default header;
