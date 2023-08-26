<script>
    function getRandomHeight() {
        return Math.floor(Math.random() * (120 - 80 + 1)) + 80;
    }

    function getRandomWidth() {
        return Math.floor(Math.random() * (50 - 20 + 1)) + 20;
    }

    function getRandomSpacing() {
        let spacings = ["is-spaced", "is-start", "is-end"];
        return spacings[Math.floor(Math.random() * spacings.length)];
    }

    function enterBookshelf(event) {
        // foreach books-container remove active class
        document
            .querySelectorAll(".books-container")
            .forEach((element) => element.classList.remove("active"));
        // Add active class to the current element
        event.currentTarget.classList.add("active");
    }

    export let knowledges = [];
</script>

{#each knowledges as know}
    <div class="grid">
        <!-- If you are looking there you are wondering why I didn't made this with SVG. Because it's way easier to handle responsivity and transform origins -->
        <div class="col is-4 bookshelf">
            {#each know.elements as element, index}
                <div class="books-container" on:mouseenter={enterBookshelf}>
                    {#each Array(element.level) as _, __}
                        <a
                            class="book"
                            class:secondary={index % 2}
                            style="width: {getRandomWidth()}px;height: {getRandomHeight()}px;"
                        >
                            <span
                                class="book-illustrations {getRandomSpacing()}"
                            >
                                <span class="vertical-line" />
                                <span class="vertical-line" />
                                <span class="vertical-line" />
                                <span class="ball" />
                            </span>
                        </a>
                    {/each}
                    <span class="title">{element.title}</span>
                </div>
            {/each}

            {#if know.title}
                <span class="bookshelf-title">{know.title}</span>
            {/if}
        </div>
    </div>
{/each}

<style>
    .bookshelf {
        border: 0.6rem solid var(--color-bg-secondary);
        border-radius: 0.4rem;
        height: 150px;
    }

    .bookshelf-title {
        position: absolute;
        bottom: 0.5rem;
        background-color: var(--color-bg);
        padding: 0.1rem 0.3rem;
        color: var(--color-front-secondary);
        border-radius: 0.2rem;
    }

    .book {
        transition: 0.3s;
        display: block;
        width: 30px;
        height: 100px;
        background-color: var(--color-primary-dim);
        border-radius: 0.2rem;
        margin: 0 0.05rem;
    }
    .book.secondary {
        background-color: var(--color-secondary-dim);
    }

    .books-container {
        display: flex;
        align-items: end;
        height: 100%;
        position: relative;
    }
    .books-container .title {
        transition: 0.3s;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: var(--color-bg-secondary);
        font-weight: bold;
        border-bottom: 4px solid var(--color-bg-secondary);
    }

    :global(.books-container.active .book) {
        background-color: var(--color-primary);
    }
    :global(.books-container.active .book.secondary) {
        background-color: var(--color-secondary);
    }
    :global(.books-container.active .title) {
        color: var(--color-front-secondary) !important;
    }

    .book-illustrations {
        display: flex;
        padding: 0.2rem;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
    }
    .book-illustrations.is-spaced {
        justify-content: space-between;
    }
    .book-illustrations.is-start {
        justify-content: start;
    }
    .book-illustrations.is-end {
        justify-content: end;
    }

    .vertical-line {
        margin: 0.3rem 0;
        display: block;
        height: 0.3rem;
        background-color: var(--color-bg);
        width: 100%;
    }
    
    .ball {
        display: block;
        width: 0.8rem;
        height: 0.8rem;
        background-color: var(--color-bg);
        border-radius: 50%;
        margin: 0 auto;
    }
</style>
