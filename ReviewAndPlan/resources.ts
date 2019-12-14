'use strict';

export const R = {
	title: 'Reviewing and Planning',
	btnCommit: 'Submit',

};

const reviews = {
	id: 'reviews',
	label: 'Reviews',
	autoFocus: true,
};
const plans = {
	id: 'plans',
	label: 'Plans',
	autoFocus: false,
};

// Resource > Forms > Fields
export const RFF = {
	reviews,
	plans,
	fields: [
		reviews,
		plans,
	],
};
