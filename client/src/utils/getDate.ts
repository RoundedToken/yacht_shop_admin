export function getDate(isoDate: string): string {
    const date = new Date(isoDate);

    return date.toLocaleString('default', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
}
