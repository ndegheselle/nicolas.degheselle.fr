<script>
    import Card from "../../components/Card.svelte";
    import { selectedStore } from "./MeStore";

    function canPreview(store) {
        return store?.options?.target === "other" && store.data;
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

<style>
    /* More info on hovered*/
    .hover-more-info {
        width: 100%;
        bottom: 0.4rem;
        left: 0;
        transition: 0.3s;
        transform: translateY(120%);
        position: fixed;
        z-index: 10;
    }

    .hover-more-info.is-active {
        transform: translateY(0);
    }
</style>
