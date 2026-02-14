// JavaScript for Andrew Grow Portfolio Website

// ===== Smooth Scroll Behavior & Subject Autofill =====
const contactForm = document.getElementById('contact-form');
const subjectField = document.getElementById('subject');

function autofillSubject() {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    if (subject && subjectField) {
        subjectField.value = subject;
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const [targetId, queryString] = href.split('?');
        const target = document.querySelector(targetId);

        if (target) {
            // Update subject if present in query string
            if (queryString && subjectField) {
                const urlParams = new URLSearchParams(queryString);
                const subject = urlParams.get('subject');
                if (subject) {
                    subjectField.value = subject;
                }
            } else if (subjectField && targetId === '#contact') {
                // Clear subject if clicking "Contact" without parameters
                subjectField.value = '';
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Initial autofill on load
window.addEventListener('load', autofillSubject);

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in-on-scroll class
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scroll-top');

if (scrollTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });
}

// ===== Active Navigation Link Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-brand-indigo', 'font-bold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-brand-indigo', 'font-bold');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// ===== Add Hover Effects to Project Cards =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ===== Prevent External Links from Being Blocked =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Ensure external links open properly
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
            // Let the browser handle it normally
            return true;
        }
    });
});

// ===== Console Easter Egg =====
console.log('%c👋 Hi there! Looking for a creative web designer?', 'font-size: 16px; color: #4F46E5; font-weight: bold;');
console.log('%cLet\'s work together! Email me at growandygrow@gmail.com', 'font-size: 14px; color: #14B8A6;');

// ===== Performance: Lazy Load Images =====
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===== Initialize on Page Load =====
window.addEventListener('load', () => {
    // Trigger initial animation check
    highlightNavigation();

    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
});

// ===== Smooth Height Adjustment for Mobile Menu =====
if (mobileMenu) {
    // Add transition for smooth height changes
    mobileMenu.style.transition = 'max-height 0.3s ease-in-out';
}
