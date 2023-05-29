interface NoteData {
    categories: Category[];
}

interface Category {
    name:          string;
    subcategories: Subcategory[];
}

interface Subcategory {
    name:    string;
    content: Content[];
}

interface Content {
    title:       string;
    description: string;
}
