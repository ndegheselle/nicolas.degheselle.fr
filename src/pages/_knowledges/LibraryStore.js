import { writable } from 'svelte/store';

export const activeBook = writable(null);
export const isBookSelected = writable(false);