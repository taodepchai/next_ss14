"use client";
import React from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await res.json();
  return data;
};

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <h1>Product List</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}

interface ProductListProps {
  initialProducts: Product[];
}

const ProductList = React.memo(({ initialProducts }: ProductListProps) => {


  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [maxPrice, setMaxPrice] = React.useState<number>(Infinity);
  const [error, setError] = React.useState<string | null>(null);

  const handleFilter = async () => {
    try {
      const response = await fetch(`/api/filter-products?minPrice=${minPrice}&maxPrice=${maxPrice}`);
      if (!response.ok) {
        throw new Error('Failed to fetch filtered products');
      }
      const filteredProducts = await response.json();
      setProducts(filteredProducts);
    } catch (error: any) {
      console.error('Error filtering products:', error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
});
