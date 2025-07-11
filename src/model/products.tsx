export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUri: string;
}


export const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Pizza Margherita',
        description: 'Molho de tomate, mussarela e manjericão fresco.',
        price: 35.00,
        imageUri: 'https://laticiniosbomdestino.com.br/2016/wp-content/uploads/2023/03/pizza-marguerita-com-mozzarella-de-bufala-bom-destino-scaled.jpg',
    },
    {
        id: '2',
        name: 'Hambúrguer Artesanal',
        description: 'Pão brioche, carne 180g, queijo cheddar e bacon.',
        price: 28.00,
        imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF_0B9XbtUUI7pOZmO7TQyLtgcuQ4eujwXA&s',
    },
    {
        id: '3',
        name: 'Salada Caesar',
        description: 'Alface, frango grelhado, parmesão e molho caesar.',
        price: 22.00,
        imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcqtOQGHJCk9x6BR8d0Coc7Xt1R9d0t-AlQ&s',
    },
];