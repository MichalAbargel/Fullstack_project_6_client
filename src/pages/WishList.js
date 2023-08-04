import React, { useState } from 'react';

const WishList = () => {
  // דוגמא לרשימת פריטים ב-Wishlist
  const initialWishlistItems = [
    { id: 1, name: 'מוצר 1', price: 50 },
    { id: 2, name: 'מוצר 2', price: 30 },
    { id: 3, name: 'מוצר 3', price: 70 },
  ];

  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);

  // פונקציה להסרת פריט מה-Wishlist
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {wishlistItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromWishlist(item.id)}>הסר</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
