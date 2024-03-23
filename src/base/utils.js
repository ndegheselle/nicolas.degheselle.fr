export function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
    }).replace(/^\w/, c => c.toUpperCase());
}

export function formatDates(timestamp1, timestamp2) {
    if (timestamp2 == null)
        return formatDate(timestamp1);
    return formatDate(timestamp1) + " - " + formatDate(timestamp2);
}