<div class="card">
    <div class="card-header">
        <slot name="title" />
    </div>
    {#if $$slots.title}
        <hr />
    {/if}
    <div class="card-body">
        <slot />
    </div>
</div>

<style>
    .card {
        padding: 0.4rem 0.6rem;

        background-color: rgba(var(--color-light), 0.8);
        border-radius: 0.2rem;
        box-shadow: 0 0 20px var(--color-gray-light);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border: 1px solid var(--color-border-light);
    }
</style>
