// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Product Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        filterProducts(category);
    });
});

function filterProducts(category) {
    productCards.forEach(card => {
        const productCategory = card.getAttribute('data-category');
        
        if (category === 'all' || category === productCategory) {
            card.style.display = 'block';
            // Add animation
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add animation keyframes to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Subscribe Button Functionality
const subscribeBtn = document.querySelector('.subscribe-btn');
const subscribeModal = document.getElementById('subscribeModal');
const closeSubscribe = document.querySelector('.close-subscribe');
const subscribeForm = document.getElementById('subscribeForm');

subscribeBtn.addEventListener('click', () => {
    subscribeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeSubscribe.addEventListener('click', () => {
    subscribeModal.classList.remove('active');
    document.body.style.overflow = '';
});

subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(subscribeForm);
    const name = formData.get('name');
    const email = formData.get('email');
    
    // Hide subscribe modal
    subscribeModal.classList.remove('active');
    
    // Show success animation
    const successAnimation = document.getElementById('successAnimation');
    successAnimation.classList.add('active');
    
    // Create confetti effect
    createConfetti();
    
    // Reset form and clean up after animation
    setTimeout(() => {
        successAnimation.classList.remove('active');
        document.body.style.overflow = '';
        subscribeForm.reset();
    }, 6000); // Increased duration to 6 seconds
});

// Confetti animation function
function createConfetti() {
    const colors = ['#ff4d00', '#ffd700', '#ff69b4', '#00ff00', '#ff1493'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.opacity = '1';
        document.getElementById('successAnimation').appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            {
                transform: `translate(-50%, -50%) translate(${Math.random() * 100 - 50}px, ${-50}px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(.25,.46,.45,.94)',
            fill: 'forwards'
        });
        
        // Clean up confetti after animation
        animation.onfinish = () => confetti.remove();
    }
}

// Shop Now Button Functionality
const shopNowBtn = document.querySelector('.shop-now-btn');
const quickShopModal = document.getElementById('quickShopModal');
const closeQuickShop = document.querySelector('.close-quick-shop');

// Featured products data
const featuredProducts = [
    {
        id: 'niacinamide',
        name: 'Niacinamide 10% + Zinc',
        price: 34,
        image: 'images/niacinamide.png',
        category: 'skin',
        description: 'For Bright & Clear Skin'
    },
    {
        id: 'vitamin-c',
        name: 'Vitamin C 10% + B5',
        price: 38,
        image: 'images/vitamin-c.png',
        category: 'skin',
        description: 'For Glowing Skin'
    },
    // Add more featured products
];

// Open Quick Shop Modal
shopNowBtn.addEventListener('click', () => {
    populateQuickShop();
    quickShopModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close Quick Shop Modal
closeQuickShop.addEventListener('click', () => {
    quickShopModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
quickShopModal.addEventListener('click', (e) => {
    if (e.target === quickShopModal) {
        quickShopModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Populate Quick Shop Modal with products
function populateQuickShop() {
    const quickShopGrid = document.querySelector('.quick-shop-grid');
    quickShopGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">
                    <span class="price">$${product.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to new Add to Cart buttons
    quickShopGrid.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                image: productCard.querySelector('.product-image img').src
            };
            addToCart(product);
        });
    });
}

// Add hover animation
shopNowBtn.addEventListener('mouseenter', () => {
    shopNowBtn.style.transform = 'translateY(-2px)';
});

shopNowBtn.addEventListener('mouseleave', () => {
    shopNowBtn.style.transform = 'translateY(0)';
});

// Prevent form submission if fields are empty
const subscribeInputs = subscribeForm.querySelectorAll('input');
const subscribeSubmitBtn = subscribeForm.querySelector('button[type="submit"]');

subscribeInputs.forEach(input => {
    input.addEventListener('input', () => {
        const allFilled = Array.from(subscribeInputs).every(input => input.value.trim() !== '');
        subscribeSubmitBtn.disabled = !allFilled;
        subscribeSubmitBtn.style.opacity = allFilled ? '1' : '0.7';
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile Menu Toggle (to be implemented)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Product Image Hover Effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.product-image').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.product-image').style.transform = 'scale(1)';
    });
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('active');
    });
});

// Cart functionality
let cartItems = [];
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartItemTemplate = document.getElementById('cartItemTemplate');
const cartCount = document.querySelector('.cart-count');
const totalAmount = document.querySelector('.total-amount');

// Open/Close Cart
document.querySelector('.cart-btn').addEventListener('click', () => {
    cartModal.classList.add('active');
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Open/Close Search
document.querySelector('.search-btn').addEventListener('click', () => {
    searchModal.classList.add('active');
    document.getElementById('searchInput').focus();
});

document.querySelector('.close-search').addEventListener('click', () => {
    searchModal.classList.remove('active');
});

function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }
    
    updateCart();
    showNotification(product);
    saveCartToLocalStorage();
}

function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cartItems.forEach((item, index) => {
        const cartItemElement = cartItemTemplate.content.cloneNode(true);
        const cartItem = cartItemElement.querySelector('.cart-item');
        
        cartItem.dataset.id = item.id;
        cartItem.querySelector('.cart-item-image').src = item.image;
        cartItem.querySelector('.cart-item-title').textContent = item.name;
        cartItem.querySelector('.cart-item-price').textContent = `$${item.price}`;
        cartItem.querySelector('.quantity').textContent = item.quantity;
        
        cartItem.querySelector('.minus').addEventListener('click', () => {
            updateQuantity(index, -1);
        });
        
        cartItem.querySelector('.plus').addEventListener('click', () => {
            updateQuantity(index, 1);
        });
        
        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            removeFromCart(index);
        });
        
        cartItemsContainer.appendChild(cartItemElement);
        
        total += item.price * item.quantity;
    });
    
    cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    cartItems[index].quantity += change;
    
    if (cartItems[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        updateCart();
        saveCartToLocalStorage();
    }
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
    saveCartToLocalStorage();
}

function showNotification(product) {
    const notification = document.getElementById('cartNotification');
    const notificationImage = document.getElementById('notificationImage');
    const productName = notification.querySelector('.product-name');
    const productPrice = notification.querySelector('.product-price');
    
    notificationImage.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = `$${product.price}`;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCart();
    }
}

// Initialize cart from localStorage
document.addEventListener('DOMContentLoaded', loadCartFromLocalStorage);

// Update the cart functionality
function initializeCartButtons() {
    // Add to cart buttons in product grid
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = getProductData(productCard);
            addToCartWithAnimation(button, product);
        });
    });

    // Add to cart button in quick view modal
    document.querySelector('.add-to-cart-quick').addEventListener('click', (e) => {
        const modal = document.getElementById('quickViewModal');
        const quantity = parseInt(modal.querySelector('.quantity').textContent);
        const product = {
            id: modal.dataset.currentProduct,
            name: modal.querySelector('.quick-view-title').textContent,
            price: parseFloat(modal.querySelector('.quick-view-price').textContent.replace('$', '')),
            image: modal.querySelector('#quickViewImage').src
        };
        
        addToCartWithAnimation(e.target, product, quantity);
        modal.classList.remove('active');
    });
}

function getProductData(productCard) {
    return {
        id: productCard.dataset.id,
        name: productCard.querySelector('h3').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
        image: productCard.querySelector('.product-image img').src
    };
}

function addToCartWithAnimation(button, product, quantity = 1) {
    // Add loading state to button
    button.classList.add('adding');
    button.textContent = 'Adding...';
    
    // Simulate loading (you can remove setTimeout if you're making actual API calls)
    setTimeout(() => {
        // Add to cart multiple times if quantity > 1
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        
        // Reset button state
        button.classList.remove('adding');
        button.textContent = 'Add to Cart';
        
        // Show cart modal
        cartModal.classList.add('active');
    }, 500);
}

// Initialize cart buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    initializeCartButtons();
});

// Close cart modal when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Checkout functionality
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cartItems.length > 0) {
        alert('Proceeding to checkout...');
        cartItems = [];
        updateCart();
        saveCartToLocalStorage();
        cartModal.classList.remove('active');
    } else {
        alert('Your cart is empty!');
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const searchResults = document.querySelector('.search-results');
    
    // Add your search logic here
    // For now, let's just show a message
    searchResults.innerHTML = searchTerm ? 
        `<p>Searching for "${searchTerm}"...</p>` : 
        '';
});

// Navigation functionality
const menuBtn = document.querySelector('a[href="#home"]');
const menuSection = document.querySelector('.menu-section');
let isMenuOpen = false;

// Toggle menu
menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        menuSection.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        menuSection.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.menu-container') && !e.target.closest('a[href="#home"]')) {
        isMenuOpen = false;
        menuSection.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Close menu if open
        if (isMenuOpen) {
            isMenuOpen = false;
            menuSection.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Scroll to target section
        if (targetId !== '#home') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active section highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const menuLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (menuLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
            menuLink.classList.add('active');
        }
    });
});

// Quick View functionality
const quickViewModal = document.getElementById('quickViewModal');
const productDetails = {
    'niacinamide': {
        benefits: [
            'Reduces appearance of blemishes',
            'Controls excess oil',
            'Minimizes pore appearance',
            'Improves skin texture'
        ],
        ingredients: 'Niacinamide (Vitamin B3), Zinc PCA, Glycerin, Hyaluronic Acid',
        description: 'A concentrated serum that helps reduce the appearance of blemishes and congestion. The formula combines 10% Niacinamide with Zinc PCA for clearer, balanced skin.'
    },
    'vitamin-c': {
        benefits: [
            'Brightens skin tone',
            'Reduces dark spots',
            'Boosts collagen production',
            'Antioxidant protection'
        ],
        ingredients: 'Vitamin C (L-Ascorbic Acid), Vitamin E, Ferulic Acid, Hyaluronic Acid',
        description: 'A powerful antioxidant serum featuring 10% pure Vitamin C (L-Ascorbic Acid) enhanced with Vitamin B5 for brighter, more radiant skin.'
    }
    // Add more product details as needed
};

// Add click event listeners to Quick View buttons
document.querySelectorAll('.quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.id;
        const product = {
            id: productId,
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.price').textContent,
            image: productCard.querySelector('.product-image img').src,
            ...productDetails[productId]
        };
        showQuickView(product);
    });
});

function showQuickView(product) {
    const modal = document.getElementById('quickViewModal');
    
    // Update modal content
    modal.querySelector('#quickViewImage').src = product.image;
    modal.querySelector('.quick-view-title').textContent = product.name;
    modal.querySelector('.quick-view-description').textContent = product.description;
    modal.querySelector('.quick-view-price').textContent = product.price;
    
    // Update benefits
    const benefitsList = modal.querySelector('.benefits-list');
    benefitsList.innerHTML = product.benefits.map(benefit => 
        `<li>${benefit}</li>`
    ).join('');
    
    // Update ingredients
    modal.querySelector('.ingredients-text').textContent = product.ingredients;
    
    // Add to cart functionality
    const addToCartBtn = modal.querySelector('.add-to-cart-quick');
    const quantitySpan = modal.querySelector('.quantity');
    let quantity = 1;
    
    modal.querySelector('.minus').onclick = () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    };
    
    modal.querySelector('.plus').onclick = () => {
        quantity++;
        quantitySpan.textContent = quantity;
    };
    
    addToCartBtn.onclick = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        modal.classList.remove('active');
    };
    
    // Show modal
    modal.classList.add('active');
}

// Close Quick View modal when clicking outside
quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        quickViewModal.classList.remove('active');
    }
});

// Close Quick View modal when clicking close button
document.querySelector('.close-quick-view').addEventListener('click', () => {
    quickViewModal.classList.remove('active');
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const contactSuccessModal = document.getElementById('contactSuccessModal');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        
        // Add loading state to button
        const submitBtn = contactForm.querySelector('.submit-btn');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success modal with personalized message
            const successTitle = contactSuccessModal.querySelector('h3');
            const successMessage = contactSuccessModal.querySelector('p');
            successTitle.textContent = `Thank you, ${name}!`;
            successMessage.textContent = 'Your message has been sent successfully. We will get back to you soon!';
            
            contactSuccessModal.classList.add('active');
            
            // Create confetti effect
            createContactConfetti();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
            
            // Close success modal after 4 seconds
            setTimeout(() => {
                contactSuccessModal.classList.remove('active');
            }, 4000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
            
            // Reset button
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

// Add confetti animation function for contact success
function createContactConfetti() {
    const colors = ['#ff4d00', '#ffd700', '#ff69b4', '#00ff00', '#ff1493'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        
        contactSuccessModal.appendChild(confetti);
        
        // Animate confetti
        confetti.animate([
            {
                transform: `translate(-50%, -50%) translate(${Math.random() * 100 - 50}px, ${-50}px) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(-50%, -50%) translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'cubic-bezier(.25,.46,.45,.94)',
            fill: 'forwards'
        }).onfinish = () => confetti.remove();
    }
}

// Close success modal when clicking close button
const closeSuccessBtn = document.querySelector('.close-success');
if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        contactSuccessModal.classList.remove('active');
    });
}

