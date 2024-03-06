<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { selectedStore } from "./MeStore.js";

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onMount(() => {
        const draw = SVG(svg);

        for (let i = 0; i < experimentations.length; i++) {
            const experimentation = experimentations[i];
            const random = randomIntFromInterval(
                -PAPER_SPACING_RAND,
                PAPER_SPACING_RAND,
            );

            const paper = draw
                .use("experimentation-paper")
                .move(
                    i * PAPER_SPACING + random + EXTERIOR_SPACING,
                    ROW_HEIGHT * Math.floor(i / PAPER_PER_ROW) +
                        random +
                        EXTERIOR_SPACING,
                )
                .rotate(
                    randomIntFromInterval(
                        -PAPER_ROTATION_RAND,
                        PAPER_ROTATION_RAND,
                    ),
                )
                .addClass("selectable");

            paper
                .on("mouseenter", () => {
                    selectedStore.select(
                        experimentation,
                        [paper.node],
                        { target: "other"},
                    );
                })
                .on("mouseleave", () => {
                    selectedStore.unselect();
                })
                .click((e) => {
                    e.stopPropagation();
                    selectedStore.select(
                        experimentation,
                        [paper.node],
                        {
                            target: "other",
                            isLocked: true,
                        },
                    );
                });
        }
    });

    const EXTERIOR_SPACING = 10;
    const PAPER_PER_ROW = 10;
    const ROW_HEIGHT = 30;

    const PAPER_SPACING = 15;
    const PAPER_SPACING_RAND = 2;
    const PAPER_ROTATION_RAND = 10;

    let svg;
    let experimentations = [
        {
            title: "Paper",
            description: "A paper with a folded corner",
        },
        {
            title: "Paper",
            description: "A paper with a folded corner",
        },
        {
            title: "Paper",
            description: "A paper with a folded corner",
        },
        {
            title: "Paper",
            description: "A paper with a folded corner",
        },
    ];
</script>

<svg bind:this={svg} width="100%" height="100%" viewBox="0 0 200 100">
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

    <rect
        x="0"
        y="0"
        width="200"
        height="100"
        rx="2"
        fill="var(--color-back)"
    />
    <rect x="2" y="2" width="196" height="96" fill="var(--color-back-low)" />
</svg>

<style>
    .pin {
        fill: var(--color-medium);
    }

    .text, .folded-corner, .paper {
        transition: 0.3s;
    }

    .text,
    .folded-corner {
        fill: var(--color-front);
    }

    .paper {
        fill: var(--color-front-low);
    }
</style>
