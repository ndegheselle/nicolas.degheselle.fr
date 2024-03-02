import { writable } from 'svelte/store';

export const activeBook = writable(null);
export const isBookSelected = writable(false);

// set active
// set previous as inactive
// get element and set classes