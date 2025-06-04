<script>
    import clickOutside from "@base/clickOutside.js";
    import { useTranslations } from "@i18n/utils";
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { selectedStore } from "../store.js";
    import svgBackground from "../svgs/experimentations-background.svg?raw";
    import svg from "../svgs/experimentations.svg?raw";

    onMount(() => {
        const draw = SVG(svgContainer.querySelector("svg"));

        let grouped = experimentations.reduce(function (groups, item) {
            (groups[item.data.group] = groups[item.data.group] || []).push(item);
            return groups;
        }, {});

        let numberOfPaper = 0;
        let numberOfGroup = 0;
        for (const group in grouped) {
            for (const experimentation of grouped[group]) {
                const paperGroup = draw
                    .group()
                    .translate(
                        (numberOfPaper * PAPER_SPACING +
                            EXTERIOR_SPACING / 2 +
                            numberOfGroup * CATEGORIES_SPACING) %
                            MAX_WIDTH,
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
                    .data("search", experimentation.data.title);

                paperGroup
                    .text(experimentation.data.title)
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
            numberOfGroup++;
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
                title: t("experiments.title"),
                description: t("experiments.description"),
            },
            Array.from(
                document.querySelectorAll(
                    ".svg-experimentations-board .selectable.is-background",
                ),
            ),
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
    const MAX_WIDTH = PAPER_PER_ROW * PAPER_WIDTH - 10;

    let svgContainer;
    export let experimentations = [];
    export let lang = "";
    const t = useTranslations(lang);
</script>

<div class="grid">
    <span class="tag">
        <a
            href="javascript:void(0)"
            on:click|stopPropagation={selectExplanation}
        >
        {t("experiments.title")}
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
                <h1>{$selectedStore.data.data.title}</h1>
                <hr />
                {@html $selectedStore.data.rendered.html}
            {/if}
        </div>
    </div>
</div>
