<script>
    export let projects = [];
</script>

<div class="grid with-gutter">
    {#each projects as project}
        <div class="col is-6 on-sm-is-12">
            <div class="card is-horizontal grid with-gap">
                <div class="col">
                    <img
                        class="project-preview"
                        src={project.pictureUrl}
                        alt="Project {project.name} preview."
                    />
                </div>
                <div class="col">
                    <div>
                        <span class="grid is-start">
                            <h3>{project.name}</h3>
                            <a href="{project.url}" class="ml-2">
                                <i class="fa-solid fa-link"></i>
                            </a>
                        </span>
                        <hr />
                        <p>
                            {@html project.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
.project-preview {
    height: 10rem;
}
</style>
