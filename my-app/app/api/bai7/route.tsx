import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const minPrice = Number(url.searchParams.get('minPrice')) || 0;
  const maxPrice = Number(url.searchParams.get('maxPrice')) || Infinity;

  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await res.json();
    const filteredProducts = products.filter(
      (product: { price: number }) => product.price >= minPrice && product.price <= maxPrice
    );
    return NextResponse.json(filteredProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.error();
  }
}
