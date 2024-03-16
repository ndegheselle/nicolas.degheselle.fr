import { writable } from 'svelte/store';

function createStore() {
    const { subscribe, set, update } = writable({
        data: null,
        options: {
            target: null,
            childIndex: 0,
            isLocked: false,
        }
    });

    // XXX : would prefer to use svelte markup, but the element are created dynamically
    function resetClass(className) {
        for (let dom of document.querySelectorAll(`svg .${className}`) || [])
        {
            dom.classList.remove(className);
        }
    }

    function addClass(doms, className) {
        for (let dom of doms || [])
        {
            dom.classList.add(className);
        }
    }

    function unselect(force = false) {

        resetClass('is-active');
        if (force)
            resetClass('is-selected');

        update(store => {
            // Don't preview other children if a child is selected
            if (!force && store.options.isLocked)
                return store;
            return {
                data: null,
                options: {
                    target: null,
                    childIndex: 0,
                    isLocked: false,
                }
            }
        });
    }

    function select(data, doms, options = { childIndex: -1, target: "book", isLocked: true }) {
        resetClass('is-active');
        if (options.isLocked)
            resetClass('is-selected');

        addClass(doms, 'is-active');
        if (options.isLocked)
            addClass(doms, 'is-selected');

        update(store => {
            // Don't preview other children if a child is selected
            if (!options.isLocked && store.options.isLocked)
                return store;
            return {
                data,
                options
            }
        });
    }

    return {
        subscribe,
        unselect,
        select
    }
}

export const selectedStore = createStore();