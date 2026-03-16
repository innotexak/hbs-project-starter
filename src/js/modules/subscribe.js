import helpers from '../helpers/helpers';

const subscribeForm = {
	form: null,
	emailInput: null,

	init() {
		this.form = document.querySelector('.js-subscribe__form');
		if (!this.form) return;

		this.emailInput = this.form.querySelector('#js-subscribe-email');
		if (!this.emailInput) return;

		// Attach debounced input listener
		this.emailInput.addEventListener('input', helpers.debounce(this.handleInput.bind(this), 400));

		//prevent rapid submit
		this.form.addEventListener('submit', this.handleSubmit.bind(this));
	},

	handleInput(e) {
		const value = e.target.value.trim();

		// Input validation
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

		if (isValid) {
			this.emailInput.classList.remove('is-invalid');
			this.emailInput.classList.add('is-valid');
		} else {
			this.emailInput.classList.remove('is-valid');
			this.emailInput.classList.add('is-invalid');
		}

		console.log('Debounced input value:', value);
	},

	handleSubmit(e) {
		e.preventDefault();
		const value = this.emailInput.value.trim();

		if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
			console.log('Invalid email, not submitting');
			return;
		}

		console.log('Form submitted:', value);

		// TODO: Calling of api to process submission
	}
};

export default subscribeForm;
