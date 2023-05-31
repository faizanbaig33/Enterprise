import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const favoriteProductsLinks = document.querySelectorAll('.favorite-product');
    favoriteProductsLinks.forEach((link) => {
      link.addEventListener('click', handleFavoriteProductClick);
    });

    const favoritesProductsStr = localStorage.getItem('aw_favorites_products');
    const favoritesProducts = (favoritesProductsStr && JSON.parse(favoritesProductsStr)) || [];

    if (favoritesProducts.length === 0) {
      localStorage.removeItem('aw_favorites_products');
    } else {
      localStorage.setItem(
        'aw_favorites_products',
        JSON.stringify(favoritesProducts.filter((p: any) => p !== ''))
      );
    }

    const aw_favorites_products = localStorage.getItem('aw_favorites_products');
    const favoritesProductsSaved = aw_favorites_products ? JSON.parse(aw_favorites_products) : [];
    setFavoriteProducts(favoritesProductsSaved);

    document.addEventListener('click', handleFavoriteProductClick);

    return () => {
      favoriteProductsLinks.forEach((link) => {
        link.removeEventListener('click', handleFavoriteProductClick);
      });
    };
  }, []);

  const handleFavoriteProductClick = (event: any) => {
    const link = event.target.closest('.favorite-product');
    if (!link) return;
    const productID = link.getAttribute('data-product-id');

    // Favorites Products array from local storage,
    const favoritesProducts = JSON.parse(localStorage.getItem('aw_favorites_products') || '[]');

    // check if the product id already exists in the Favorites Products array
    const existingProductIndex = favoritesProducts.findIndex((obj: any) => obj === productID);

    if (existingProductIndex !== -1) {
      // If the product id already exists, remove it from the array
      favoritesProducts.splice(existingProductIndex, 1);
      link.classList.remove('favorited', 'border-[transparent_#f26924_transparent_transparent]');
    } else {
      // If the product id is new, add it to the array
      favoritesProducts.unshift(productID);
      link.classList.add('favorited', 'border-[transparent_#f26924_transparent_transparent]');
    }

    // if the Favorites Products array is empty, remove the key from local storage
    if (favoritesProducts.length === 0) {
      localStorage.removeItem('aw_favorites_products');
    } else {
      // Save the updated Favorites Products array back to local storage
      localStorage.setItem('aw_favorites_products', JSON.stringify(favoritesProducts));
      const favoritesProductsSaved = JSON.parse(
        localStorage.getItem('aw_favorites_products') || '[]'
      );
      setFavoriteProducts(favoritesProductsSaved);
    }
  };

  return favoriteProducts;
};
