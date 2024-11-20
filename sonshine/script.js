// Testimonials Carousel
const carousel = document.querySelector('.testimonial-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let scrollAmount = 0;
const cardWidth = 316; // 300px card width + 16px gap

nextBtn.addEventListener('click', () => {
    scrollAmount += cardWidth;
    if (scrollAmount > carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = carousel.scrollWidth - carousel.clientWidth;
    }
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) {
        scrollAmount = 0;
    }
    carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('i');
    
    question.addEventListener('click', () => {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('i');
                otherAnswer.style.maxHeight = null;
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });
        
        // Toggle current FAQ
        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        } else {
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    });
});

// Map Integration (using Leaflet.js as an example)
// Note: You'll need to include Leaflet CSS and JS in your HTML
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) {
        const map = L.map('map').setView([47.5162, 10.2728], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for pool locations
        const pools = [
            {
                name: 'Freibad Rettenberg',
                coords: [47.5162, 10.2728],
                address: 'Birchstrasse 5, 87549 Rettenberg'
            },
            // Add more pool locations here
        ];

        pools.forEach(pool => {
            L.marker(pool.coords)
                .bindPopup(`<b>${pool.name}</b><br>${pool.address}`)
                .addTo(map);
        });
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});