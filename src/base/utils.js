import { useTranslations } from "@i18n/utils";

export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
    }).replace(/^\w/, c => c.toUpperCase());
}

export function formatDates(timestamp1, timestamp2, lang = "en") {
    const t = useTranslations(lang);
    if (timestamp2 == null)
        return formatDate(timestamp1) + " - " + t("time.present");
    return formatDate(timestamp1) + " - " + formatDate(timestamp2);
}