export function getDateRange(singleDate: string | undefined, fromDate: string | undefined, toDate: string | undefined) {
    if (singleDate) {
        const date = new Date(singleDate);
        const to = new Date(date);
        to.setHours(date.getHours() + 24);
        return { range: true, from: date, to };
    } else if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        to.setHours(from.getHours() + 24);
        return { range: true, from, to };
    }
    return { range: false, from: undefined, to: undefined };
}
