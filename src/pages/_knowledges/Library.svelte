<script>
    import Bookshelf from "./Bookshelf.svelte";

    let bookcase = [
        [
            {
                tag: "Languages",
                books: [
                    {
                        title: "Javascript",
                        description: "101",
                        volumes: ["101", "Promises", "Everything else"],
                    },
                    {
                        title: "Javascript",
                        description: "Promises",
                        volumes: ["101"],
                    },
                ],
            },
            {
                tag: "Other",
                books: [
                    {
                        title: "aa",
                        description: "The most popular language",
                        volumes: ["101", "Promises", "Everything else"],
                    },
                ],
            },
        ],
    ];

</script>

<svg display="none"
    viewBox="0 0 20 100">

    <style>
        .color-1 {
            fill: #555;
        }

        .color-2 {
            fill: #777;
        }

        .color-3 {
            fill: #ddd;
        }
        .color-background {
            fill: var(--color-bg);
        }
    </style>

    <defs>
        <g id="book-top" >
            <rect width="20" height="26" class="color-2" rx="4"/>
            <rect width="14" height="22" x="3" class="color-3" />
            <rect width="14" height="3" x="3" y="-1" class="color-background" />
        </g>

        <g id="book-1" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4"/>
                <rect width="10" height="60" x="5" y="10" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22" />
        </g>

        <g id="book-2" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4"/>
                <rect width="16" height="10" x="2" y="10" class="color-2" />
                <rect width="16" height="10" x="2" y="60" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22"/>
        </g>

        <g id="book-3" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4"/>
                <rect width="12" height="10" x="4" y="15" class="color-2" />
                <rect width="12" height="10" x="4" y="30" class="color-2" />
                <rect width="12" height="10" x="4" y="45" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22"/>
        </g>

        <g id="book-4" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4"/>
                <rect width="4" height="45" x="5" y="12" class="color-2" />
                <rect width="4" height="35" x="10" y="22" class="color-2" />
                <rect width="12" height="10" x="4" y="60" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22"/>
        </g>
    </defs>

    <use href="#book-2" />
</svg>

{#each bookcase as bookshelf}
    <div>
        <Bookshelf {bookshelf} />
    </div>
{/each}

<style>
    :global(.book-group-selection) {
        stroke-width: 1;
        stroke-dasharray: 5;
        fill: none;
    }
    :global(.book-group.is-active .book-group-selection) {
        stroke: red;
    }
    .book .top {
        transition: 0.3s;
        transform: scaleY(0);
    }
    .book {
        transition: 0.3s;
    }


    .book:hover .top {
        transform: scaleY(1);
    }
    .book:hover {
        transform: translateY(10px);
    }

</style>