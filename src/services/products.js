const API_URL = "https://dummyjson.com/products";

async function request(url, signal) {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Unable to load products right now.");
  }
  return response.json();
}

export async function fetchProducts(signal) {
  const data = await request(`${API_URL}?limit=0`, signal);
  return data.products || [];
}

export async function fetchProductById(id, signal) {
  return request(`${API_URL}/${encodeURIComponent(id)}`, signal);
}

export async function fetchProductsByCategory(category, signal) {
  const data = await request(`${API_URL}/category/${encodeURIComponent(category)}`, signal);
  return data.products || [];
}

export async function searchProducts(query, signal) {
  const data = await request(`${API_URL}/search?q=${encodeURIComponent(query)}`, signal);
  return data.products || [];
}

export async function fetchCategories(signal) {
  return request(`${API_URL}/categories`, signal);
}
