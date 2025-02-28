document.addEventListener('DOMContentLoaded', () => {
    // Array to hold cart items
    let cart = [];

    // Fetch the product data from the backend
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');

            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');

                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
                `;

                productList.appendChild(productItem);
            });

            // Event listeners for "Add to Cart" buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });

            // Function to add products to the cart
            function addToCart(event) {
                const button = event.target;
                const productId = button.getAttribute('data-id');
                const productName = button.getAttribute('data-name');
                const productPrice = parseFloat(button.getAttribute('data-price'));

                const product = { id: productId, name: productName, price: productPrice };

                // Add the product to the cart array
                cart.push(product);
                updateCart();
            }

            // Function to update the cart display and total price
            function updateCart() {
                const cartItems = document.getElementById('cart-items');
                const totalPriceElem = document.getElementById('total-price');
                cartItems.innerHTML = ''; // Clear the current cart items

                let totalPrice = 0;
                cart.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${item.name} - $${item.price}`;
                    cartItems.appendChild(listItem);
                    totalPrice += item.price;
                });

                totalPriceElem.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
            }

            // Checkout button functionality (just a placeholder for now)
            const checkoutButton = document.getElementById('checkout-btn');
            checkoutButton.addEventListener('click', () => {
                if (cart.length > 0) {
                    alert('Proceeding to checkout...');
                    // You can implement further checkout functionality here
                } else {
                    alert('Your cart is empty!');
                }
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
