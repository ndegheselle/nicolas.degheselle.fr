<script>
    import Card from "@components/Card.svelte";
    import { useTranslations } from "@i18n/utils";

    export let projects = [];
    export let lang = "";
    const t = useTranslations(lang);
</script>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-projects">
    {t("title.projects")}
</h2>
<div class="grid with-gutter">
    {#each projects as project}
        <div class="col is-3 on-sm-is-12">
            <Card>
                <div slot="title">
                    <h3>
                        {project.data.name}
                        <a href={project.data.url} class="ml-2 project-link" aria-label="Project link">
                            <i class="fa-solid fa-link"></i>
                        </a>
                    </h3>
                </div>
                <img
                    class="project-preview"
                    src={project.data.pictureUrl}
                    alt="Project preview"
                />
                <p>
                    {@html project.rendered.html}
                </p>
            </Card>
        </div>
    {/each}
</div>

<style>
    .project-link {
        font-size: 0.8rem;
    }

    .project-preview {
        width: 100%;
        max-height: 6rem;
        object-fit: cover;
        object-position: top;
    }
</style>
