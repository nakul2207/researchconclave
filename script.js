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

    // Sticky header on scroll - UPDATED to use class instead of inline styles
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
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

    // Enhanced parallax effect for hero section - UPDATED for more subtle effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            // Using a smaller multiplier (0.3 instead of 0.5) for a more sophisticated effect
            heroSection.style.backgroundPositionY = (scrollPosition * 0.3) + 'px';
        }
    });

    // REMOVED: JavaScript-based card hover effects
    // These effects are now handled by CSS for better performance and smoother transitions

    // Enhanced Intersection Observer implementation
    function initRevealAnimations() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'  // Triggers animations slightly earlier
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // This makes the animation happen only once per element
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        revealElements.forEach(element => {
            observer.observe(element);
        });
    }

    initRevealAnimations();

    // Add a class to body after page has loaded completely
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Copy to clipboard functionality for committee contact info
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('onclick').split("'")[1];
            
            // Create a temporary textarea element to copy from
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = textToCopy;
            document.body.appendChild(tempTextarea);
            
            // Select and copy the text
            tempTextarea.select();
            document.execCommand('copy');
            
            // Remove the temporary element
            document.body.removeChild(tempTextarea);
            
            // Provide visual feedback (instead of alert)
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            
            setTimeout(() => {
                this.innerHTML = originalIcon;
            }, 1500);
        });
    });
});
// JavaScript to animate committee cards on scroll
document.addEventListener('DOMContentLoaded', () => {
    const committeeCards = document.querySelectorAll('.committee-card');

    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the card is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Add the active class
                observer.unobserve(entry.target); // Stop observing once the animation is applied
            }
        });
    }, observerOptions);

    committeeCards.forEach(card => observer.observe(card));
});