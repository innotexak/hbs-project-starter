
const initAnimateOnScroll = () => {
	const elements = document.querySelectorAll('[data-animate]');
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15 });

	elements.forEach((el, index) => {
		el.style.setProperty('--animate-index', index);
		observer.observe(el);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	initAnimateOnScroll();
});
