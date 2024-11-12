<script>
    import Card from "@components/Card.svelte";
    import { useTranslations } from "@i18n/utils";
    
    export let guidelines = [];
    export let lang = "";
    const t = useTranslations(lang);
</script>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-how">
    {t("title.how")}
</h2>
<div class="grid with-gutter">
    {#each guidelines as guideline}
        <div class="col on-sm-is-12">
            <Card>
                <h3 slot="title">{guideline.title}</h3>
                <p>{guideline.description}</p>
            </Card>
        </div>
    {/each}
</div>
