<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { selectedStore } from "../MeStore.js";
    import clickOutside from "@components/clickOutside.js";

    onMount(() => {
        const draw = SVG(svg);

        let numberOfPaper = 0;
        for (let i = 0; i < experimentations.length; i++) {
            for (let j = 0; j < experimentations[i].length; j++) {
                const experimentation = experimentations[i][j];
                const paperGroup = draw
                    .group()
                    .translate(
                        numberOfPaper * PAPER_SPACING + EXTERIOR_SPACING /2 + i * CATEGORIES_SPACING,
                        ROW_HEIGHT * Math.floor(numberOfPaper / PAPER_PER_ROW) +
                            EXTERIOR_SPACING,
                    );

                const paper = paperGroup
                    .use("experimentation-paper")
                    .rotate(
                        randomIntFromInterval(
                            -PAPER_ROTATION_RAND,
                            PAPER_ROTATION_RAND,
                        ),
                    )
                    .addClass("selectable")
                    .addClass("experimentation-result")
                    .data("search", experimentation.title);

                paperGroup
                    .text(experimentation.title)
                    .move(PAPER_WIDTH / 2, -20 + (numberOfPaper % 2) * 5)
                    .font({
                        anchor: "middle",
                        size: 7,
                    })
                    .addClass("search-text");

                paper
                    .on("mouseenter", () => {
                        selectedStore.select(experimentation, [paper.node], {
                            target: "experimentation",
                        });
                    })
                    .on("mouseleave", () => {
                        selectedStore.unselect();
                    })
                    .click((e) => {
                        e.stopPropagation();
                        selectedStore.select(experimentation, [paper.node], {
                            target: "experimentation",
                            isLocked: true,
                        });
                    });

                numberOfPaper++;
            }
        }
    });

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function canPreview(store) {
        return store?.options?.target === "experimentation" && store.data;
    }

    function selectExplanation() {
        selectedStore.select(
            experimentationExplanation,
            [experimentationBackground],
            {
                target: "other",
                isLocked: true,
            },
        );
    }

    const EXTERIOR_SPACING = 14;
    const PAPER_PER_ROW = 10;
    const ROW_HEIGHT = 30;

    const PAPER_SPACING = 16;
    const CATEGORIES_SPACING = 10;
    const PAPER_ROTATION_RAND = 10;
    const PAPER_WIDTH = 20;

    let svg;
    let experimentationBackground;
    let experimentationExplanation = {
        title: "Paper",
        description: "A paper with a folded corner",
    };

    export let experimentations = [];
</script>

<div class="grid">
    <span class="me-tag">
        <a
            href="javascript:void(0)"
            on:click|stopPropagation={selectExplanation}
        >
            Some experimentation
        </a>
    </span>
</div>

<svg bind:this={svg} width="100%" viewBox="0 0 200 100">
    <defs>
        <g id="experimentation-paper">
            <path
                d="M0.000001,0.000002v29.999998l16.069199.000002l3.930799-4.126439L20,0L0.000001,0.000002Z"
                transform="translate(.000002 0)"
                class="paper"
                stroke-width="0.5"
            />
            <g transform="matrix(.1 0 0 0.1 0.000003 0.000002)">
                <path
                    d="M160.69199,258.73561h39.30801L160.69199,300v-41.26439Z"
                    stroke-width="0.6"
                    class="folded-corner"
                />
                <rect
                    width="82.298009"
                    height="7.481792"
                    rx="0"
                    ry="0"
                    transform="matrix(1.699072 0 0 2.203058 15.071623 19.548583)"
                    class="text"
                    stroke-width="0"
                />
                <rect
                    width="82.298009"
                    height="7.481792"
                    rx="0"
                    ry="0"
                    transform="matrix(1.063923 0 0 11.884109 15.071623 52.382558)"
                    class="text"
                    stroke-width="0"
                />
                <g transform="matrix(1.17728 0 0 1.882846-11.984083-75.63271)">
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.467395 0 0 0.666666 22.98154 168.007599)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.673314 0 0 0.666666 22.98154 157.685153)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.784451 0 0 0.666666 22.981539 147.362706)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.606756 0 0 0.666666 22.98154 137.04026)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.673315 0 0 0.666666 22.98154 127.004545)"
                        class="text"
                        stroke-width="0"
                    />
                </g>
                <g
                    transform="matrix(.544418 0 0 1.873338 97.512703-184.160926)"
                >
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.467395 0 0 0.666666 22.98154 168.007599)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.673314 0 0 0.666666 22.98154 157.685153)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.784451 0 0 0.666666 22.981539 147.362706)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.606756 0 0 0.666666 22.98154 137.04026)"
                        class="text"
                        stroke-width="0"
                    />
                    <rect
                        width="82.298009"
                        height="7.481792"
                        rx="0"
                        ry="0"
                        transform="matrix(1.673315 0 0 0.666666 22.98154 127.004545)"
                        class="text"
                        stroke-width="0"
                    />
                </g>
            </g>
            <ellipse
                rx="0.694539"
                ry="0.694539"
                transform="translate(10.307889 2.105506)"
                class="pin"
            />
        </g>
    </defs>

    <g>
        <rect
            class="selectable is-background"
            bind:this={experimentationBackground}
            x="0"
            y="0"
            width="200"
            height="100"
            rx="2"
            fill="var(--color-back)"
        />
        <rect
            x="2"
            y="2"
            width="196"
            height="96"
            fill="var(--color-back-low)"
        />
    </g>
</svg>

<div
    class="selectable-display container"
    class:preview={canPreview($selectedStore)}
    class:full={canPreview($selectedStore) && $selectedStore.options.isLocked}
    use:clickOutside={() => selectedStore.unselect(true)}
>
    <div class="background">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 300 300"
        >
            <path
                d="M50.858369,0L0,17.51073L-0.000001,300h300v-300h-249.14163Z"
                transform="translate(.000001 0)"
                class="paper"
                stroke-width="0.6"
            />
            <path
                d="M17.85422,30.16041L0.000001,17.51073L50.85837,0L17.85422,30.16041Z"
                transform="translate(.000002 0)"
                class="folded-corner"
                stroke-width="0.6"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 40.301078)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 60.036141)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 79.898247)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 99.963028)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 120.464549)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 140.352379)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 160.048981)"
                class="folded-corner"
                stroke-width="0"
            />
            <ellipse
                rx="3.558748"
                ry="3.558748"
                transform="translate(10.459187 180.005756)"
                class="folded-corner"
                stroke-width="0"
            />
        </svg>
    </div>

    <div class="content-container">
        <div class="content">

            {#if canPreview($selectedStore)}
            <h1>{$selectedStore.data.title}</h1>
            <hr />
            <p>{$selectedStore.data.description}</p>
        {/if}
        </div>
    </div>
</div>

<style>
    .pin {
        fill: var(--color-back-low);
    }

    .text,
    .folded-corner,
    .paper {
        transition: 0.3s;
    }

    .text,
    .folded-corner {
        fill: var(--color-front);
    }

    .paper {
        fill: var(--color-front-low);
    }

    :global(.experimentation-result) {
        transition: 0.3s;
    }

    :global(.experimentation-result.is-selected) {
        opacity: 0;
        pointer-events: none;
    }
</style>
