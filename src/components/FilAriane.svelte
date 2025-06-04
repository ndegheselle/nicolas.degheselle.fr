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
            if (!container) return;

            // Get the relative position of the scroll in the container
            let containerHeight = container.offsetHeight - window.innerHeight;
            let containerTop = container.getBoundingClientRect().top;

            let newScrollPercent;

            if (containerTop > 0) newScrollPercent = 0;
            else if (containerHeight + containerTop < 0) newScrollPercent = 100;
            else newScrollPercent = (-containerTop / containerHeight ) * 100;

            if (newScrollPercent !== scrollPercent && Math.abs(scrollPercent - newScrollPercent) > 1) {
                scrollPercent = newScrollPercent;
            }
        });
    });

    function createFil() {
        container = document.querySelector(".fil-ariane-tracking");

        if (!container) return;

        let elements = container.querySelectorAll(".fil-ariane-balise");

        // For each elements get the relative position in the container and add it to positions array
        balises = [];
        elements.forEach((element) => {
            // Get container height
            let containerHeight = container.offsetHeight - window.innerHeight;
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

    let container = {};
    let balises = [];
    let scrollPercent = 0;
</script>

<div class="fil-ariane-container" class:hide={scrollPercent <= 0}>
    <div class="progress-bar">
        <div class="progress" style="height: {scrollPercent}%;"></div>
    </div>

    {#each balises as balise}
        <button
            on:click|preventDefault={smoothScrollTo}
            class="balise"
            class:active={balise.percent < scrollPercent}
            style="top: {balise.percent}%"
            href={balise.link}
        ></button>
    {/each}
</div>

<style lang="scss">
    @use "../scss/gracile/variables.scss" as vars;

    .fil-ariane-container {
        position: fixed;
        top: 25vh;
        left: 0.6rem;
        z-index: 10;
    }

    @media screen and (max-width: vars.$breakpoint-md) {
        .fil-ariane-container {
            left: -0.1rem;
        }
    }

    .fil-ariane-container.hide {
        opacity: 0;
    }

    .progress-bar {
        width: 0.4rem;
        background-color: var(--color-background-more-2);
        height: 50vh;
        border-radius: 0.2rem;
    }

    .progress {
        width: 100%;
        background-color: var(--color-primary);
        border-radius: 0.2rem;
    }

    .fil-ariane-container .balise {
        position: absolute;
        left: 50%;
        width: 0.8rem;
        height: 0.8rem;
        background-color: var(--color-background-more-2);
        border-radius: 50%;
        border: 0.2rem solid var(--color-midground-more);
        transform: translate(-50%, -50%);
    }

    .fil-ariane-container .balise.active {
        background-color: var(--color-primary-less);
        border-color: var(--color-primary);
    }
</style>