<script>
    function getRandomHeight() {
        let more = 0;
        if (isBackground) more = 20;
        return Math.floor(Math.random() * (120 + more - 80 + more + 1)) + 80 + more;
    }

    function getRandomWidth() {
        return Math.floor(Math.random() * (40 - 10 + 1)) + 10;
    }

    function getRandomSpacing() {
        let spacings = ["is-spaced", "is-start", "is-end"];
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
    <span class="illustrations {getRandomSpacing()}" 
    style="width: {getRandomWidth()}px;height: {getRandomHeight()}px;">
        <span class="vertical-line" />
        <span class="vertical-line" />
        <span class="vertical-line" />
        <span class="ball" />
    </span>
</span>

<style>
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
        --book-color: var(--color-bg-secondary);
    }

    .book {
        --book-color: var(--color-primary-dim);
        --book-color-active: var(--color-primary);
    }
    .book.secondary {
        --book-color: var(--color-secondary-dim);
        --book-color-active: var(--color-secondary);
    }
    .book {
        background-color: var(--book-color);
        border-radius: 0.2rem;
        margin: 0 0.05rem;
    }

    .book,
    .book .topside {
        display: block;
        transition: 0.3s;
    }

    .book .topside {
        border-top: 0.2rem solid var(--color-bg);
        border-left: 0.2rem solid var(--book-color);
        border-right: 0.2rem solid var(--book-color);
        background-color: var(--color-bg-secondary);
        width: 100%;
        min-height: 0;
        box-sizing: border-box;
    }

    .illustrations {
        display: flex;
        padding: 0.2rem;
        flex-direction: column;
        align-items: center;
    }
    .illustrations.is-spaced {
        justify-content: space-between;
    }
    .illustrations.is-start {
        justify-content: start;
    }
    .illustrations.is-end {
        justify-content: end;
    }

    .ball,
    .vertical-line {
        display: block;
        background-color: var(--color-bg);
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