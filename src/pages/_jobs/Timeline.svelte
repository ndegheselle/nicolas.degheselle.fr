<script lang="ts">
    import { getDurationText } from "./utils";

    let selectedJob: any = null;
    let jobDuration: number = 0;

    function selectJob(job: any, duration: number) {
        if (selectedJob === job) return;

        selectedJob = job;
        jobDuration = duration;
    }

    export let timelineJobs: any[] = [];
    export let totalDuration: number = 0;
</script>

<div class="timeline">
    {#each timelineJobs as timeline}
        <a
            on:mouseenter={() => selectJob(timeline?.job, timeline.duration)}
            class:internship={timeline.job && timeline.job.isInternship}
            class:job={timeline.job && !timeline.job.isInternship}
            class="experience"
            style="width:{(timeline.duration / totalDuration) * 100}%"
        />
    {/each}
</div>

<section class="job-description" class:active={selectedJob}>
    {#if selectedJob}
    <div>
        <h3>{selectedJob.company}</h3>
        <span>{getDurationText(jobDuration)}</span>
    </div>
    <p>{selectedJob.description}</p>
    {/if}
</section>

<style>
    .timeline {
        display: flex;
    }

    .experience {
        display: block;
        height: 20px;
        background: var(--color-bg-secondary);
    }
    .experience.internship {
        background: var(--color-primary-dim);
    }
    .experience.job {
        background: var(--color-primary);
    }

    .job-description {
        transition: 0.3s;
        height: 0;
        overflow: hidden;
    }
</style>
