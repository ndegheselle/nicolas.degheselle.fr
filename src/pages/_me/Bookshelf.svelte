<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";
    import { bookStore } from "./LibraryStore.js";

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

            // Set the DOM element so that we can select it later
            book.dom = bookGroup.node;

            for (let volumeIndex = 0; volumeIndex < book.volumes.length; volumeIndex++) {
                const randHeight = Math.random() * (BOOK_RANDOM_HEIGHT_MAX - BOOK_RANDOM_HEIGHT_MIN) + BOOK_RANDOM_HEIGHT_MIN;
                const randBook = randomIntFromInterval(1, 4);

                let volumeVisual = bookGroup
                    .use("book-" + randBook)
                    .addClass("book-volume")
                    .move(
                        BOOK_WIDTH * volumeIndex + SUPPORT_SIZE * 2,
                        BOOKSHELF_HEIGHT - BOOK_HEIGHT - SUPPORT_SIZE,
                    )
                    .scale(1, randHeight, 0, BOOKSHELF_HEIGHT - SUPPORT_SIZE);

                volumeVisual
                    .on("mouseenter", () => {
                        bookStore.select(book, volumeIndex, { target: "book", preview: true });
                    })
                    .on("mouseleave", () => {
                        bookStore.unselect({ preview: true });
                    })
                    .click((e) => {
                        e.stopPropagation();
                        bookStore.select(book, volumeIndex, { target: "book" });
                    });
            }

            currentBookNumber += book.volumes.length;
        }
    }

    const BOOKSHELF_WIDTH = 500;
    const BOOKSHELF_HEIGHT = 120;
    const SUPPORT_SIZE = 8;

    const BOOK_WIDTH = 20;
    const BOOK_HEIGHT = 100;
    const BOOK_RANDOM_HEIGHT_MAX = 1.1;
    const BOOK_RANDOM_HEIGHT_MIN = 0.9;
    const BOOK_GROUP_SPACING = 2;

    let draw;
    let svg;
    export let bookshelf = [];
</script>

<svg bind:this={svg}>
    <use xlink:href="#bookshelf-defs" />
</svg>
