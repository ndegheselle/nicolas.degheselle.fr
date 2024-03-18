<script>
    import { formatDate, formatDates } from "@components/utils.js";

    export let jobs = [];
    export let me = {};
</script>

<header class="container">
    <div class="grid is-auto">
        <div class="col">
            <h1>Nicolas DE GHESELLE</h1>
        </div>
        <span class="col contacts">
            <a href="mailto:nicolas@degheselle.fr">nicolas@degheselle.fr</a>
            <a href="http://nicolas.degheselle.fr/">nicolas.degheselle.fr</a>
            <span>+33 7 68 18 51 80</span>
        </span>
    </div>
    <p>{me.description}</p>
</header>

<main class="container">

    <div class="grid is-auto">
        <h2 class="col is-auto">Expérience professionnelle</h2>
        <span class="col is-separator"></span>
    </div>

    <section class="part">
        {#each jobs as job }
        <div class="grid is-auto">
            <div class="col is-1 on-md-is-12">
                <span class="subtitle">
                    {formatDates(job.startingDate, job.endingDate)}
                </span>
            </div>
            <div class="col is-content">
                <h3>{job.title}</h3>
                <span class="subtitle">{job.company} - {job.location}</span>
                <p>{@html job.shortDescription}</p>
            </div>
        </div>

        {/each}
    </section>

    <div class="grid is-auto">
        <h2 class="col is-auto">Éducation</h2>
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
        <h2 class="col is-auto">Compétences</h2>
        <span class="col is-separator"></span>
    </div>

    <div class="grid is-auto">
        <h2 class="col is-auto">Cértifications et licenses</h2>
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

<style>
    header {
        background: var(--color-background-more-2);
    }

    h1, h2, h3, p {
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
        padding-left: 0.6rem;
        padding-bottom: 0.6rem;
    }

    .is-separator {
        border-top: 0.1rem solid var(--color-background-more-1);
        margin-left: 1rem;
    }

</style>