document.addEventListener('DOMContentLoaded', function() {
    const cartSidebar = document.getElementById('cartSidebar');
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartBody = cartSidebar.querySelector('.cart-body');
    const cartTotal = document.getElementById('cartTotal');
    const itemAddedModal = new bootstrap.Modal(document.getElementById('itemAddedModal')); // Bootstrap modal instance
    let cartItems = [];
    let totalPrice = 0;

    function updateCart() {
        cartBody.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <strong>${item.name}</strong>
                    <p>${item.size} - $${item.price.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-danger remove-item" data-name="${item.name}">Remove</button>
            `;
            cartBody.appendChild(itemElement);
        });
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    function addItemToCart(item) {
        cartItems.push(item);
        totalPrice += item.price;
        updateCart();
        itemAddedModal.show(); // Show the "Item added to cart!" modal
        setTimeout(() => {
            itemAddedModal.hide(); // Automatically hide the modal after 2 seconds
        }, 2000);
    }

    function removeItemFromCart(itemName) {
        const itemIndex = cartItems.findIndex(item => item.name === itemName);
        if (itemIndex > -1) {
            totalPrice -= cartItems[itemIndex].price;
            cartItems.splice(itemIndex, 1);
            updateCart();
        }
    }

    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const sizeSelectId = this.getAttribute('data-size-select-id');
            const sizeSelect = document.getElementById(sizeSelectId);
            const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
            const productPrice = parseFloat(selectedOption.value);
            
            // Ensure price is a valid number
            if (isNaN(productPrice)) {
                alert('Invalid product price');
                return;
            }

            const productSize = selectedOption.getAttribute('data-size');
            const productImage = this.closest('.modal-body').querySelector('img').src;

            const item = {
                name: productName,
                price: productPrice,
                size: productSize,
                image: productImage
            };

            addItemToCart(item);
        });
    });

    // Open cart sidebar
    openCartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('open');
    });

    // Close cart sidebar
    closeCartBtn.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
    });

    // Delegate click events for remove buttons
    cartBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-item')) {
            const itemName = event.target.getAttribute('data-name');
            removeItemFromCart(itemName);
        }
    });
});