// Close success modal when clicking outside
contactSuccessModal.addEventListener('click', (e) => {
    if (e.target === contactSuccessModal) {
        contactSuccessModal.classList.remove('active');
    }
});

// Add floating label functionality
document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.previousElementSibling?.classList.add('active');
    });
    
    field.addEventListener('blur', () => {
        if (!field.value) {
            field.previousElementSibling?.classList.remove('active');
        }
    });
});

// Bestsellers Functionality
function initBestsellers() {
    const bestsellersGrid = document.querySelector('.bestsellers-grid');
    const bestsellers = Array.from(document.querySelectorAll('.bestseller-card'));
    
    // Sort bestsellers by rating
    bestsellers.sort((a, b) => {
        const ratingA = parseFloat(a.dataset.rating);
        const ratingB = parseFloat(b.dataset.rating);
        return ratingB - ratingA;
    });
    
    // Reorder the grid
    bestsellers.forEach((card, index) => {
        card.querySelector('.bestseller-badge').textContent = `#${index + 1} Bestseller`;
        bestsellersGrid.appendChild(card);
    });
    
    // Add animation delay
    bestsellers.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize bestsellers when DOM is loaded
document.addEventListener('DOMContentLoaded', initBestsellers);

// Terms of Service Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchTerms');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const suggestionTags = document.querySelectorAll('.suggestion-tags .tag');

    if (searchInput) {
        // Handle search input
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            highlightSearchResults(searchTerm);
        });

        // Handle suggestion tags
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                highlightSearchResults(tag.textContent.toLowerCase());
            });
        });
    }

    function highlightSearchResults(searchTerm) {
        const contentSections = document.querySelectorAll('.terms-block');
        
        contentSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (searchTerm && text.includes(searchTerm)) {
                section.classList.add('highlight-section');
                scrollToSection(section);
            } else {
                section.classList.remove('highlight-section');
            }
        });
    }

    function scrollToSection(section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
});

