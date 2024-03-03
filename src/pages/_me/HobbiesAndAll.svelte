<script>
    import { onMount } from "svelte";
    import Card from "../../components/Card.svelte";

    let hoverInfos = null;
    let showHoverInfos = false;
    onMount(() => {
        // Foreach element with data-title attribute
        document.querySelectorAll("[data-title]").forEach((element) => {
            // Add event listener to each element
            element.addEventListener("mouseover", (event) => {
                // Get the title attribute
                const title = element.getAttribute("data-title");
                // Get the description attribute
                const description = element.getAttribute("data-description");
                hoverInfos = {
                    title,
                    description,
                };
                showHoverInfos = true;
            });
            element.addEventListener("mouseout", (event) => {
                showHoverInfos = false;
            });
        });
    });
</script>

<div class="grid hover-more-info" class:is-active={showHoverInfos}>
    <div class="col is-6 on-sm-is-12">
        <Card>
            <h3 slot="title">{hoverInfos?.title}</h3>
            <p>
                {@html hoverInfos?.description}
            </p>
        </Card>
    </div>
</div>

<div class="svg-container">
    <div class="experimental-container">
        <svg width="100%" height="100%" viewBox="0 0 100 50">
            <rect
                x="0"
                y="0"
                width="100"
                height="50"
                fill="magenta"
                stroke-width="1"
            />
            <rect
                data-title="title"
                data-description="description"
                x="10"
                y="10"
                width="10"
                height="10"
                fill="green"
            />
        </svg>
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
        transition: 0.3s;
        position: fixed;
        transform: translateY(-120%);
    }

    .hover-more-info.is-active {
        transform: translateY(0);
    }

</style>
