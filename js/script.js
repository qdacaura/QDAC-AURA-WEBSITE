// GOD-LEVEL QDAC AURA JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js with enhanced configuration
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 1000
                    }
                },
                color: {
                    value: ['#76b900', '#00b4ff', '#8a2be2']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.6,
                    random: true
                },
                size: {
                    value: 4,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 180,
                    color: '#76b900',
                    opacity: 0.3,
                    width: 1.5
                },
                move: {
                    enable: true,
                    speed: 2.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Enhanced navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });

    // Smooth scrolling with enhanced behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to clicked link
                this.classList.add('active');
                
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });

    // Enhanced active nav link tracking
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            
            if (distance < closestDistance && rect.top <= 150) {
                closestDistance = distance;
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Enhanced intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.zIndex = '10';
                
                // Staggered animation for grid items
                if (entry.target.classList.contains('expertise-card') || 
                    entry.target.classList.contains('skill-card') ||
                    entry.target.classList.contains('project-card') ||
                    entry.target.classList.contains('collab-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .skill-card, .project-card, .collab-card, ' +
        '.service-card, .vision-card, .mission-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease, z-index 0.8s ease';
        el.style.zIndex = '10';
        observer.observe(el);
    });

    // Enhanced form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success mt-3';
                successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMsg);
                
                // Reset form and button
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 2000);
        });
    }

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced card hover effects
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.project-card, .service-card, .expertise-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 20;
            const angleX = (centerY - y) / 20;
            
            if (rect.top >= 0 && rect.bottom <= window.innerHeight * 1.2) {
                card.style.transform = `perspective(1200px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
            }
        });
    });

    // Reset card transforms
    document.addEventListener('mouseleave', function() {
        const cards = document.querySelectorAll('.project-card, .service-card, .expertise-card');
        cards.forEach(card => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        // Initialize active nav link
        updateActiveNavLink();
    });

    // Performance optimization: Throttle scroll events
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                scrollTimer = null;
                updateActiveNavLink();
            }, 100);
        }
    });

    // Console welcome message
    console.log('%c🚀 QDAC AURA - Where Embedded Meets Intelligence', 
        'color: #76b900; font-size: 18px; font-weight: bold; font-family: Inter, sans-serif;');
    console.log('%c💡 Think Deep. Build Smart. Innovate Fearlessly.', 
        'color: #00b4ff; font-size: 14px; font-family: Inter, sans-serif;');
});

// Add utility function for smooth element highlighting
function highlightElement(element, duration = 2000) {
    element.style.transition = 'all 0.3s ease';
    element.style.boxShadow = '0 0 0 3px rgba(118, 185, 0, 0.5)';
    
    setTimeout(() => {
        element.style.boxShadow = '';
    }, duration);
}