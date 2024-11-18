import { defineStore } from 'pinia';
export const useAppStore = defineStore('counter', {
	state: () => ({ count: 0, name: 'Logica' }),
	getters: {},
	actions: {}
});
