<script>
    function getMonthsBetweenDates(_jobs) {
        const startDate = new Date(_jobs[0].startingDate);
        const endDate = new Date();

        let currentJobIndex = 0;
        let lines = [];
        let currentDate = new Date(startDate);
        endDate.setDate(1);

        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
            const line = { year, month };

            const job = jobs[currentJobIndex];
            job.startingDate = new Date(job.startingDate).getTime();
            job.endingDate =
                new Date(job.endingDate).getTime() || new Date().getTime();

            if (
                currentDate.getTime() > job.endingDate &&
                currentJobIndex < jobs.length - 1
            )
                currentJobIndex++;

            if (
                currentDate.getTime() <= job.endingDate &&
                currentDate.getTime() >= job.startingDate
            ) {
                line.job = job;
                line.isIntenship = job.isInternship;
                line.isJob = !job.isInternship;
                if (lines[lines.length - 1])
                    line.isFirstOrLast = !lines[lines.length - 1].isJob;
            }

            if (!line.isJob && lines[lines.length - 1]?.isJob)
                lines[lines.length - 1].isFirstOrLast = true;

            // Move to the next month
            currentDate.setMonth(currentDate.getMonth() + 1);
            lines.push(line);
        }

        if (lines[lines.length - 1].isJob)
            lines[lines.length - 1].isFirstOrLast = true;

        selectJob(_jobs[_jobs.length - 1]);
        return lines;
    }

    function selectJob(_job) {
        if (_job == null) return;
        selectedJob = _job;
    }

    function formatDate(timestamp)
    {
        return new Date(timestamp).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
        });
    }

    let selectedJob = null;
    $: months = getMonthsBetweenDates(jobs);
    export let jobs = [];
</script>

<div class="grid timeline">
    {#each months as month}
        <a
            class="timeline-container"
            on:mouseenter={() => selectJob(month.job)}
            on:click={() => selectJob(month.job)}
            on:keydown={() => selectJob(month.job)}
            on:keyup={() => selectJob(month.job)}
            on:keypress={() => selectJob(month.job)}
        >
            <span
                class="timeline-bar"
                class:is-internship={month.isIntenship}
                class:is-job={month.isJob}
                class:first-or-last={month.isFirstOrLast}
            />
            {#if month.month == 1}
                <span class="year">{month.year}</span>
            {/if}
        </a>
    {/each}
</div>

<div class="grid">
    <div class="col is-6">
        <div class="card">
            {#if selectedJob}
            <span class="d-block">
                <h3>{selectedJob.company}</h3>
                <p class="date">
                    {formatDate(selectedJob.startingDate)} -
                    {formatDate(selectedJob.endingDate)}
                </p>
            </span>
                <hr/>
                <p>{selectedJob.description}</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .date {
        color: var(--color-middle);
    }

    .timeline {
        flex-wrap: nowrap;
        overflow-x: auto;
        min-height: 6rem;
    }

    .timeline-container {
        transition: 0.3s;
        position: relative;
        padding: 0 0.1rem;
    }
    .timeline-container .year {
        font-family: "Teko", sans-serif;
        position: absolute;
        color: var(--color-front-secondary);
    }

    .timeline-bar {
        display: block;
        margin: 0.5rem 0;
        width: 0.3rem;
        height: 1rem;
        border-radius: 0.4rem;
        background-color: var(--color-bg-secondary);
    }
    .timeline-bar.is-internship {
        background-color: var(--color-primary-dim);
        height: 1.5rem;
        margin: 0.25rem 0;
    }
    .timeline-bar.is-job {
        background-color: var(--color-primary);
        height: 2rem;
        margin: 0;
    }
    .timeline-bar.first-or-last {
        height: 1.5rem;
    }
    .timeline-container:hover {
        transform: scaleY(1.2);
    }

</style>
