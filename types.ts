export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  additional_price: number;
  inventory_count: number;
  sku_variant: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  base_price: number;
  price?: number;
  sku?: string;
  category: string;
  image_url?: string;
  image?: string;
  is_active?: boolean;
  originalPrice?: number;
  variants?: ProductVariant[];
}

export interface CartItem extends Product {
  quantity: number;
  size: string;
}

export interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
}
