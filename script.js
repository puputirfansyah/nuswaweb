document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page loads scrolled

    // 2. Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change icon based on state
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Close mobile menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 3. ScrollSpy: Highlight Active Nav Link
    const sections = document.querySelectorAll('section, .hero');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

    const highlightNavLink = () => {
        let scrollPos = window.scrollY + 120; // offset for header height

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink();

    // 4. WhatsApp Order Integration
    const waNumber = '6283898872191';
    
    // We bind to both product cards and any other CTA buttons that order products
    const orderButtons = document.querySelectorAll('[data-order-product]');
    
    orderButtons.forEach(button => {
        const productName = button.getAttribute('data-order-product');
        const productPrice = button.getAttribute('data-order-product');
        // Create custom message template
        const message = `Halo Nuswa Kopi & Rempah, saya tertarik untuk memesan *"${productName}"*.

Berikut detail pesanan saya:
• *Jumlah Pesanan:* ....
• *Harga Default:* Rp ${productPrice || '....'}
• *Jenis Layanan:* Take Away (Ambil di Alamat Kedai)
• *Pembayaran:* Scan Barcode QRIS

Mohon informasi selengkapnya mengenai total harga dan barcode untuk pembayarannya. Terima kasih!`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
        
        button.setAttribute('href', waUrl);
        button.setAttribute('target', '_blank');
        button.setAttribute('rel', 'noopener noreferrer');
    });

    // General "Hubungi Kami" or general chat buttons
    const chatButtons = document.querySelectorAll('[data-chat-wa]');
    chatButtons.forEach(button => {
        const message = `Halo Nuswa Kopi & Rempah baik, saya berkunjung dari website dan ingin menanyakan informasi tentang produk Kopi dan Rempah Anda.`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
        
        button.setAttribute('href', waUrl);
        button.setAttribute('target', '_blank');
        button.setAttribute('rel', 'noopener noreferrer');
    });

    // 5. Product Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    // Add fade out animation or hide directly
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Trigger a small animation
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Simple Interactive Features: Favorite Click Alert / Animation
    const favoriteButtons = document.querySelectorAll('.product-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const icon = btn.querySelector('i');
            if (icon) {
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                btn.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    btn.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
});
