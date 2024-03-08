<script>
    function getRandomHeight() {
        return (
            Math.floor(Math.random() * (120 - 80 + 1)) + 80
        );
    }

    function getRandomWidth() {
        return Math.floor(Math.random() * (40 - 20 + 1)) + 20;
    }

    function getRandomSpacing() {
        let spacings = [
            "is-illustrations-spaced",
            "is-illustrations-start",
            "is-illustrations-end",
        ];
        return spacings[Math.floor(Math.random() * spacings.length)];
    }

    export let isBackground = false;
    export let isSecondary = false;
</script>

<span
    class="book"
    class:background={isBackground}
    class:secondary={isSecondary}
>
    <span class="topside" />
    <span
        class="frontside {getRandomSpacing()}"
        style="width: {getRandomWidth()}px;height: {getRandomHeight()}px;"
    >
        <span class="vertical-line" />
        <span class="vertical-line" />
        <span class="vertical-line" />
        <span class="ball" />
    </span>
</span>

<style lang="scss">
    @use "sass:map";
    @import "src/scss/gracile/variables.scss";

    @media (max-width: $breakpoint-sm) {
        .book,
        .frontside {
            width: 100% !important;
        }
    }

    .book:hover {
        --book-color: var(--book-color-active);
    }
    .book.secondary:hover {
        --book-color: var(--book-color-active);
    }

    .book:hover:not(.background) .topside {
        min-height: 1rem;
    }
    .book:hover:not(.background) {
        transform: translateY(0.5rem);
    }

    .book.background {
        --book-color: var(--color-background-secondary);
    }

    .book {
        --book-color: var(--color-primary-less);
        --book-color-active: var(--color-primary);
    }
    .book.secondary {
        --book-color: var(--color-secondary-less);
        --book-color-active: var(--color-secondary);
    }
    .book {
        background-color: var(--book-color);
        border-radius: 0.2rem;
        margin: 0 0.05rem;
    }

    .book,
    .book .topside,
    .book .frontside {
        display: block;
        transition: 0.3s;
        box-sizing: border-box;
    }

    .book .topside {
        border-top: 0.2rem solid var(--color-background);
        border-left: 0.2rem solid var(--book-color);
        border-right: 0.2rem solid var(--book-color);
        background-color: var(--color-background-less);
        width: 100%;
        min-height: 0;
    }

    .book .frontside {
        display: flex;
        padding: 0.2rem;
        flex-direction: column;
        align-items: center;
    }
    .book .frontside.is-illustrations-spaced {
        justify-content: space-between;
    }
    .book .frontside.is-illustrations-start {
        justify-content: start;
    }
    .book .frontside.is-illustrations-end {
        justify-content: end;
    }

    .ball,
    .vertical-line {
        display: block;
        background-color: var(--color-background);
    }

    .vertical-line {
        margin: 0.3rem 0;
        height: 0.3rem;
        width: 100%;
    }

    .ball {
        border-radius: 50%;
        width: 0.8rem;
        height: 0.8rem;
    }
</style>
