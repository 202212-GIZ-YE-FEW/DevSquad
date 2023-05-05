export default function paginate(items, pageNumber, pageSize) {
    // get the pageNumber muins one and multiple by the page size 2 it will be 1-1 =0 *2 =0
    const startIndex = (pageNumber - 1) * pageSize;
    // get the events from the index 0 to the index 2 whitch will take to events and so on for the rest of events
    return items.slice(startIndex, startIndex + pageSize);
}
