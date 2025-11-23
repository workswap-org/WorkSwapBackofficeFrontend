export type User = {
    id: number;
    type: string;
    name: string;
    phone: string | null;
    email: string;
    bio: string | null;
    avatarUrl: string | null;
    provider: string;
    languages: string[];
    roles: string[];
    status: string | null;
    rating: number | null;
    createdAt: string;
};