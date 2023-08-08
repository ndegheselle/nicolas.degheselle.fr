<script lang="ts">
    let hide = false;
    export let timelineJobs: any[] = [];
</script>

<div class="grid is-centered with-gap">
    <div class="col is-auto">
        <h1 class="giant-title">6</h1>
        <div class="title-complement">
            <h2>years</h2>
            <h2>7 months</h2>
        </div>
    </div>
    <div class="col is-4 description" class:hide={hide} on:click={() => hide = true}>
        <div class="card">
            <h4>Boup</h4>
            <p>
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.
            </p>
        </div>
    </div>
</div>

<style>
    .description {
        overflow: hidden;
        transition: 0.3s;
        background: linear-gradient(45deg, var(--color-primary), var(--color-primary-dim));
        background-clip: text;
        color: transparent;
    }
    .description.hide {
        flex: 0 0 0;
    }

    .title-complement {
        margin-left: 1rem;       
    }
    .title-complement > h2 {
        color: var(--color-bg-secondary);
        margin: 0;
    }
</style>
