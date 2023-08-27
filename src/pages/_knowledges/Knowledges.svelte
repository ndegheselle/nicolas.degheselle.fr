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

    let selectedBookshelf = null;
    export let knowledges = [];
</script>

<div class="grid">
    <div class="col is-6">
        {#if selectedBookshelf}
            <div class="card mb-2">
                <h3>{selectedBookshelf.title}</h3>
                <p>
                    {selectedBookshelf.description}
                </p>
            </div>
        {/if}
    </div>
</div>

{#each knowledges as know}
    <div class="grid">
        <div class="col is-6 bookshelf">
            {#each know.elements as element, index}
                <a
                    class="books-container"
                    on:click={(e) => clickBookshelf(e, element)}
                    on:mouseenter={enterBookshelf}
                    href="javascript:;"
                >
                    {#each Array(element.level) as _, __}
                        <Book isSecondary={index % 2}/>
                    {/each}
                    <span class="title">{element.title}</span>
                </a>
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
        height: 180px;
        position: relative;
    }

    .bookshelf-title {
        position: absolute;
        bottom: 0;
        left: -0.4rem;
        background-color: var(--color-bg);
        border: 1px solid var(--color-bg-secondary);
        padding: 0.1rem 0.3rem;
        color: var(--color-front-secondary);
        border-radius: 0.2rem;
        rotate: -90deg;
        transform-origin: bottom left;
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

    :global(.books-container.active .title) {
        color: var(--color-front-secondary) !important;
    }
</style>
