import globalVars from '../../helpers/globalVars.mjs';

export default {
	ifEquals: function(arg1, arg2, options) {
		return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
	},

	ifContains: function(arg1, ...args) {
		for (let i = 0; i < (args.length - 1); i++) {
			if (arg1 === args[i]) {
				return args[args.length - 1].fn(this);
			}
		}
		return args[args.length - 1].inverse(this);
	},

	compare: function(v1, operator, v2) {
		switch (operator) {
			case '==': return v1 === v2;
			case '===': return v1 === v2;
			case '!=': return v1 !== v2;
			case '!==': return v1 !== v2;
			case '<': return v1 < v2;
			case '<=': return v1 <= v2;
			case '>': return v1 > v2;
			case '>=': return v1 >= v2;
			case '&&': return v1 && v2;
			case '||': return v1 || v2;
			default: throw new Error('helper {{compare}}: invalid operator ' + operator);
		}
	},

	ifAny: function(...args) {
		for (let i = 0; i < (args.length - 1); i++) {
			if (args[i]) {
				return args[args.length - 1].fn(this);
			}
		}
		return args[args.length - 1].inverse(this);
	},

	isProduction: function() {
		return globalVars.mode === 'production';
	},

	isDevelopment: function() {
		return globalVars.mode === 'development';
	},

	getPath: function() {
		return globalVars.isMultilanguage ? globalVars.path : '';
	},

	isMultilanguage: function() {
		return globalVars.isMultilanguage;
	},

	increment: function(index) {
		return (parseInt(index) || 0) + 1;
	},

	//Added more helper functions
	greaterThan: function(a, b, options) {
		return a > b ? options.fn(this) : options.inverse(this);
	},

	formatCurrency: function(value, currencyCode, locale) {
		if (typeof value !== 'number') return value;

		if (typeof currencyCode === 'object') {
			currencyCode = 'NGN';
			locale = 'en-NG';
		}

		if (typeof locale === 'object') {
			locale = 'en-NG';
		}

		return new Intl.NumberFormat(locale || 'en-NG', {
			style: 'currency',
			currency: currencyCode || 'NGN'
		}).format(value);
	},

	truncate: function(text, length) {
		if (!text) return '';
		return text.length > length
			? text.substring(0, length) + '...'
			: text;
	},

	formatParagraphs: function(text) {
		if (!text || typeof text !== 'string') return text;
		const escapedText = text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#x27;');
		const withBreaks = escapedText.replace(/\n/g, '<br>');
		return withBreaks;
	},
};
