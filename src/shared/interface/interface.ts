export class Page {
    pageNumber = 1;
    pageSize = 10;
    sorts: Sort[] | undefined;
}
export class Sort {
    colId: String | undefined;
    sort: String | undefined;
}

export class ComboBox {
    query: String | undefined;
    from: String | undefined;
    to: String | undefined;
    currentValue: String | undefined;
    limit = 10;
}
export class PublicAnnounce {
    websiteCode: String | undefined;
    subjectCode: String | undefined;
}
