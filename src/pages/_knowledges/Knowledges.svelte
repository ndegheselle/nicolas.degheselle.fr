<script>
    import Book from "./Book.svelte";
    function enterBookshelf(event) {
        // foreach books-container remove active class
        document
            .querySelectorAll(".books-container")
            .forEach((element) => element.classList.remove("active"));
        // Add active class to the current element
        event.currentTarget.classList.add("active");
    }
    function clickBookshelf(event, know) {
        enterBookshelf(event);
        selectedBookshelf = know;
    }

    let selectedBookshelf = {
        title: "",
        description:
            "The more book there is the more I experienced the subject !  I listed mostly technologies I personnaly experimented with or used during internship / at work without focusing on ohter skills.",
    };
    export let knowledges = [];
</script>

<div class="grid book-more-info">
    <div class="col is-6">
        <div class="card">
            <h3>{selectedBookshelf.title}</h3>
            <p>
                {@html selectedBookshelf.description}
            </p>
        </div>
    </div>
</div>

<div class="grid shelf-container">
    {#each knowledges as know}
        <div class="col {know.bookshelfClass || 'is-12'} col-md-full">
            <div class="bookshelf">
                {#each know.elements as element, index}
                    {#if element.type}
                        <span class="background-books d-md-none">
                            <Book isBackground={true} />
                            <Book isBackground={true} />
                            <Book isBackground={true} />
                        </span>
                    {:else}
                        <a
                            class="books-container {element.containerClass ||
                                ''}"
                                style="flex: {know.elements.lenght};"
                            on:click={(e) => clickBookshelf(e, element)}
                            on:mouseenter={enterBookshelf}
                            href="javascript:;"
                        >
                            {#each Array(element.level) as _, __}
                                <Book isSecondary={index % 2} />
                            {/each}
                            <span class="title {element.titleClass || ''}"
                                >{element.title}</span
                            >
                        </a>
                    {/if}
                {/each}

                {#if know.title}
                    <span class="bookshelf-title">{know.title}</span>
                {/if}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">
    @use "sass:map";
    @import "src/styles/variables.scss";

    @media (max-width: map.get($grid-breakpoints, md)) {
        .books-container {
            flex: auto;
        }
        .shelf-container {
            margin: 0 !important;
        }
    }

    .shelf-container {
        margin: 0.4rem 20%;
    }

    .book-more-info {
        position: sticky;
        top: 0.4rem;
        z-index: 10;
    }

    .bookshelf {
        display: flex;
        width: 100%;
        border: 0.6rem solid var(--color-bg-secondary);
        border-radius: 0.4rem;
        height: 180px;
        position: relative;
    }

    .bookshelf-title {
        position: absolute;
        bottom: 0;
        background-color: var(--color-bg);
        border: 1px solid var(--color-bg-secondary);
        padding: 0.1rem 0.3rem;
        color: var(--color-front-secondary);
        border-radius: 0.2rem;
        rotate: -90deg;
        transform-origin: bottom left;
    }

    .background-books {
        align-items: center;
        justify-content: center;
        transform: rotate(90deg) translateY(25%);
        transform-origin: bottom right;
    }

    .books-container {
        display: flex;
        align-items: end;
        height: 100%;
        position: relative;
    }
    .books-container .title {
        transition: 0.3s;
        white-space: nowrap;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: var(--color-bg-secondary);
        font-weight: bold;
        border-bottom: 4px solid var(--color-bg-secondary);
    }
    .books-container .title.is-shifted {
        top: 1.5rem;
    }

    :global(.books-container.active .title) {
        color: var(--color-front-secondary) !important;
        z-index: 1;
    }
</style>
