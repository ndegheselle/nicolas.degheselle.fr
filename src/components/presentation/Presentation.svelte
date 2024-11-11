<script>
  import Card from "@components/Card.svelte";
  import Guidelines from "./Guidlines.svelte";
  import { useTranslations } from "@i18n/utils";

  export let me = {};
  export let lang = "";
  const t = useTranslations(lang);
</script>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-who">
  {t("title.who")}
</h2>
<div class="grid with-gutter">
  <div class="col is-6 on-sm-is-12">
    <Card>
      <div slot="title">
        <h2>{t("title.me")}</h2>
        <div>
          {#each me.tags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
      </div>
      <p>
        {@html me.description}
      </p>
    </Card>
  </div>
</div>

<h2 class="giant-title is-overlapping fil-ariane-balise" id="title-how">
  {t("title.how")}
</h2>
<Guidelines guidelines={me.guidelines} />
