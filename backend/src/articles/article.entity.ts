export class ArticleEntity {

    public readonly id: number;
    public readonly title: string;
    public readonly text: string;
    public readonly createdAt: string;
    public readonly category: string;
    public readonly author: {
        id: number;
        email: string;
        login: string;
        birthDate: string;
        image: string;
        role: string;
    }

    constructor(obj: {
        id: number;
        title: string;
        text: string;
        created_at: string;
        category: string;
        author_id: number;
        author_email: string;
        author_login: string;
        author_birth_date: string;
        author_image: string;
        author_role: string;
    }) {
        this.id = obj.id;
        this.title = obj.title;
        this.text = obj.text;
        this.createdAt = obj.created_at;
        this.category = obj.category;
        this.author = {
            id: obj.author_id,
            email: obj.author_email,
            login: obj.author_login,
            birthDate: obj.author_birth_date,
            image: obj.author_image,
            role: obj.author_role
        }
    }
};