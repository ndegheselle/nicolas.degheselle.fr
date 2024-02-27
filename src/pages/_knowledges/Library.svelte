<script>
    import Bookshelf from "./Bookshelf.svelte";
    
    function clickOutside(element, callbackFunction) {
		function onClick(event) {
			if (!element.contains(event.target)) {
				callbackFunction();
			}
		}
		
		document.body.addEventListener('click', onClick);
		
		return {
			update(newCallbackFunction) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		}
	}
    
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

    let activeBook = null;
    let selectedBook = null;
</script>

<svg display="none" viewBox="0 0 20 100">
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
        <g id="book-top">
            <rect width="20" height="26" class="color-2" rx="4" />
            <rect width="14" height="22" x="3" class="color-3" />
            <rect width="14" height="3" x="3" y="-1" class="color-background" />
        </g>

        <g id="book-1" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4" />
                <rect width="10" height="60" x="5" y="10" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22" />
        </g>

        <g id="book-2" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4" />
                <rect width="16" height="10" x="2" y="10" class="color-2" />
                <rect width="16" height="10" x="2" y="60" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22" />
        </g>

        <g id="book-3" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4" />
                <rect width="12" height="10" x="4" y="15" class="color-2" />
                <rect width="12" height="10" x="4" y="30" class="color-2" />
                <rect width="12" height="10" x="4" y="45" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22" />
        </g>

        <g id="book-4" class="book">
            <g class="front" transform="translate(0,20)">
                <rect width="20" height="80" class="color-1" rx="4" />
                <rect width="4" height="45" x="5" y="12" class="color-2" />
                <rect width="4" height="35" x="10" y="22" class="color-2" />
                <rect width="12" height="10" x="4" y="60" class="color-2" />
            </g>
            <use href="#book-top" class="top" transform-origin="10 22" />
        </g>
    </defs>

    <use href="#book-2" />
</svg>

{#each bookcase as bookshelf}
    <div>
        <Bookshelf {bookshelf} on:bookSelected={(book)=> selectedBook = book} on:bookEntered={(book)=> activeBook = book} on:bookLeave={() => activeBook = null}/>
    </div>
{/each}

<div class="book-display" class:preview={activeBook} class:full={selectedBook} use:clickOutside={() => selectedBook = null}>
    <svg
        id="eCWPjVlUpTk1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 300 300"
        shape-rendering="geometricPrecision"
        text-rendering="geometricPrecision"
        width="100%"
        height="100%"
    >
        <g transform="matrix(1.290925 0 0 1.340198-44.663762-35.898366)">
            <path
                d="M285.966894,73.596218h-215.209339l9.582201,9.5822"
                transform="translate(-33.133697-43.719263)"
                fill="none"
                stroke="#4a4a4a"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M290.966894,78.387318h-211.110484l4.483346,6.7911h214.170083"
                transform="translate(-36.133697-46.616234)"
                fill="#ccc"
                stroke-width="6"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <line
                x1="-52.678107"
                y1="0"
                x2="52.678106"
                y2="0"
                transform="matrix(.519737 0 0 1 76.406384 33.166634)"
                fill="none"
                stroke="#b3b3b3"
                stroke-linecap="round"
            />
            <line
                x1="-52.678107"
                y1="0"
                x2="297.72505"
                y2="0"
                transform="matrix(.406161 0 0 1 130.406384 33.166634)"
                fill="none"
                stroke="#b3b3b3"
                stroke-linecap="round"
            />
            <line
                x1="-52.678107"
                y1="0"
                x2="52.678106"
                y2="0"
                transform="matrix(.6434 0 0 1 107.406384 35.166634)"
                fill="none"
                stroke="#b3b3b3"
                stroke-linecap="round"
            />
            <line
                x1="-52.678107"
                y1="0"
                x2="52.678106"
                y2="0"
                transform="matrix(.6434 0 0 1 182.406384 35.166634)"
                fill="none"
                stroke="#b3b3b3"
                stroke-linecap="round"
            />
            <path
                d="M70.953395,73.596218l9.582201,10.5822-.000001,221.617158-9.582202-10.781551.000002-221.417807Z"
                transform="translate(-33.329533-43.719264)"
                fill="#4a4a4a"
                stroke="#4a4a4a"
                stroke-width="6"
                stroke-linejoin="round"
            />
            <rect
                width="117.641514"
                height="88.269958"
                rx="0"
                ry="0"
                transform="matrix(1.829032 0 0 2.457457 47.206054 43.286305)"
                fill="#717171"
                stroke="#717171"
                stroke-width="5"
                stroke-linejoin="round"
            />
        </g>
    </svg>
</div>

<style>
    :global(.book-group-selection) {
        stroke-width: 3;
        stroke-dasharray: 5;
        fill: none;
        transition: 0.3s;
        stroke: var(--color-bg-dark);
        opacity: 0;
    }
    :global(.book-group.is-active .book-group-selection) {
        opacity: 1;
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
        transform: translateY(8px);
    }

    .book-display {        
        position: fixed;
        bottom: -80rem;
        width: 70vw;
        transition: 0.3s;
    }

    .book-display.preview {
        bottom: -60rem;
    }

    .book-display.full {
        bottom: -40rem;
    }
</style>
