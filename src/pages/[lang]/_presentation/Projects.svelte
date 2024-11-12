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
                <div slot="title" class="project-card-title">
                    <h3>{project.name}</h3>
                    <a href={project.url} class="ml-2">
                        <i class="fa-solid fa-link"></i>
                    </a>
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
    .project-card-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .project-card-title h3 {
        margin: 0;
    }

    .project-preview {
        width: 100%;
        max-height: 6rem;
        object-fit:  cover;
        object-position: top;
    }
</style>
