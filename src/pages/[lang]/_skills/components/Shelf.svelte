<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { selectedStore } from "../store.js";

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onMount(() => {
        draw = SVG(svg)
            .size("100%", "100%")
            .viewbox(0, 0, BOOKSHELF_WIDTH, BOOKSHELF_HEIGHT);

        draw.rect(BOOKSHELF_WIDTH, SUPPORT_SIZE)
            .addClass("color-back")
            .addClass("selectable is-background");
        draw.rect(BOOKSHELF_WIDTH, SUPPORT_SIZE)
            .move(0, BOOKSHELF_HEIGHT - SUPPORT_SIZE)
            .addClass("color-back")
            .addClass("selectable is-background");

        // Last vertical support
        draw.rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
            .move(BOOKSHELF_WIDTH - SUPPORT_SIZE - SUPPORT_SPACING, 0)
            .addClass("color-back-low")
            .addClass("selectable is-background");

        createShelf(draw);
    });

    function createShelf(parent) {
        // Sum of bookshelf books
        let totalNumberOfVolumes = 0;
        for (const group of bookshelf) {
            totalNumberOfVolumes += group.reduce(
                (acc, book) => acc + (book.data.level || 1),
                0,
            );
        }

        let offsetX = 0;
        for (const group of bookshelf) {
            const numberOfVolumes = group.reduce(
                (acc, book) => acc + (book.data.level || 1),
                0,
            );
            const groupElement = parent.group().translate(offsetX, 0);

            // Horizontal supports
            groupElement
                .rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
                .move(SUPPORT_SPACING, 0)
                .addClass("color-back-low")
                .addClass("selectable is-background");

            createBooks(group, groupElement);
            offsetX += numberOfVolumes / totalNumberOfVolumes * (BOOKSHELF_WIDTH - SUPPORT_SIZE - SUPPORT_SPACING);
        }
    }

    function createBooks(group, parent) {
        let currentBookNumber = 0;

        for (let i = 0; i < group.length; i++) {
            const book = group[i];
            const bookGroup = parent
                .group()
                .translate(
                    BOOK_WIDTH * currentBookNumber + BOOK_GROUP_SPACING * i,
                    0,
                )
                .addClass("book-group")
                .addClass("selectable")
                .data("search", book.data.title);

            for (
                let volumeIndex = 0;
                volumeIndex < (book.data.level || 1);
                volumeIndex++
            ) {
                const randHeight =
                    Math.random() *
                        (BOOK_RANDOM_HEIGHT_MAX - BOOK_RANDOM_HEIGHT_MIN) +
                    BOOK_RANDOM_HEIGHT_MIN;
                const randBook = randomIntFromInterval(1, 4);

                const volumeVisual = bookGroup
                    .use("book-" + randBook)
                    .addClass("book-volume")
                    .addClass("selectable")
                    .move(
                        BOOK_WIDTH * volumeIndex + SUPPORT_SIZE + SUPPORT_SPACING,
                        BOOKSHELF_HEIGHT - BOOK_HEIGHT - SUPPORT_SIZE,
                    )
                    .scale(1, randHeight, 0, BOOKSHELF_HEIGHT - SUPPORT_SIZE);

                volumeVisual
                    .on("mouseenter", () => {
                        selectedStore.select(
                            book,
                            [bookGroup.node, volumeVisual.node],
                            { target: "book" },
                        );
                    })
                    .on("mouseleave", () => {
                        selectedStore.unselect();
                    })
                    .click((e) => {
                        e.stopPropagation();
                        selectedStore.select(
                            book,
                            [bookGroup.node, volumeVisual.node],
                            {
                                target: "book",
                                isLocked: true,
                            },
                        );
                    });
            }

            bookGroup
                .text(book.data.title)
                .move(
                    (BOOK_WIDTH * ((book.data.level || 1) + 1)) / 2,
                    (i % 2) * 15,
                )
                .font({
                    anchor: "middle",
                })
                .addClass("search-text");

            currentBookNumber += (book.data.level || 1);
        }
    }

    const BOOKSHELF_WIDTH = 500;
    const BOOKSHELF_HEIGHT = 120;
    const SUPPORT_SIZE = 8;
    const SUPPORT_SPACING = 4;

    const BOOK_WIDTH = 18;
    const BOOK_HEIGHT = 100;
    const BOOK_RANDOM_HEIGHT_MAX = 1.1;
    const BOOK_RANDOM_HEIGHT_MIN = 0.9;
    const BOOK_GROUP_SPACING = 2;

    let draw;
    let svg;
    export let bookshelf = [];
</script>

<svg bind:this={svg} class="svg-bookshelf">
    <use xlink:href="#bookshelf-defs" />
</svg>
