<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { isBookSelected, activeBook } from "./LibraryStore.js";

    function bookSelected(book, volume) {
        $isBookSelected = true;
        $activeBook = book;
    }
    function bookEntered(book) {
        if (!$isBookSelected) $activeBook = book;
    }
    function bookLeave() {
        if (!$isBookSelected) $activeBook = null;
    }

    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    onMount(() => {
        draw = SVG(svg)
            .size("100%", "100%")
            .viewbox(0, 0, BOOKSHELF_WIDTH, BOOKSHELF_HEIGHT);

        draw.rect(BOOKSHELF_WIDTH, SUPPORT_SIZE).addClass("color-back");
        draw.rect(BOOKSHELF_WIDTH, SUPPORT_SIZE)
            .move(0, BOOKSHELF_HEIGHT - SUPPORT_SIZE)
            .addClass("color-back");

        // Last vertical support
        draw.rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
            .move(BOOKSHELF_WIDTH - SUPPORT_SIZE * 2, 0)
            .addClass("color-back-low");

        createCols(draw);
    });

    function createCols(parent) {
        const colWidth = BOOKSHELF_WIDTH / bookshelf.length;

        for (let i = 0; i < bookshelf.length; i++) {
            const col = bookshelf[i];
            const colGroup = parent.group().translate(i * colWidth, 0);
            colGroup
                .text(col.tag)
                .x(colWidth / 2)
                .y(8)
                .attr("text-anchor", "middle")
                .addClass("text-title");

            // Horizontal supports
            colGroup
                .rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
                .move(SUPPORT_SIZE, 0)
                .addClass("color-back-low");

            createBooks(col, colGroup);
        }
    }

    function createBooks(col, parent) {
        let currentBookNumber = 0;

        for (let i = 0; i < col.books.length; i++) {
            const book = col.books[i];
            const bookGroup = parent
                .group()
                .translate(
                    BOOK_WIDTH * currentBookNumber + BOOK_GROUP_SPACING * i,
                    0,
                )
                .addClass("book-group");
            bookGroup
                .rect(
                    BOOK_WIDTH * book.volumes.length,
                    BOOK_HEIGHT + BOOK_RANDOM_HEIGHT,
                )
                .radius(4)
                .move(
                    SUPPORT_SIZE * 2,
                    BOOKSHELF_HEIGHT -
                        BOOK_HEIGHT -
                        BOOK_RANDOM_HEIGHT -
                        SUPPORT_SIZE,
                )
                .addClass("book-group-selection");
            bookGroup
                .text(book.title)
                .x(BOOK_WIDTH * book.volumes.length / 2 + SUPPORT_SIZE * 2)
                .y(42)
                .attr("text-anchor", "middle")
                .addClass("text-subtitle");

            book.volumes.forEach((volume, j) => {
                // Random number between 0.8 and 1.2
                const randHeight = Math.random() * 0.2 + 0.9;
                const randBook = randomIntFromInterval(1, 4);

                let bookVisual = bookGroup
                    .use("book-" + randBook)
                    .addClass("book-container")
                    .move(
                        BOOK_WIDTH * j + SUPPORT_SIZE * 2,
                        BOOKSHELF_HEIGHT - BOOK_HEIGHT - SUPPORT_SIZE,
                    )
                    .scale(1, randHeight, 0, BOOKSHELF_HEIGHT - SUPPORT_SIZE);

                bookVisual
                    .on("mouseenter", () => {
                        bookGroup.addClass("is-active");
                        bookVisual.addClass("is-active");
                        bookEntered(book);
                    })
                    .on("mouseleave", () => {
                        bookGroup.removeClass("is-active");
                        bookVisual.removeClass("is-active");
                        bookLeave();
                    })
                    .click((e) => {
                        bookGroup.addClass("is-selected");
                        bookVisual.addClass("is-selected");

                        e.stopPropagation();
                        bookSelected(book, volume);
                    });
            });

            currentBookNumber += book.volumes.length;
        }
    }

    const BOOKSHELF_WIDTH = 500;
    const BOOKSHELF_HEIGHT = 180;
    const SUPPORT_SIZE = 8;

    const BOOK_WIDTH = 20;
    const BOOK_HEIGHT = 100;
    const BOOK_RANDOM_HEIGHT = 10;
    const BOOK_GROUP_SPACING = 2;

    let draw;
    let svg;
    export let bookshelf = [];
</script>

<svg bind:this={svg}>
    <use xlink:href="#bookshelf-defs" />
</svg>
