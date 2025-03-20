// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('show');
        this.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('show');
            menuToggle.classList.remove('active');
        });
    });

    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Scroll reveal animation
    function reveal() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add("active");
            }
        }
    }

    // Initial reveal check
    reveal();
    
    // Reveal on scroll
    window.addEventListener("scroll", reveal);

    // Active navigation based on scroll position
    function activeNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Initial active nav check
    activeNav();
    
    // Update active nav on scroll
    window.addEventListener('scroll', activeNav);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission prevention (demo only)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('This is a demo form. In a real website, this would submit your message.');
            this.reset();
        });
    }

    // Subtle parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // Add subtle hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .committee-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Initialize AOS (Animate on Scroll) like functionality
    function initRevealAnimations() {
        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    initRevealAnimations();
});
