<script>
    import Card from "@components/Card.svelte";
    import { formatDates } from "@base/utils.js";
    import { SVG } from "@svgdotjs/svg.js";
    import { onMount } from "svelte";

    function selectJob(_job) {
        if (_job == null) return;
        selectedJob = _job;
    }

    onMount(() => {
        const draw = SVG(svg).viewbox(
            0,
            0,
            WIDTH,
            HEIGHT + EXTERIOR_SPACING * 2,
        );

        let totalDuration = 0;
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            job.startingDate = new Date(job.startingDate).getTime();
            job.endingDate =
                new Date(job.endingDate).getTime() || new Date().getTime();
            job.duration = job.endingDate - job.startingDate;
            totalDuration += job.duration;
        }

        let x = 0;
        for (let i = 0; i < jobs.length; i++) {
            const job = jobs[i];
            const width =
                (job.duration / totalDuration) *
                (WIDTH - SPACING * (jobs.length - 1));
            draw.rect(width, HEIGHT)
                .radius(10)
                .move(x, EXTERIOR_SPACING)
                .addClass("timeline-bar")
                .addClass(job.isInternship ? "is-internship" : "is-job")
                .on("mouseenter", () => {
                    selectJob(job);
                })
                .click((e) => {
                    selectJob(job);
                });

            x += width + SPACING / 2;
            draw.circle(HEIGHT)
                .center(x, EXTERIOR_SPACING + HEIGHT / 2)
                .addClass("is-background");
            x += SPACING / 2;
        }
    });

    const WIDTH = 500;
    const HEIGHT = 20;
    const SPACING = 30;
    const EXTERIOR_SPACING = 10;

    let svg = null;
    $: selectedJob = jobs[jobs.length - 1];
    export let jobs = [];
    
</script>

<div class="grid">
    <div class="col is-6 on-sm-is-12">
        <svg class="timeline" bind:this={svg} width="100%"></svg>
    </div>
</div>

<div class="grid">
    <div class="col is-6 on-sm-is-12">
        {#if selectedJob}
            <Card>
                <div slot="title">
                    <h3>{selectedJob.title}</h3>
                    <span class="subtitle">
                        {selectedJob.company} - {selectedJob.location}
                    </span>
                    <p class="date">
                        {formatDates(
                            selectedJob.startingDate,
                            selectedJob.endingDate,
                        )}
                    </p>
                </div>
                <p class="job-description">{@html selectedJob.description}</p>
            </Card>
        {/if}
    </div>
</div>

<style>
    .job-description {
        text-align: left;
    }

    :global(.timeline .is-background) {
        fill: var(--color-background-more-2);
    }

    :global(.timeline .timeline-bar) {
        transform-origin: center;
        transition: 0.3s;
        cursor: pointer;
    }

    :global(.timeline .timeline-bar:hover) {
        transform: scaleY(1.2);
    }

    :global(.timeline .timeline-bar.is-internship) {
        fill: var(--color-primary-less);
    }

    :global(.timeline .timeline-bar.is-job) {
        fill: var(--color-primary);
    }
</style>
