<script>
    import { formatDates } from "@base/utils.js";
    import Card from "@components/Card.svelte";
    import { useTranslations } from "@i18n/utils";

    function selectJob(_job) {
        selectedJob = _job;
    }

    function jobsToTimeline(_jobs) {
        // Oldest job first so the timeline reads chronologically
        const sorted = [..._jobs].sort(
            (a, b) =>
                new Date(a.data.startingDate) - new Date(b.data.startingDate),
        );

        const now = new Date().getTime();
        const durations = sorted.map((job) => {
            const startingDate = new Date(job.data.startingDate).getTime();
            // A job without an ending date is the current one
            const endingDate = job.data.endingDate
                ? new Date(job.data.endingDate).getTime()
                : now;
            return endingDate - startingDate;
        });
        const totalDuration = durations.reduce(
            (total, duration) => total + duration,
            0,
        );

        return sorted.map((job, index) => ({
            job,
            width: (durations[index] / totalDuration) * 100,
        }));
    }

    $: timeline = jobsToTimeline(jobs);
    // Show the most recent job by default
    $: selectedJob = timeline[timeline.length - 1]?.job;

    export let jobs = [];
    export let lang = "";
    const t = useTranslations(lang);
</script>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-where">
    {t("title.where")}
</h2>

<div class="grid">
    <div class="col is-6 on-sm-is-12 stretch-container timeline">
        {#each timeline as { job, width }, index}
            <span
                class:is-visible={job == selectedJob}
                role="button"
                tabindex={index}
                on:mouseenter={() => selectJob(job)}
                href="#"
                class="timeline-bar sheen"
                style="width:{width}%"
            >
                <svg width="20" height="20" class="triangle">
                    <polygon points="0, 0, 20, 0, 10, 20" />
                </svg>
            </span>
            {#if index != timeline.length - 1}
                <span class="is-background"></span>
            {/if}
        {/each}
    </div>
</div>

<div class="grid">
    <div class="col is-6 on-sm-is-12">
        {#if selectedJob}
            <Card>
                <div slot="title">
                    <h3>
                        {@html selectedJob.data.title}
                        <span class="subtitle">
                            {#if selectedJob.data.isInternship}
                                - {t("jobs.internship")}
                            {/if}
                        </span>
                    </h3>
                    <span class="subtitle">
                        {selectedJob.data.company} - {selectedJob.data.location}
                    </span>
                    <p class="date">
                        {formatDates(
                            selectedJob.data.startingDate,
                            selectedJob.data.endingDate,
                            lang,
                        )}
                    </p>
                </div>
                <p class="job-description">{@html selectedJob.rendered.html}</p>
            </Card>
        {/if}
    </div>
</div>

<style>
    .triangle {
        transition: 0.3s;
        opacity: 0;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
        z-index: -100;
        fill: var(--color-primary);
    }

    .is-visible .triangle {
        opacity: 1;
        transform: translate(-50%, 100%);
    }

    .timeline {
        margin: 0.6rem 0;
    }
    .timeline-bar {
        position: relative;
        height: 1.4rem;
        border-radius: 0.8rem;
        cursor: pointer;
        min-width: 1.8rem;
        background: var(--color-primary-less);
        transition: 0.3s;
    }
    .timeline-bar.is-visible {
        background: var(--color-primary);
    }

    .is-background {
        border-radius: 50%;
        background-color: var(--color-background-more-3);
        height: 0.7rem;
        width: 1rem;
        margin: auto 0.4rem;
    }

    .job-description {
        text-align: left;
    }
</style>
