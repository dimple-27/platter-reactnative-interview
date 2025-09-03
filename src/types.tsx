interface Product {
  name: string;
  quantity: number;
  salePrice?: {
    quantity: number;
    price: number;
  };
  unitPrice: number;
  id: number;
  cartPrice?: number;
}