// Contact Support and Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactSupportBtn = document.getElementById('contactSupportBtn');
    const downloadTermsBtn = document.getElementById('downloadTermsBtn');
    const startChatBtn = document.getElementById('startChatBtn');
    const contactModal = document.getElementById('contactModal');
    const chatWidget = document.getElementById('chatWidget');
    const closeButtons = document.querySelectorAll('.close-modal, .close-chat');

    // Contact Support Form
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', () => {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Download Terms PDF
    if (downloadTermsBtn) {
        downloadTermsBtn.addEventListener('click', () => {
            // Create a loading state
            downloadTermsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            downloadTermsBtn.disabled = true;

            // Simulate download delay
            setTimeout(() => {
                // Create a dummy PDF download
                const link = document.createElement('a');
                link.href = 'terms-of-service.pdf'; // Replace with actual PDF path
                link.download = 'minimalist-terms-of-service.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Reset button
                downloadTermsBtn.innerHTML = '<i class="fas fa-file-alt"></i> Download Terms PDF';
                downloadTermsBtn.disabled = false;
            }, 1500);
        });
    }

    // Live Chat
    if (startChatBtn) {
        startChatBtn.addEventListener('click', () => {
            chatWidget.classList.add('active');
        });
    }

    // Close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal, .chat-widget').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Handle chat messages
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                addMessage(message, 'user');
                chatInput.value = '';

                // Simulate response after delay
                setTimeout(() => {
                    addMessage('Thank you for your message. A support agent will respond shortly.', 'system');
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage.click();
            }
        });
    }

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contactSupportForm');
    if (contactForm) {
        const messageInput = contactForm.querySelector('#message');
        const charCount = contactForm.querySelector('.character-count');
        const minChars = 50;

        // Character count
        messageInput.addEventListener('input', () => {
            const count = messageInput.value.length;
            charCount.textContent = `${count} / ${minChars}`;
            charCount.classList.toggle('error', count < minChars);
        });

        // Form validation
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateForm()) return;

            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                const modal = document.getElementById('contactModal');
                modal.classList.remove('active');
                
                // Show success animation
                showSuccessMessage('Message sent successfully!', 'We\'ll get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                submitBtn.disabled = false;
            }, 2000);
        });

        function validateForm() {
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                const errorElement = input.nextElementSibling;
                if (!input.checkValidity()) {
                    isValid = false;
                    showError(input, errorElement);
                } else {
                    clearError(input, errorElement);
                }
            });

            // Check message length
            if (messageInput.value.length < minChars) {
                isValid = false;
                showError(messageInput, messageInput.nextElementSibling, 
                    `Message must be at least ${minChars} characters`);
            }

            return isValid;
        }

        function showError(input, errorElement, message) {
            input.classList.add('error');
            errorElement.textContent = message || input.validationMessage;
        }

        function clearError(input, errorElement) {
            input.classList.remove('error');
            errorElement.textContent = '';
        }

        function showSuccessMessage(title, message) {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-animation';
            successDiv.innerHTML = `
                <div class="success-content">
                    <div class="success-checkmark">
                        <div class="check-icon"></div>
                    </div>
                    <h2>${title}</h2>
                    <p>${message}</p>
                </div>
            `;
            document.body.appendChild(successDiv);

            setTimeout(() => {
                successDiv.remove();
            }, 3000);
        }
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Sitemap Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sitemapSearch = document.getElementById('sitemapSearch');
    const searchTags = document.querySelectorAll('.search-tag');
    const sitemapLinks = document.querySelectorAll('.sitemap-list a');

    if (sitemapSearch) {
        // Handle search input
        sitemapSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterLinks(searchTerm);
        });

        // Handle search tags
        searchTags.forEach(tag => {
            tag.addEventListener('click', () => {
                sitemapSearch.value = tag.textContent;
                filterLinks(tag.textContent.toLowerCase());
            });
        });
    }

    function filterLinks(searchTerm) {
        sitemapLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            const listItem = link.parentElement;
            
            if (text.includes(searchTerm)) {
                listItem.style.display = 'block';
                highlightMatch(link, searchTerm);
            } else {
                listItem.style.display = 'none';
            }
        });
    }

    function highlightMatch(element, term) {
        const text = element.textContent;
        const regex = new RegExp(`(${term})`, 'gi');
        element.innerHTML = text.replace(regex, '<mark>$1</mark>');
    }
});

