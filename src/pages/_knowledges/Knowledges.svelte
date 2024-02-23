<script>
    import Card from "../../components/Card.svelte";
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

    let selectedBookshelf = null;
    export let knowledges = [];
</script>

<div class="grid book-more-info">
    <div class="col is-6 on-sm-is-12">
        {#if selectedBookshelf}
            <Card>
                <h3 slot="title">{selectedBookshelf.title}</h3>
                <p>
                    {@html selectedBookshelf.description}
                </p>
            </Card>
        {:else}
            <Card>
                <p>
                    The more book there is the more I experienced the subject !
                    I listed mostly technologies I personnaly experimented with
                    or used during internship / at work without focusing on
                    other skills. If you want to learn more about those, hit me up !
                </p>
            </Card>
        {/if}
    </div>
</div>

<div class="grid shelf-container">
    {#each knowledges as know}
        <div class="col {know.bookshelfClass || 'is-12'}">
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
    @import "src/scss/gracile/variables.scss";

    @media (max-width: $breakpoint-md) {
        .shelf-container {
            margin: 0.4rem !important;
        }
    }

    @media (min-width: $breakpoint-md) and (max-width: $breakpoint-xl) {
        .shelf-container {
            margin: 0.4rem 10% !important;
        }
    }

    .shelf-container {
        margin: 0.4rem 25%;
    }

    .book-more-info {
        position: sticky;
        top: 0.4rem;
        z-index: 10;
    }

    .bookshelf {
        display: flex;
        width: 100%;
        border: 0.5rem solid var(--color-border);
        height: 180px;
        position: relative;
    }

    .bookshelf-title {
        position: absolute;
        bottom: 0;
        background-color: var(--color-bg-light);
        border: 1px solid var(--color-border);
        padding: 0.1rem 0.3rem;
        color: var(--color-gray-dark);
        border-radius: 0.2rem;
        rotate: -90deg;
        transform-origin: bottom left;
    }

    .background-books {
        display: flex;
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
        color: var(--color-gray-light);
        font-weight: bold;
        border-bottom: 4px solid var(--color-border);
    }
    .books-container .title.is-shifted {
        top: 1.5rem;
    }

    :global(.books-container.active .title) {
        color: var(--color-primary) !important;
        z-index: 1;
    }
</style>
