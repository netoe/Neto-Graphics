'use strict';

// The initial state, and the state after reset.
const FLAG_INITIAL = 0;
// Resource is reset, due to the resource changed.
// This state may work the same with the FLAG_INITIAL.
// const FLAG_RESET = 5;
// Fetching target resource.
const FLAG_FETCHING = 1;
// Fetched target resource successfully.
const FLAG_FETCHED = 2;
// The recognized exceptions encountered.
const FLAG_FAILED = 3;
// The unrecognized errors.
const FLAG_ERROR = 4;
type FLAG_STATES = 0 | 1 | 2 | 3 | 4

// A 5-state(Initial|Fetching|Fetched|Failed|Error) manager.
// | Unknown(Initial|Fetching) | Fetched( with Data) | Failed( with Exception) | (Conditions Handled Externally) | (Unrecognized) Error |
// 'Error' basically means the unrecognized exceptions.
// FIX-ME The Failed | Error can still be divided into some categories if needed, like 4xx, 5xx. ==>> The answer is use #CustomizableFetcherManager.
// In lots of cases, it will meet the requirements.
export class ExtendedFetcherManager<T, V = Error> {
	private mState: FLAG_STATES;
	private mValue?: T;
	private mError?: V;

	constructor() {
		// The state of current fetcher.
		this.mState = FLAG_INITIAL;
		// The instance of fetched data or encountered exception.
		this.mValue = undefined;
	}

	/* STATE: FLAG_INITIAL With Nothing */

	// Reset to the initial state.
	reset = () => {
		this.mState = FLAG_INITIAL;
	};

	isInitialState = (): boolean => {
		return this.mState === FLAG_INITIAL || (!this.isFetching() && !this.isFetched() && !this.isFailed());
	};

	/* STATE: FLAG_FETCHING With Nothing */

	startFetching = () => {
		this.mState = FLAG_FETCHING;
	};

	isFetching = (): boolean => {
		return this.mState === FLAG_FETCHING;
	};

	/* Combined STATE of FLAG_INITIAL and FLAG_FETCHING With Nothing*/

	isUnknown = (): boolean => {
		return this.isInitialState() || this.isFetching();
	};

	/* STATE: FLAG_FETCHED With Data */

	fetched = (data: T) => {
		this.mState = FLAG_FETCHED;
		this.mValue = data;
	};

	isFetched = (): boolean => {
		return this.mState === FLAG_FETCHED;
	};

	getData = (): T | undefined => {
		if (this.isFetched()) {return this.mValue;}
		return undefined;
	};

	/* STATE: FLAG_FAILED With Exception */

	failedToFetch = (ex: V) => {
		this.mState = FLAG_FAILED;
		this.mError = ex;
	};

	isFailed = (): boolean => {
		return this.mState === FLAG_FAILED;
	};

	getException = (): V | undefined => {
		if (this.isFailed()) {return this.mError;}
		return undefined;
	};

	/* STATE: FLAG_ERROR With Error */

	errorEncountered = (err: V) => {
		this.mState = FLAG_ERROR;
		this.mError = err;
	};

	isError = (): boolean => {
		return this.mState === FLAG_ERROR;
	};

	getError = (): V | undefined => {
		if (this.isError()) {return this.mError;}
		return undefined;
	};
}
