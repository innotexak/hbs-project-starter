// // ----------  testimonials
// // ------------------------------------------------------------------------------

import slider from './slider.js';

const testimonials = {
	init() {
		const section = document.querySelector('.testimonials');

		if (section) {

			slider.init();
		}
	}
};

export default testimonials;
