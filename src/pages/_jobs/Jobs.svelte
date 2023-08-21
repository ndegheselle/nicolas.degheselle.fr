<script>
    function getMonthsBetweenDates(startDate, endDate) {
        let currentJobIndex = 0;
        let months = [];
        let currentDate = new Date(startDate);
        endDate.setDate(1);

        while (currentDate <= endDate) {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
            const line = { year, month };


            const job = jobs[currentJobIndex];
            job.startingDate = new Date(job.startingDate).getTime();
            job.endingDate = new Date(job.endingDate).getTime() || new Date().getTime();

            if (currentDate.getTime() > job.endingDate && currentJobIndex < jobs.length - 1)
                currentJobIndex++;
            
            if (currentDate.getTime() <= job.endingDate && currentDate.getTime() >= job.startingDate)
            {
                line.isIntenship = job.isInternship;
                line.isJob = !job.isInternship;
                if (months[months.length - 1])
                    line.isFirstOrLast = !months[months.length - 1].isJob;
            }
            
            if (!line.isJob && months[months.length - 1]?.isJob)
                months[months.length - 1].isFirstOrLast = true;

            // Move to the next month
            currentDate.setMonth(currentDate.getMonth() + 1);
            months.push(line);
        }

        if (months[months.length - 1].isJob)
            months[months.length - 1].isFirstOrLast = true;

        return months;
    }

    export let jobs = [];
</script>

<div class="grid">
    {#each getMonthsBetweenDates(new Date(jobs[0].startingDate), new Date()) as month}
        <span class="timeline-bar" class:is-internship={month.isIntenship} class:is-job={month.isJob} class:first-or-last={month.isFirstOrLast}/>
    {/each}
</div>

<style>
    .timeline-bar {
        transition: 0.3s;
        display: block;
        margin: 0 0.1rem;
        width: 0.3rem;
        height: 1rem;
        border-radius: 0.4rem;
        background-color: var(--color-bg-secondary);
    }
    .timeline-bar.is-internship {
        background-color: var(--color-primary-dim);
        height: 1.5rem;
    }
    .timeline-bar.is-job {
        background-color: var(--color-primary);
        height: 2rem;
    }
    .timeline-bar.first-or-last {
        height: 1.5rem;
    }
    .timeline-bar:hover {
        transform: scaleY(1.2);
    }
</style>