// Promotion Countdown Timer
function initCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1); // 24 hours from now

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('promoCountdown').innerHTML = 'Promotion Ended';
        }
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', initCountdown);

// Enhanced Button Interactions
document.addEventListener('DOMContentLoaded', function() {
    const shopNowBtn = document.querySelector('.shop-now-btn');
    const learnMoreBtn = document.querySelector('.learn-more-btn');

    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            // Add click animation
            shopNowBtn.classList.add('clicked');
            
            // Simulate loading state
            const btnText = shopNowBtn.querySelector('.btn-text');
            const originalText = btnText.textContent;
            const btnIcon = shopNowBtn.querySelector('.btn-icon i');
            
            btnText.textContent = 'Loading...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            
            // Reset after animation
            setTimeout(() => {
                btnText.textContent = originalText;
                btnIcon.className = 'fas fa-arrow-right';
                shopNowBtn.classList.remove('clicked');
                
                // Navigate to products page
                window.location.href = '#products';
            }, 1000);
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Add click animation
            learnMoreBtn.classList.add('clicked');
            
            // Smooth scroll to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Reset animation
            setTimeout(() => {
                learnMoreBtn.classList.remove('clicked');
            }, 600);
        });
    }
});

// Promo Code Copy Functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyCode');
    const promoCode = document.querySelector('.promo-code');

    if (copyBtn && promoCode) {
        copyBtn.addEventListener('click', () => {
            // Copy to clipboard
            navigator.clipboard.writeText(promoCode.textContent.trim())
                .then(() => {
                    // Show success state
                    const originalIcon = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.background = '#4CAF50';
                    
                    // Show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = 'Copied!';
                    copyBtn.appendChild(tooltip);

                    // Reset after animation
                    setTimeout(() => {
                        copyBtn.innerHTML = originalIcon;
                        copyBtn.style.background = '';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                    copyBtn.innerHTML = '<i class="fas fa-times"></i>';
                    copyBtn.style.background = '#dc3545';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                        copyBtn.style.background = '';
                    }, 2000);
                });
        });
    }
});

// Smooth Scroll Progress Indicator
document.addEventListener('DOMContentLoaded', function() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const progress = scrollTop / (documentHeight - windowHeight);
        
        progressBar.style.transform = `scaleX(${progress})`;
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Optional: Add scroll reveal animations
const revealElements = document.querySelectorAll('.reveal-section');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); 