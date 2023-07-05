interface NoteData {
    categories: Category[];
}

interface Category {
    name: string;
    content: Content[];
}

interface Content {
    title: string;
    description: string;
    modifyDate: string;
}
