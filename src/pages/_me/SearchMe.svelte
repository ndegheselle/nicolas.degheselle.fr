<script>

    $: applySearch(search);

    function applySearch()
    {
        let container = document.getElementById("me-container");
        if (search)
        {
            container.classList.add("is-searching");
            container.querySelectorAll('[data-search]').forEach((el) => {
                el.classList.remove("is-search-result");
                if (el.dataset.search.toLowerCase().includes(search.toLowerCase()))
                {
                    el.classList.add("is-search-result");
                }
            });
        }
        else
        {
            container.classList.remove("is-searching");
            container.querySelectorAll('[data-search]').forEach((el) => {
                el.classList.remove("is-search-result");
            });
        }
    }

    let search;
</script>

<div class="grid">
    <div class="col is-6 on-sm-is-12 has-icon">
        <input bind:value={search}/>
        <i class="input-icon fa-solid fa-magnifying-glass"></i>
    </div>
</div>

<style>
    .input-icon {
        color: var(--color-midground);
    }
</style>