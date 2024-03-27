<script>
    import { formatDate, formatDates } from "@base/utils.js";

    function isDifferenceMoreThanFiveMonths(date1, date2) {
        date2 = date2 || new Date();
        var differenceInMilliseconds = Math.abs(
            new Date(date1) - new Date(date2),
        );
        var differenceInMonths =
            differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44); // Average number of days in a month
        return differenceInMonths > 5;
    }

    export let jobs = [];
    export let profile = {};
    export let me = {};
</script>

<header>
    <div class="grid is-auto">
        <div class="col main-header is-9 is-content">
            <h1>Nicolas DE GHESELLE</h1>
            <p>{ profile.description || me.description}</p>
        </div>
        <span class="col contacts">
            <a href="mailto:nicolas@degheselle.fr">nicolas@degheselle.fr</a>
            <a href="http://nicolas.degheselle.fr/">nicolas.degheselle.fr</a>
            <span>+33 7 68 18 51 80</span>
        </span>
    </div>
</header>

<main>
    <div class="grid is-auto">
        <h2 class="col is-auto">Work Experience</h2>
        <span class="col is-separator"></span>
    </div>

    <section class="part">
        {#each [...jobs].reverse() as job}
            {#if isDifferenceMoreThanFiveMonths(job.startingDate, job.endingDate)}
                <div class="grid is-auto">
                    <div class="col is-1 on-md-is-12">
                        <span class="subtitle">
                            {formatDates(job.startingDate, job.endingDate)}
                        </span>
                    </div>
                    <div class="col is-content">
                        <h3>{job.title}</h3>
                        <span class="subtitle">
                            {job.company} - {job.location}
                        </span>
                        <p>{@html job.description}</p>
                    </div>
                </div>
            {/if}
        {/each}
    </section>

    <div class="grid is-auto">
        <h2 class="col is-auto">Education</h2>
        <span class="col is-separator"></span>
    </div>

    {#each me.educations as education}
        <div class="grid is-auto">
            <div class="col is-1 on-md-is-12">
                <span class="subtitle">
                    {formatDate(education.date)}
                </span>
            </div>
            <div class="col is-content">
                <h3>{education.name}</h3>
                <span class="subtitle">{@html education.description}</span>
            </div>
        </div>
    {/each}

    <div class="grid is-auto">
        <h2 class="col is-auto">Skills</h2>
        <span class="col is-separator"></span>
    </div>

        <div class="grid">
            <div class="col is-1 on-md-is-12">
            </div>
            <div class="col is-content">
                {#each profile.skills as skill}
                <div class="tags">
                    {#each skill.items as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
                {/each}
            </div>

        </div>

    <div class="grid is-auto">
        <h2 class="col is-auto">Certifications and Licenses</h2>
        <span class="col is-separator"></span>
    </div>
    {#each me.certifications as certification}
        <div class="grid is-auto">
            <div class="col is-1 on-md-is-12">
                <span class="subtitle">
                    {formatDate(certification.date)}
                </span>
            </div>
            <div class="col is-content">
                <h3>{certification.name}</h3>
                <span class="subtitle">{@html certification.description}</span>
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
    @import "../../scss/gracile/variables.scss";

    @media screen and (max-width: $breakpoint-md) {
        header {
            padding: 1rem !important;
        }

        main {
            margin: 1rem !important;
        }
    }

    @media print {
        :global(html) {
            font-size: 15px;
        }
        :global(.side-menu) {
            display: none;
        }
    }

    header {
        background: var(--color-background-more-1);
        padding: 3rem 3rem 1rem 3rem;
    }

    .main-header {
        border-bottom: 0.2rem var(--color-primary-less) solid;
        border-top: 0.2rem var(--color-primary-less) solid;
    }

    main {
        margin: 1rem 3rem;
    }

    h1,
    h2,
    h3,
    p {
        margin: 0;
    }

    h2::before {
        content: "#";
        color: var(--color-primary);
        margin-right: 0.2rem;
    }

    .contacts {
        display: flex;
        flex-direction: column;

        text-align: right;
    }

    .is-content {
        border-left: 0.1rem solid var(--color-background-more-1);
        margin-left: 0.2rem;
        padding-left: 0.6rem;
        padding-bottom: 0.4rem;
    }

    .is-separator {
        border-top: 0.1rem solid var(--color-background-more-1);
        margin: 0 0.8rem;
    }

    .tag {
        display: inline-block;
        background: var(--color-background-more-1);
        padding: 0.2rem 0.8rem;
        border-radius: 0.2rem;
        margin-right: 0.1rem;
        margin-bottom: 0.1rem;
    }
</style>
