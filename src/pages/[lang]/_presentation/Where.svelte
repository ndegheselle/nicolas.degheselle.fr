<script>
    import { formatDates } from "@base/utils.js";
    import Card from "@components/Card.svelte";
    import { useTranslations } from "@i18n/utils";

    function selectJob(_job) {
        selectedJob = _job;
    }

    function jobsToTimeline(_jobs) {
        let totalDuration = 0;
        for (let i = 0; i < _jobs.length; i++) {
            const job = _jobs[i];
            job.startingDate = new Date(job.startingDate).getTime();
            job.endingDate =
                new Date(job.endingDate).getTime() || new Date().getTime();
            job.duration = job.endingDate - job.startingDate;
            totalDuration += job.duration;
        }

        let x = 0;
        for (let i = 0; i < _jobs.length; i++) {
            const job = _jobs[i];
            job.width = (job.duration / totalDuration) * 100;
        }
        return _jobs;
    }

    $: selectedJob = jobs[jobs.length - 1];
    $: timeline = jobsToTimeline(jobs);

    export let jobs = [];
    export let lang = "";
    const t = useTranslations(lang);
</script>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-where">
    {t("title.where")}
</h2>

<div class="grid">
    <div class="col is-6 on-sm-is-12 stretch-container timeline">
        {#each timeline as job, index}
            <span
                class:is-visible={job == selectedJob}
                role="button"
                tabindex={index}
                on:mouseenter={() => selectJob(job)}
                href="#"
                class="timeline-bar sheen"
                style="width:{job.width}%"
            >
                <svg width="20" height="20" class="triangle">
                    <polygon points="0, 0, 20, 0, 10, 20" />
                </svg>
            </span>
            {#if job != jobs[jobs.length - 1]}
                <span class="is-background" />
            {/if}
        {/each}
    </div>
</div>

<div class="grid">
    <div class="col is-6 on-sm-is-12">
        {#if selectedJob}
            <Card>
                <div slot="title">
                    <h3>{@html selectedJob.data.title}</h3>
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

    .is-visible .triangle{
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
