<script>
    import Card from "../../components/Card.svelte";
    import Experimentations from "./Experimentations.svelte";

    import { selectedStore } from "./MeStore";

    function canPreview(store)
    {
        store?.options?.target === "other" && store.data;
    }

</script>

<div class="grid hover-more-info" class:is-active={canPreview($selectedStore)}>
    <div class="col is-6 on-sm-is-12">
        <Card>
            <h3 slot="title">{$selectedStore.data?.title}</h3>
            <p>
                {@html $selectedStore.data?.description}
            </p>
        </Card>
    </div>
</div>

<div class="svg-container">
    <div class="experimental-container">
        <Experimentations />
    </div>
    <div class="desktop-container">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="cyan"
                stroke-width="1"
            />
        </svg>
    </div>
    <div class="hobby-container">
        <svg width="100%" height="100%" viewBox="0 0 100 50">
            <rect
                x="0"
                y="0"
                width="100"
                height="50"
                fill="yellow"
                stroke-width="1"
            />
        </svg>
    </div>
</div>

<style lang="scss">
    @import "../../scss/gracile/variables.scss";

    .svg-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }

    @media screen and (max-width: $breakpoint-md) {
        .svg-container {
            display: block;
        }
    }

    .svg-container .experimental-container {
        grid-column: 2;
        grid-row: 1;
    }

    .svg-container .desktop-container {
        grid-column: 1;
        grid-row: 1 / 3;
    }

    .svg-container .hobby-container {
        grid-column: 2;
        grid-row: 2;
    }

    /* More info on hovered*/
    .hover-more-info {
        width: 100%;
        top: 0.4rem;
        left: 0;
        transition: 0.3s;
        transform: translateY(-120%);
        position: fixed;
    }

    .hover-more-info.is-active {
        transform: translateY(0);
    }
</style>
