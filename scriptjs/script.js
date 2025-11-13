document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu if a nav link is clicked (for single page smooth scroll or general navigation)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = header ? header.offsetHeight : 0; // Account for fixed header
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // Add some extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Dynamic "Add to Cart" functionality (for product cards) ---
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.closest('.product-card, .product-info').dataset.productId || 'N/A';
            const productName = event.target.closest('.product-card, .product-info').querySelector('h1, h3').textContent;
            
            // For product detail page, get quantity
            let quantity = 1;
            if (event.target.closest('.product-detail-page')) {
                const quantityInput = document.getElementById('quantity');
                if (quantityInput) {
                    quantity = parseInt(quantityInput.value, 10);
                }
            }

            alert(`${quantity} x ${productName} (ID: ${productId}) added to cart!`);
            // In a real e-commerce, you'd add this to local storage or send to a backend.
            updateCartIcon(); // Update cart count
        });
    });

    // --- Product Detail Page Image Gallery ---
    const mainProductImage = document.getElementById('mainProductImage');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');

    if (mainProductImage && thumbnailImages.length > 0) {
        thumbnailImages.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnailImages.forEach(img => img.classList.remove('active'));
                
                // Add active class to the clicked thumbnail
                thumbnail.classList.add('active');
                
                // Change main image source
                mainProductImage.src = thumbnail.src;
            });
        });
        // Set the first thumbnail as active initially
        thumbnailImages[0].classList.add('active');
    }

    // --- Quantity Selector on Product Detail Page ---
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');

    if (quantityInput && decreaseBtn && increaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantityInput.value, 10);
            if (currentQty > 1) {
                quantityInput.value = currentQty - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentQty = parseInt(quantityInput.value, 10);
            quantityInput.value = currentQty + 1;
        });

        quantityInput.addEventListener('change', () => {
            let currentQty = parseInt(quantityInput.value, 10);
            if (isNaN(currentQty) || currentQty < 1) {
                quantityInput.value = 1;
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            // If the element is within the viewport (e.g., 80% visible)
            if (elementTop < viewportHeight * 0.8) {
                element.classList.add('visible');
            }
        });
    };

    // Run once on load and then on scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- Dummy Cart Update (for demonstration) ---
    function updateCartIcon() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            let currentCount = parseInt(cartCountElement.textContent, 10);
            cartCountElement.textContent = currentCount + 1; // Just increment by 1 for any add
        }
    }
});