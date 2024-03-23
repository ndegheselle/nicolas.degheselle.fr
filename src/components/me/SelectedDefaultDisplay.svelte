<script>
    import Card from "@components/Card.svelte";
    import { selectedStore } from "./MeStore";
    import { onMount } from "svelte";

    function canPreview(store) {
        return store?.options?.target === "other" && store.data;
    }

    onMount(() => {
        document.querySelectorAll("[data-select-target]").forEach((el) => {
            el.classList.add("selectable");
            el.addEventListener("mouseenter", (e) => {
                selectedStore.select(otherSkills[el.dataset.selectTarget], [el], {
                    target: "other",
                });
            });
            el.addEventListener("mouseleave", (e) => {
                selectedStore.unselect();
            });
            el.addEventListener("click", (e) => {
                e.stopPropagation();
                selectedStore.select(otherSkills[el.dataset.selectTarget], [el], {
                    target: "other",
                    isLocked: true,
                });
            });
        });
    });

    export let otherSkills = {};
</script>

<div class="grid hover-more-info" class:is-active={canPreview($selectedStore)}>
    <div class="col is-4 on-sm-is-12">
        <Card>
            <h3 slot="title">
                {#if $selectedStore.data?.title}
                    {$selectedStore.data?.title}
                {/if}
            </h3>
            <p>
                {#if $selectedStore.data?.title}
                    {@html $selectedStore.data?.description}
                {/if}
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
        opacity: 0;
    }

    .hover-more-info.is-active {
        transform: translateY(0);
        opacity: 1;
    }
</style>
