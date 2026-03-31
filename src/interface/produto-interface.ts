export interface IProduto {
    id: number;
    image: string;
    thumbnails: string[];
    nome: String;
    description: string;
    price: number;
    destaque?: boolean;
    favorito?: boolean;
}