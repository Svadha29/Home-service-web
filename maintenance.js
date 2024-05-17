document.addEventListener("DOMContentLoaded", function() {
    const serviceBoxes = document.querySelectorAll(".service-box");
    const cartCountElement = document.getElementById("cart");
    const taskOption = document.querySelector(".dropdown[data-dropdown='task']");
    const taskList = document.getElementById("task-list");
   

    let cartItems = [];

    // Function to add service to cart
    function addToCart(service) {
        cartItems.push(service);
        updateCartCount();
    }

   

    // Function to update cart count 
    function updateCartCount() {
        cartCountElement.textContent = 'Cart (' + cartItems.length + ')';
    }

    // Event listeners for hover and click on service boxes
    serviceBoxes.forEach(box => {
        box.addEventListener("mouseenter", function() {
            const addToCartBtn = document.createElement("button");
            addToCartBtn.textContent = "Add to Cart";
            addToCartBtn.classList.add("add-to-cart-btn");
            this.appendChild(addToCartBtn);

            addToCartBtn.addEventListener("click", function(event) {
                event.stopPropagation(); // Prevent parent click event
                const service = box.dataset.service;
                const addToCartConfirm = confirm(`Add ${service} to cart?`);

                if (addToCartConfirm) {
                    addToCart(service);
                }
            });
        });

        box.addEventListener("mouseleave", function() {
            const addToCartBtn = this.querySelector(".add-to-cart-btn");
            if (addToCartBtn) {
                addToCartBtn.remove();
            }
        });
    });

    // Event listener for task option click
    taskOption.addEventListener("click", function() {
        taskList.innerHTML = ""; // Clear previous list items

        if (cartItems.length === 0) {
            taskList.textContent = "No items in the cart";
        } else {
            cartItems.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                taskList.appendChild(listItem);
            });
        }

        // Show modal
        taskModal.style.display = "block";
    });

    // Event listener to close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === taskModal) {
            taskModal.style.display = "none";
        }
    });
  // Event listener for close button
  closeButton.addEventListener("click", function() {
    taskModal.style.display = "none";
});

});