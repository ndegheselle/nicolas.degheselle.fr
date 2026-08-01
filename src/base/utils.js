import { useTranslations } from "@i18n/utils";

export function formatDate(timestamp, lang = "fr") {
    const local = lang == 'en' ? 'en-US' : 'fr-FR';
    return new Date(timestamp).toLocaleDateString(local, {
        year: "numeric",
        month: "short",
    }).replace(/^\w/, c => c.toUpperCase());
}

export function formatDates(timestamp1, timestamp2, lang = "fr") {
    const t = useTranslations(lang);
    if (timestamp2 == null)
        return formatDate(timestamp1) + " - " + t("time.present");
    return formatDate(timestamp1) + " - " + formatDate(timestamp2);
}