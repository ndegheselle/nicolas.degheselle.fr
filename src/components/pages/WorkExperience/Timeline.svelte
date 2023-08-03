<script lang="ts">
    export let experiences: any[] = [];
</script>

{#each experiences as experience}
    <div class="timeline-item">
        <div class="timeline-item-content">
            <span class="tag" style="background: #018f69;">{experience.duration}</span>
            <time>{experience.time}</time>
            <p>{experience.description}</p>
            <span class="circle"></span>
        </div>
    </div>
{/each}