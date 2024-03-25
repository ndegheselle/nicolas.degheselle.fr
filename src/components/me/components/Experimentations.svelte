<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { selectedStore } from "../MeStore.js";
    import clickOutside from "@base/clickOutside.js";
    import svg from  "../svgs/experimentations.svg?raw";
    import svgBackground from  "../svgs/experimentations-background.svg?raw";

    onMount(() => {
        const draw = SVG(svgContainer.querySelector('svg'));

        let numberOfPaper = 0;
        for (let i = 0; i < experimentations.contents.length; i++) {
            for (let j = 0; j < experimentations.contents[i].length; j++) {
                const experimentation = experimentations.contents[i][j];
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
            {
                title: experimentations.title,
                description: experimentations.description,
            },
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

    let svgContainer;
    let experimentationBackground;
    export let experimentations = {};
</script>

<div class="grid">
    <span class="me-tag">
        <a
            href="javascript:void(0)"
            on:click|stopPropagation={selectExplanation}
        >
            {experimentations.title}
        </a>
    </span>
</div>

<div bind:this={svgContainer}>
    {@html svg}
</div>



<div
    class="selectable-display container"
    class:preview={canPreview($selectedStore)}
    class:full={canPreview($selectedStore) && $selectedStore.options.isLocked}
    use:clickOutside={() => selectedStore.unselect(true)}
>
    <div class="background">
        {@html svgBackground}
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