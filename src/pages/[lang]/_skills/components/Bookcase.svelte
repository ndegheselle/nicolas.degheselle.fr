<script>
    import Bookshelf from "./Shelf.svelte";
    import { selectedStore } from "../store.js";
    import clickOutside from "@base/clickOutside.js";
    import booksSvg from "../svgs/books.svg?raw";
    import bookBackgroundSvg from "../svgs/book-background.svg?raw";
    import { useTranslations } from "@i18n/utils";

    function canPreview(store) {
        return store.options.target == "book" && store.data;
    }

    function selectExplanation() {
        selectedStore.select(
            {
                title: t("knowledge.title"),
                description: t("knowledge.description"),
            },
            Array.from(
                document.querySelectorAll(
                    ".svg-bookshelf .selectable.is-background",
                ),
            ),
            {
                target: "other",
                isLocked: true,
            },
        );
    }

    function groupKnowledges(_contents)
    {
        if (_contents == null) return;

        function createBookShelf()
        {
            currentBookshelf = [];
            currentBooksNumber = 0;
            separatedByBookshelf.push(currentBookshelf);
        }

        let _grouped = _contents.reduce(function (groups, item) {
            (groups[item.data.group] = groups[item.data.group] || []).push(item);
            return groups;
        }, {});

        let separatedByBookshelf = [];
        let currentBooksNumber;
        let currentBookshelf;

        createBookShelf();
        for (const group in _grouped) {
            // Add new group
            currentBookshelf.push([]);
            for (const book of _grouped[group]) {
                currentBooksNumber += book.data.level || 1;
                // Create new bookshelf
                if (currentBooksNumber > MAX_BOOKS_PER_BOOKSHELF)
                {
                    createBookShelf();
                    currentBookshelf.push([]);
                }
                // Add book to group
                currentBookshelf[currentBookshelf.length -1].push(book);
            }
        }
        
        return separatedByBookshelf;
    }

    const MAX_BOOKS_PER_BOOKSHELF = 20;
    $: grouped = groupKnowledges(knowledges);
    export let knowledges = {};
    export let lang = "";
    const t = useTranslations(lang);
</script>

<!-- Books elements defs -->
{@html booksSvg}

<div class="grid">
    <span class="tag">
        <a
            href="javascript:void(0)"
            on:click|stopPropagation={selectExplanation}
        >
        {t("knowledge.title")}
        </a>
    </span>
</div>

<div class="grid">
    {#each grouped as bookshelf}
        <div class="col is-6 on-md-is-12">
            <Bookshelf {bookshelf} />
        </div>
    {/each}
</div>

<div
    class="selectable-display container"
    class:preview={canPreview($selectedStore)}
    class:full={canPreview($selectedStore) && $selectedStore.options.isLocked}
    use:clickOutside={() => selectedStore.unselect(true)}
>
    <!-- Selected book background -->
    <div class="background">
        {@html bookBackgroundSvg}
    </div>

    <div class="content-container">
        <div class="content">
            {#if canPreview($selectedStore)}
                <h1>{$selectedStore.data.data.title}</h1>
                <hr />
                <p>{$selectedStore.data.rendered.html}</p>
            {/if}
        </div>
    </div>
</div>