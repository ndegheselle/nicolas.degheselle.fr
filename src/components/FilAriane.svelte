<script>
    import { onMount } from "svelte";

    onMount(async () => {
        createFil();

        // On window resize, recreate the fil ariane
        window.addEventListener("resize", () => {
            createFil();
        });

        // Get
        window.addEventListener("scroll", () => {
            let container = document.querySelector(".fil-ariane-tracking");
            if (!container) return;

            // Get the relative position of the scroll in the container
            let containerHeight = container.offsetHeight;
            let containerTop = container.getBoundingClientRect().top;

            if (containerTop > 0) scrollPercent = 0;
            else if (containerHeight + containerTop < 0) scrollPercent = 100;
            else scrollPercent = (-containerTop / containerHeight) * 100;
        });
    });

    function createFil() {
        let container = document.querySelector(".fil-ariane-tracking");
        if (!container) return;

        let elements = container.querySelectorAll(".fil-ariane-balise");

        // For each elements get the relative position in the container and add it to positions array
        balises = [];
        elements.forEach((element) => {
            // Get container height
            let containerHeight = container.offsetHeight;
            // Push percentage of the element position in the container
            balises.push({
                link: "#" + element.id,
                percent: (element.offsetTop / containerHeight) * 100,
            });
        });
    }

    function smoothScrollTo() {
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    }

    let balises = [];
    let scrollPercent = 0;
</script>

<div class="fil-ariane-container" class:hide={scrollPercent <= 0}>
    <div class="progress-bar">
        <div class="progress" style="height: {scrollPercent}%;"></div>
    </div>

    {#each balises as balise}
        <a
            on:click|preventDefault={smoothScrollTo}
            class="balise"
            class:active={balise.percent < scrollPercent}
            style="top: {balise.percent}%"
            href={balise.link}
        ></a>
    {/each}
</div>

<style lang="scss">
    @import "../scss/gracile/variables.scss";

    .fil-ariane-container {
        position: fixed;
        top: 25vh;
        left: 0.6rem;
        z-index: 10;
        transition: 0.3s;
    }

    @media screen and (max-width: $breakpoint-md) {
        .fil-ariane-container {
            left: -0.1rem;
        }
    }

    .fil-ariane-container.hide {
        opacity: 0;
    }

    .progress-bar {
        width: 0.4rem;
        background-color: var(--color-bg-dark);
        height: 50vh;
        border-radius: 0.2rem;
    }

    .progress {
        transition: 0.2s;
        width: 100%;
        background-color: var(--color-primary);
        border-radius: 0.2rem;
    }

    .fil-ariane-container .balise {
        position: absolute;
        left: 50%;
        width: 0.8rem;
        height: 0.8rem;
        background-color: var(--color-bg-light);
        border-radius: 50%;
        border: 0.2rem solid var(--color-border-dark);
        transform: translate(-50%, -50%);
        transition: 0.3s;
    }

    .fil-ariane-container .balise.active {
        background-color: var(--color-primary-light);
        border-color: var(--color-primary);
    }
</style>
