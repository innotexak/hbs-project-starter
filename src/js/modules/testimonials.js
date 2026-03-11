// ----------  testimonials
// ------------------------------------------------------------------------------

const testimonials = {
	slider: null,
	track: null,
	slides: null,
	prevBtn: null,
	nextBtn: null,
	currentIndex: 0,
	visibleCount: 1,

	getVisibleCount() {
		if (window.innerWidth >= 1024) return 3;
		if (window.innerWidth >= 768) return 2;
		return 1;
	},

	getMaxIndex() {
		return Math.max(0, this.slides.length - this.visibleCount);
	},

	getGap() {
		// match the gap in scss
		if (window.innerWidth >= 1024) return 14;
		return 20;
	},

	updateSlider() {
		this.visibleCount = this.getVisibleCount();
		this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex());

		const slideWidth = this.slides[0].offsetWidth + this.getGap();
		this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;

		// update button states
		this.prevBtn.disabled = this.currentIndex === 0;
		this.nextBtn.disabled = this.currentIndex >= this.getMaxIndex();

		// update aria
		this.slides.forEach((slide, i) => {
			const isVisible = i >= this.currentIndex && i < this.currentIndex + this.visibleCount;
			slide.setAttribute('aria-hidden', String(!isVisible));
		});
	},

	init() {
		this.slider = document.querySelector('.testimonials__slider');
		this.track = document.querySelector('.testimonials__track');
		this.slides = Array.from(document.querySelectorAll('.testimonials__slide'));
		this.prevBtn = document.querySelector('.testimonials__arrow--prev');
		this.nextBtn = document.querySelector('.testimonials__arrow--next');

		if (!this.track || !this.slides.length || !this.prevBtn || !this.nextBtn) return;

		// prev
		this.prevBtn.addEventListener('click', () => {
			if (this.currentIndex > 0) {
				this.currentIndex--;
				this.updateSlider();
			}
		});

		// next
		this.nextBtn.addEventListener('click', () => {
			if (this.currentIndex < this.getMaxIndex()) {
				this.currentIndex++;
				this.updateSlider();
			}
		});

		// keyboard support
		this.prevBtn.addEventListener('keydown', e => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.prevBtn.click();
			}
		});

		this.nextBtn.addEventListener('keydown', e => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.nextBtn.click();
			}
		});

		// recalculate on resize
		let resizeTimer;
		window.addEventListener('resize', () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				this.updateSlider();
			}, 100);
		});

		// initial state
		this.updateSlider();
	}
};

export default testimonials;
