// ----------  footer
// ------------------------------------------------------------------------------

const footer = {
	backToTopBtn: null,

	scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	},

	init() {
		this.backToTopBtn = document.querySelector('.footer__back-to-top');
		if (!this.backToTopBtn) return;

		this.backToTopBtn.addEventListener('click', () => this.scrollToTop());
	}
};

export default footer;
