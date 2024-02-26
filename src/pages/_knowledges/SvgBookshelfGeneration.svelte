<script>
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

    function bookSelected()
    {
        dispatch('bookSelected', { book: 'book' });
    }
    function bookHovered()
    {
        dispatch('bookHovered', { book: 'book' });
    }

    let categories = [
        {
            title: "Languages",
            childs: [
                {
                    title: "Javascript",
                    childs: [
                        {
                            title: "React",
                            childs: [
                                {
                                    title: "Redux",
                                    childs: [],
                                },
                                {
                                    title: "Next",
                                    childs: [],
                                },
                            ],
                        },
                        {
                            title: "Node",
                            childs: [],
                        },
                    ],
                },
                {
                    title: "Python",
                    childs: [],
                },
                {
                    title: "Java",
                    childs: [],
                },
            ],
        },
    ];

    let bookshelf = [
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

    function randomIntFromInterval(min, max) {
        // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const BOOKSHELF_WIDTH = 400;
    const BOOKSHELF_HEIGHT = 100;
    const SUPPORT_SIZE = 2;

    const BOOK_WIDTH = 20;
    const BOOK_HEIGHT = 50;
    const BOOK_RANDOM_HEIGHT = 10;

    let draw;
    let svg;

    function createCols(row, parent) {
        const colWidth = BOOKSHELF_WIDTH / row.length;

        for (let i = 0; i < row.length; i++) {
            const col = row[i];
            const colGroup = parent.group().translate(i * colWidth, 0);
            colGroup
                .text(col.tag)
                .x(colWidth / 2)
                .y(1)
                .attr("text-anchor", "middle");

            // Horizontal supports
            colGroup
                .rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
                .move(SUPPORT_SIZE, 0)
                .fill("magenta");

            createBooks(col, colGroup);
        }
    }

    function createBooks(col, parent) {
        let currentBookNumber = 0;

        for (let i = 0; i < col.books.length; i++) {
            const book = col.books[i];
            const bookGroup = parent
                .group()
                .translate(BOOK_WIDTH * currentBookNumber, 0);

            bookGroup
                .text(book.title)
                .x((book.volumes.length * BOOK_WIDTH) / 2)
                .y(20)
                .attr("text-anchor", "middle");

            bookGroup
                .rect(
                    BOOK_WIDTH * book.volumes.length,
                    BOOK_HEIGHT + BOOK_RANDOM_HEIGHT,
                )
                .move(
                    SUPPORT_SIZE * 2,
                    BOOKSHELF_HEIGHT - BOOK_HEIGHT - BOOK_RANDOM_HEIGHT - SUPPORT_SIZE,
                ).addClass('book-group');

            book.volumes.forEach((volume, j) => {
                const randomHeight = randomIntFromInterval(
                    -BOOK_RANDOM_HEIGHT,
                    BOOK_RANDOM_HEIGHT,
                );

                bookGroup
                    .rect(BOOK_WIDTH, BOOK_HEIGHT + randomHeight)
                    .move(
                        BOOK_WIDTH * j + SUPPORT_SIZE * 2,
                        BOOKSHELF_HEIGHT -
                            BOOK_HEIGHT -
                            SUPPORT_SIZE -
                            randomHeight,
                    ).addClass('book');
            });

            currentBookNumber += book.volumes.length;
        }
    }

    onMount(() => {
        draw = SVG(svg)
            .size("100%", "100%")
            .viewbox(
                0,
                0,
                BOOKSHELF_WIDTH,
                BOOKSHELF_HEIGHT * bookshelf.length,
            );

        for (let i = 0; i < bookshelf.length; i++) {
            const row = bookshelf[i];
            const group = draw.group().translate(0, i * BOOKSHELF_HEIGHT);

            // Horizontal supports
            group.rect(BOOKSHELF_WIDTH, SUPPORT_SIZE).fill("cyan");
            group
                .rect(BOOKSHELF_WIDTH, SUPPORT_SIZE)
                .move(0, BOOKSHELF_HEIGHT - SUPPORT_SIZE)
                .fill("cyan");

            // Last vertical support
            draw.rect(SUPPORT_SIZE, BOOKSHELF_HEIGHT)
                .move(BOOKSHELF_WIDTH - SUPPORT_SIZE * 2, 0)
                .fill("magenta");

            createCols(row, group);
        }
    });
</script>

<svg bind:this={svg}>
    <use xlink:href="#bookshelf-defs"/>
</svg>

<style global>
        :global(.book-group) {
        stroke: red;
        stroke-width: 1;
        stroke-dasharray: 5;
        fill: transparent;
    }
</style>