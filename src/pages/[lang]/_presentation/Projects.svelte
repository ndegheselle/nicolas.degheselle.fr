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
                        {project.name}
                        <a href={project.url} class="ml-2 project-link">
                            <i class="fa-solid fa-link"></i>
                        </a>
                    </h3>
                </div>
                <img
                    class="project-preview"
                    src={project.pictureUrl}
                    alt="Project {project.name} preview."
                />
                <p>
                    {@html project.description}
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
