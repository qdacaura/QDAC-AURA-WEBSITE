// QDAC AURA JavaScript - CLEAN VERSION
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                this.classList.add('active');
                
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                const navbarCollapse = document.getElementById('navbarNav');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });

    // Active nav link tracking
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

    // Intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
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
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const successMsg = document.createElement('div');
                successMsg.className = 'alert alert-success mt-3';
                successMsg.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMsg);
                
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 2000);
        });
    }

    // Loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
        updateActiveNavLink();
    });

    // Console welcome message
    console.log('%c🚀 QDAC AURA - Where Embedded Meets Intelligence', 
        'color: #76b900; font-size: 18px; font-weight: bold; font-family: Inter, sans-serif;');
    console.log('%c💡 Think Deep. Build Smart. Innovate Fearlessly.', 
        'color: #00b4ff; font-size: 14px; font-family: Inter, sans-serif;');
});