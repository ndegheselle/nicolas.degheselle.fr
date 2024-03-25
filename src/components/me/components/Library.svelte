<script>
    import Bookshelf from "./Bookshelf.svelte";
    import { selectedStore } from "../MeStore.js";
    import clickOutside from "@base/clickOutside.js";
    import svgDefs from "../svgs/books-defs.svg?raw";

    function canPreview(store) {
        return store.options.target == "book" && store.data;
    }

    function selectExplanation() {
        selectedStore.select(
            {
                title: knowledges.title,
                description: knowledges.description,
            },
            Array.from(
                document.querySelectorAll(
                    ".svg-bookshelf .selectable.is-background",
                ),
            ),
            {
                target: "other",
                isLocked: true,
            },
        );
    }

    export let knowledges = {};
</script>

<!-- Books elements defs -->
{@html svgDefs}

<div class="grid">
    <span class="me-tag">
        <a
            href="javascript:void(0)"
            on:click|stopPropagation={selectExplanation}
        >
            {knowledges.title}
        </a>
    </span>
</div>

<div class="grid">
    {#each knowledges.contents as bookshelf}
        <div class="col is-6 on-md-is-12">
            <Bookshelf {bookshelf} />
        </div>
    {/each}
</div>

<div
    class="selectable-display container"
    class:preview={canPreview($selectedStore)}
    class:full={canPreview($selectedStore) && $selectedStore.options.isLocked}
    use:clickOutside={() => selectedStore.unselect(true)}
>
    <div class="background">
        <svg
            class="book-volume"
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
                    class="book-border"
                    stroke-width="6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M290.966894,78.387318h-211.110484l4.483346,6.7911h214.170083"
                    transform="translate(-36.133697-46.616234)"
                    class="book-paper"
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
                    class="book-paper-line"
                    stroke-linecap="round"
                />
                <line
                    x1="-52.678107"
                    y1="0"
                    x2="297.72505"
                    y2="0"
                    transform="matrix(.406161 0 0 1 130.406384 33.166634)"
                    fill="none"
                    class="book-paper-line"
                    stroke-linecap="round"
                />
                <line
                    x1="-52.678107"
                    y1="0"
                    x2="52.678106"
                    y2="0"
                    transform="matrix(.6434 0 0 1 107.406384 35.166634)"
                    fill="none"
                    class="book-paper-line"
                    stroke-linecap="round"
                />
                <line
                    x1="-52.678107"
                    y1="0"
                    x2="52.678106"
                    y2="0"
                    transform="matrix(.6434 0 0 1 182.406384 35.166634)"
                    fill="none"
                    class="book-paper-line"
                    stroke-linecap="round"
                />
                <path
                    d="M70.953395,73.596218l9.582201,10.5822-.000001,221.617158-9.582202-10.781551.000002-221.417807Z"
                    transform="translate(-33.329533-43.719264)"
                    class="book-border"
                    stroke-width="6"
                    stroke-linejoin="round"
                />
                <rect
                    width="117.641514"
                    height="88.269958"
                    rx="0"
                    ry="0"
                    transform="matrix(1.829032 0 0 2.457457 47.206054 43.286305)"
                    class="book-cover"
                    stroke-width="5"
                    stroke-linejoin="round"
                />
            </g>
        </svg>
    </div>

    <div class="content-container">
        <div class="content">
            {#if canPreview($selectedStore)}
                <h1>{$selectedStore.data.title}</h1>
                <hr />

                <h3>
                    {$selectedStore.data.volumes[
                        $selectedStore.options.childIndex
                    ]}
                </h3>
                <p>{$selectedStore.data.description}</p>
            {/if}
        </div>
    </div>
</div>