<script>
    import Card from "@components/Card.svelte";
    export let guidelines = [];
</script>

<div class="grid with-gutter">
    {#each guidelines as guideline}
        <div class="col on-sm-is-12">
            <Card>
                <h3 slot="title">{guideline.title}</h3>
                <p>{guideline.description}</p>
            </Card>
        </div>
    {/each}
</div>