import { writable } from 'svelte/store';

function createStore() {
    const { subscribe, set, update } = writable({
        target: null,
        data: null,
        childIndex: 0,
        isSelected: false,
    });

    // XXX : would prefer to use svelte markup, but the element are created dynamically
    function resetClass(store) {
        store.data?.dom.classList.remove('is-active');
        store.data?.dom.classList.remove('is-selected');
    }

    function addClass(store, className) {
        store.data.dom.classList.add(className);
    }

    function unselect(options = { preview: false }) {
        update(store => {
            // Don't preview other children if a child is selected
            if (options.preview && store.isSelected)
                return store;
                resetClass(store);
            return {
                target: null,
                data: null,
                childIndex: 0,
                isSelected: false,
            }
        });
    }

    function select(data, childIndex, options = { target: "book", preview: false }) {
        update(store => {
            // Don't preview other children if a child is selected
            if (options.preview && store.isSelected)
                return store;

            resetClass(store);
            store = {
                target: options.target,
                data,
                childIndex,
                isSelected: !options.preview,
            }
            addClass(store, options.preview ? 'is-active' : 'is-selected');
            return store;
        });
    }

    return {
        subscribe,
        unselect,
        select
    }
}

export const bookStore = createStore();
export const volumeStore = createStore();

export let bookcase = [
    [
        {
            tag: "Languages",
            books: [
                {
                    title: ".qsdfqsdfqsdf",
                    description: "101",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
                {
                    title: ".Javasadadajs",
                    description: "Promises",
                    volumes: [
                        { title: "101" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
        {
            tag: "Other",
            books: [
                {
                    title: "aa",
                    description: "The most popular language",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
    ],

    [
        {
            tag: "Languages",
            books: [
                {
                    title: ".qsdfqsdfqsdf",
                    description: "101",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
                {
                    title: ".Javasadadajs",
                    description: "Promises",
                    volumes: [
                        { title: "101" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
        {
            tag: "Other",
            books: [
                {
                    title: "aa",
                    description: "The most popular language",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
    ],

    [
        {
            tag: "Languages",
            books: [
                {
                    title: ".qsdfqsdfqsdf",
                    description: "101",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
                {
                    title: ".Javasadadajs",
                    description: "Promises",
                    volumes: [
                        { title: "101" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
        {
            tag: "Other",
            books: [
                {
                    title: "aa",
                    description: "The most popular language",
                    volumes: [
                        { title: "101" },
                        { title: "Promises" },
                        { title: "Everything else" },
                    ],
                },
            ],
        },
    ],
];