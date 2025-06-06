<script>
    import { formatDate } from "@base/utils.js";
    import { useTranslations } from "@i18n/utils";

    function isDifferenceMoreThanFiveMonths(date1, date2) {
        date2 = date2 || new Date();
        var differenceInMilliseconds = Math.abs(
            new Date(date1) - new Date(date2),
        );
        var differenceInMonths =
            differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44); // Average number of days in a month
        return differenceInMonths > 5;
    }

    function formatLink(link) {
        link = link.replace("http://", "");
        link = link.replace("https://", "");
        return link;
    }

    export let cv = {};
    export let lang = "";
    const t = useTranslations(lang);
</script>

<header>
    <div class="grid is-auto">
        <div class="col main-header is-9 is-content">
            <h1>{cv.name}</h1>
            <p>{cv.description}</p>
        </div>
        <span class="col contacts">
            <a href="mailto:{cv.contact.email}">{cv.contact.email}</a>
            <a href={cv.contact.website}>{formatLink(cv.contact.website)}</a>
            <a href={cv.contact.linkedin}>linkedin</a>
            <span>{cv.contact.phone}</span>
        </span>
    </div>
</header>

<main>
    <div class="grid is-auto">
        <h2 class="col is-auto">{t("cv.experience")}</h2>
        <span class="col is-separator"></span>
    </div>

    <section class="part">
        {#each cv.experiences as experience}
            {#if isDifferenceMoreThanFiveMonths(experience.from, experience.to)}
                <div class="grid is-auto">
                    <div class="col is-sub is-date-col on-md-is-12">
                        <span class="subtitle">
                            {formatDate(experience.from)} -
                        </span>
                        <span class="subtitle">
                            {#if experience.to}
                                {formatDate(experience.to)}
                            {:else}
                                {t("time.present")}
                            {/if}
                        </span>
                    </div>
                    <div class="col is-content">
                        <h3>{@html experience.position}</h3>
                        <span class="subtitle">
                            {experience.company} - {experience.location}
                        </span>
                        {#if experience.responsibilities}
                            <ul>
                                {#each experience.responsibilities as responsibility}
                                    <li>{@html responsibility}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </div>
            {/if}
        {/each}
    </section>

    <div class="grid is-auto">
        <h2 class="col is-auto">{t("cv.education")}</h2>
        <span class="col is-separator"></span>
    </div>

    {#each cv.educations as education}
        <div class="grid is-auto">
            <div class="col is-sub is-date-col on-md-is-12">
                <span class="subtitle">
                    {formatDate(education.from)} -
                </span>
                <span class="subtitle">
                    {#if education.to}
                        {formatDate(education.to)}
                    {:else}
                        {t("time.present")}
                    {/if}
                </span>
            </div>
            <div class="col is-content">
                <h3>{education.name}</h3>
                <span class="subtitle">{education.location}</span>
                <p>{education.description}</p>
            </div>
        </div>
    {/each}

    <div class="grid is-auto">
        <h2 class="col is-auto">{t("cv.skills")}</h2>
        <span class="col is-separator"></span>
    </div>

    {#each Object.entries(cv.skills) as [name, skill]}
        <div class="grid is-auto">
            <div class="col is-sub on-md-is-12">
                <span class="subtitle">
                    {name}
                </span>
            </div>
            <div class="col is-content is-small">
                <div class="tags">
                    {#each skill[0] as tag}<span class="tag">{tag}</span>{/each}
                    {#if skill[1]}{#each skill[1] as tag}<span
                                class="tag-secondary">{tag}</span
                            >{/each}{/if}
                </div>
            </div>
        </div>
    {/each}

    <div class="grid is-auto">
        <h2 class="col is-auto">{t("cv.certifications")}</h2>
        <span class="col is-separator"></span>
    </div>
    {#each cv.certifications as certification}
        <div class="grid is-auto">
            <div class="col is-sub on-md-is-12">
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
    @use "../../../scss/gracile/variables.scss" as *;

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
            // font-size: 13.75px;
            font-size: 15px;
        }
        :global(.side-menu) {
            display: none !important;
        }
    }

    // PDF safe fonts
    * {
        font-family: "Trebuchet MS", sans-serif !important;
    }

    header {
        background: var(--color-background-more-3);
        padding: 3rem 3rem 1rem 3rem;
    }

    .main-header {
        border-bottom: 0.2rem var(--color-primary-less) solid;
        border-top: 0.2rem var(--color-primary-less) solid;
        padding-right: 1rem;
    }

    .main-header p {
        text-align: justify;
    }

    main {
        margin: 1rem 3rem;
    }

    h1,
    h2,
    h3 {
        font-weight: bold;
    }
    h1 {
        font-size: 2rem;
    }
    h2 {
        font-size: 1.4rem;
        margin: 0.4rem 0 0.6rem 0 !important;
    }
    h3 {
        font-size: 1rem;
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

    .is-sub {
        flex: 0 0 5.5rem;
    }

    .is-date-col {
        display: flex;
        flex-direction: column;
    }

    .is-content {
        border-left: 0.1rem solid var(--color-background-more-3);
        margin-left: 0.2rem;
        padding-left: 0.6rem;
    }

    .is-content.is-small {
        padding-bottom: 0;
    }

    .is-separator {
        border-top: 0.1rem solid var(--color-background-more-3);
        margin: 0 0.8rem;
    }

    .is-start {
        align-items: start;
    }
</style>
