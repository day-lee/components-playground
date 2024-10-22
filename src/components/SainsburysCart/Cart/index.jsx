import { useState } from "react";
function Cart({
  allProduct,
  cart,
  addToCart,
  decreaseCartItem,
  removeFromCart,
}) {
  const [isHovered, setIsHovered] = useState(false);
  // count the items in the cart
  const counter = new Map();
  cart.forEach((productId) =>
    counter.set(productId, (counter.get(productId) ?? 0) + 1)
  );

  const productLookup = new Map(
    allProduct.map((product) => [product.productId, product])
  );

  // summary of cart items
  const cartInformation = Array.from(counter).reduce(
    (acc, item) => {
      const productId = item[0];
      const data = productLookup.get(productId);
      const title = data.title;
      const quantity = counter.get(productId);
      const subtotal = parseFloat((quantity * data.price).toFixed(2));
      acc.lines.push({ productId, title, quantity, subtotal });
      acc.totalQuantity += quantity;
      acc.totalPrice += subtotal;
      return acc;
    },
    {
      lines: [],
      totalQuantity: 0,
      totalPrice: 0,
    }
  );
  const { lines, totalQuantity, totalPrice } = cartInformation;

  return (
    <div>
      <div className="border-2 p-2 m-2">
        <div>
          <p>Your basket ({totalQuantity} items) </p>
        </div>
        <div>
          <p> Total: {totalPrice.toFixed(2)} </p>
        </div>
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          show Item
        </button>
        {cart.length > 0 && isHovered && (
          <>
            <ul>
              {lines.map((item) => {
                return (
                  <li key={item.productId}>
                    <div>{item.title}</div>
                    <div>{item.quantity}</div>
                    <div>{item.subtotal}</div>
                    <button onClick={() => addToCart(item.productId)}>+</button>
                    <button onClick={() => decreaseCartItem(item.productId)}>
                      -
                    </button>
                    <button onClick={() => removeFromCart(item.productId)}>
                      remove
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
