interface NoteData {
    categories: Category[];
}

interface Category {
    id: number;
    name: string;
    content: Content[];
}

interface Content {
    id: number;
    title: string;
    description: string;
    modifyDate: string;
}
