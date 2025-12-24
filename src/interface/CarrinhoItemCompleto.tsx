export interface ICarrinhoItemCompleto {
    id: number;
    quantidade: number;
    produto: {
        id: number;
        name: string;
        price: number;
        description: string;
        image: string;
        imagens?: string[]; 
    };
}