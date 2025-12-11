export interface Unit {
    id: string;
    name: string;
    code: string;
    description?: string;
    isActive: boolean;
    parentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Designation {
    id: string;
    title: string;
    code: string;
    description?: string;
    level?: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
