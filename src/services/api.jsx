const BASE_URL = "https://test.tsdtecheg.com/api/products";

// GET ALL PRODUCTS
export async function getProducts() {

  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.data;
}

// FILTER PRODUCTS BY CATEGORY ID
export async function getProductsByCategory(categoryId) {

  const response = await fetch(
    `${BASE_URL}?category_id=${categoryId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data = await response.json();

  return data.data;
}