<script>
    import Card from "@components/Card.svelte";
    import { formatDates } from "@base/utils.js";
    import { onMount } from "svelte";
    import { useTranslations } from "@i18n/utils";

    function selectJob(_job) {
        if (_job == null) return;
        selectedJob = _job;
    }

    function jobsToTimeline(_jobs)
    {
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
                role="button"
                tabindex={index}
                on:mouseenter={() => selectJob(job)}
                href="#"
                class="timeline-bar sheen"
                class:is-job={!job.isInternship}
                class:is-internship={job.isInternship}
                style="width:{job.width}%"
            />
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
                    <h3>{@html selectedJob.title}</h3>
                    <span class="subtitle">
                        {selectedJob.company} - {selectedJob.location}
                    </span>
                    <p class="date">
                        {formatDates(
                            selectedJob.startingDate,
                            selectedJob.endingDate,
                            lang,
                        )}
                    </p>
                </div>
                <p class="job-description">{@html selectedJob.description}</p>
            </Card>
        {/if}
    </div>
</div>

<style>
    .timeline {
        margin: 0.6rem 0;
    }
    .timeline-bar {
        height: 1.4rem;
        border-radius: 0.8rem;
        cursor: pointer;
    }
    .timeline-bar.is-internship {
        background: var(--color-primary-less);
    }
    .timeline-bar.is-job {
        background: var(--color-primary);
    }
    .is-background {
        border-radius: 50%;
        background-color: var(--color-background-more-2);
        height: 1rem;
        width: 1rem;
        margin: auto 0.4rem;
    }
    .sheen {
        position: relative;
        overflow: hidden;
    }

    .sheen:before {
        content: "";
        position: absolute;
        opacity: 0.2;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            100deg,
            transparent,
            var(--color-foreground),
            transparent
        );
        transition: all 650ms;
    }

    .sheen:hover:before {
        left: 100%;
    }
</style>
