console.log('Cart JavaScript loaded!'); // Debug log

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing cart...'); // Debug log
    
    // Cart data structure
    let cartItems = [
        {
            id: 1,
            name: "Nintendo Switch",
            price: 28500,
            quantity: 2,
            image: "../assets/img/nin1.png"
        },
        {
            id: 2,
            name: "McFarlane-Witcher",
            price: 3000,
            quantity: 2,
            image: "../assets/img/figure.png"
        },
        {
            id: 3,
            name: "Playstation DualSense",
            price: 3500,
            quantity: 2,
            image: "../assets/img/headset.png"
        }
    ];

    let sortOrder = 'asc'; // Track sort order

  
    updateCartDisplay();

    // Add event listeners for quantity buttons
    function addQuantityListeners() {
        // Use event delegation for better handling of dynamically created elements
        const cartContainer = document.querySelector('.col-md-8');
        if (!cartContainer) return;

        // Remove old event listeners
        cartContainer.removeEventListener('click', handleCartClick);
        
        // Add new event listener using delegation
        cartContainer.addEventListener('click', handleCartClick);
    }

    // Handle all cart clicks using event delegation
    function handleCartClick(event) {
        const target = event.target;
        
        // Handle minus button
        if (target.classList.contains('fa-minus')) {
            const cartItem = target.closest('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const cartItemsElements = document.querySelectorAll('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const index = Array.from(cartItemsElements).indexOf(cartItem);
            console.log('Minus clicked for index:', index);
            decreaseQuantity(index);
        }
        
        // Handle plus button
        else if (target.classList.contains('fa-plus')) {
            const cartItem = target.closest('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const cartItemsElements = document.querySelectorAll('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const index = Array.from(cartItemsElements).indexOf(cartItem);
            console.log('Plus clicked for index:', index);
            increaseQuantity(index);
        }
        
        // Handle delete button
        else if (target.classList.contains('fa-trash')) {
            const cartItem = target.closest('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const cartItemsElements = document.querySelectorAll('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
            const index = Array.from(cartItemsElements).indexOf(cartItem);
            console.log('Delete clicked for index:', index);
            removeItem(index);
        }
    }

    // Add sort functionality
    function addSortListener() {
        const sortButton = document.querySelector('.fa-angle-down');
        if (sortButton) {
            sortButton.onclick = () => {
                sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                sortCartItems();
                updateCartDisplay();
                updateSortButtonVisual();
            };
        }
    }

    // Update sort button visual
    function updateSortButtonVisual() {
        const sortButton = document.querySelector('.fa-angle-down');
        if (sortButton) {
            if (sortOrder === 'desc') {
                sortButton.classList.add('sort-desc');
        } else {
                sortButton.classList.remove('sort-desc');
        }
        }
    }

    // Sort cart items by price
    function sortCartItems() {
        cartItems.sort((a, b) => {
            const priceA = a.price * a.quantity;
            const priceB = b.price * b.quantity;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
    }

    // Increase quantity
    function increaseQuantity(index) {
        if (index < cartItems.length) {
            cartItems[index].quantity++;
            updateCartDisplay();
        }
    }

    // Decrease quantity
    function decreaseQuantity(index) {
        if (index < cartItems.length && cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            updateCartDisplay();
        }
    }

    // Remove item
    function removeItem(index) {
        console.log('Remove item called for index:', index); // Debug log
        if (window.confirm("Are you sure you want to remove this item from your cart?")) {
            console.log('Before removal - cartItems length:', cartItems.length); // Debug log
            cartItems.splice(index, 1);
            console.log('After removal - cartItems length:', cartItems.length); // Debug log
            updateCartDisplay();
        }
    }

    // Update cart display
    function updateCartDisplay() {
        const cartContainer = document.querySelector('.col-md-8');
        if (!cartContainer) {
            console.log('Cart container not found'); // Debug log
            return;
        }

        // Clear existing cart items (except header and footer)
        const existingItems = cartContainer.querySelectorAll('.d-flex.flex-row.justify-content-between.align-items-center.p-2.bg-white.mt-4.px-3.rounded');
        existingItems.forEach(item => item.remove());

        // Clear total if exists
        const existingTotal = document.querySelector('.cart-total');
        if (existingTotal) {
            existingTotal.remove();
        }

        console.log('Updating cart display with', cartItems.length, 'items'); // Debug log

        // Rebuild cart items
        cartItems.forEach((item, index) => {
            const cartItemHTML = `
                <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                    <div class="mr-1"><img class="rounded" src="${item.image}" width="70"></div>
                    <div class="d-flex flex-column align-items-center product-details">
                        <span class="font-weight-bold">${item.name}</span>
                        <div class="d-flex flex-row product-desc">
                            <div class=""><span class="text-grey"></span><span class="font-weight-bold">&nbsp;</span></div>
                        </div>
                    </div>
                    <div class="d-flex flex-row align-items-center qty">
                        <i class="fa fa-minus text-danger" style="cursor: pointer;"></i>
                        <h5 class="text-grey mt-1 mr-1 ml-1">${item.quantity}</h5>
                        <i class="fa fa-plus text-success" style="cursor: pointer;"></i>
                    </div>
                    <div>
                        <h5 class="text-grey">${(item.price * item.quantity).toLocaleString()}E£</h5>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fa fa-trash mb-1 text-danger" style="cursor: pointer;"></i>
                    </div>
                </div>
            `;
            
            // Insert before the discount code section
            const discountSection = cartContainer.querySelector('.d-flex.flex-row.align-items-center.mt-3.p-2.bg-white.rounded');
            if (discountSection) {
                discountSection.insertAdjacentHTML('beforebegin', cartItemHTML);
}
        });

        // Update total
        updateTotal();

        // Re-add event listeners
        addQuantityListeners();
        addSortListener();
    }

    // Update total price
    function updateTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Add total display if it doesn't exist
        let totalElement = document.querySelector('.cart-total');
        if (!totalElement) {
            const discountSection = document.querySelector('.d-flex.flex-row.align-items-center.mt-3.p-2.bg-white.rounded');
            if (discountSection) {
                const totalHTML = `
                    <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-3 px-3 rounded cart-total">
                        <h4 class="font-weight-bold">Total:</h4>
                        <h4 class="font-weight-bold text-success">${total.toLocaleString()}E£</h4>
                    </div>
                `;
                discountSection.insertAdjacentHTML('beforebegin', totalHTML);
            }
        } else {
            totalElement.querySelector('h4:last-child').textContent = `${total.toLocaleString()}E£`;
        }
    }

    // Initialize event listeners
    addQuantityListeners();
    addSortListener();

    // Test function to verify JavaScript is working
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.onclick = () => {
            alert('JavaScript is working! Cart has ' + cartItems.length + ' items.');
            console.log('Test button clicked - cart items:', cartItems);
        };
    }
});