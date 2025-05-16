// Enhanced Portfolio JavaScript
// Author: Júlio Lage
// Version: 2.0

class PortfolioEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupLoadingScreen();
        this.initializeComponents();
    }

    bindEvents() {
        window.addEventListener('load', () => this.handleLoad());
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('DOMContentLoaded', () => this.handleDOMContent());
    }

    // Enhanced Loading Screen with Progress Simulation
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        const progressBar = document.querySelector('.progress-bar');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                    
                    setTimeout(() => {
                        mainContent.classList.add('visible');
                        this.initializeEnhancements();
                    }, 300);
                    
                    setTimeout(() => {
                        loadingScreen.remove();
                    }, 800);
                }, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 100);
    }

    handleLoad() {
        document.body.style.visibility = 'visible';
        this.preconnectExternalDomains();
    }

    handleScroll() {
        this.updateScrollIndicator();
        this.updateNavbar();
        this.updateParallax();
    }

    handleResize() {
        if (window.innerWidth > 768) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    handleDOMContent() {
        this.preconnectExternalDomains();
        this.setupKeyboardNavigation();
    }

    // Initialize Enhanced Features
    initializeEnhancements() {
        this.createParticleSystem();
        this.startTypingEffect();
        this.createEnhancedMatrix();
        this.initializeIntersectionObserver();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupCursorGlow();
        this.addCardAnimations();
    }

    // Enhanced Typing Effect with Multiple Texts
    startTypingEffect() {
        const subtitle = document.getElementById('dynamicSubtitle');
        if (!subtitle) return;

        const texts = [
            'DATA ANALYST • PYTHON • ML',
            'TRANSFORMANDO DADOS EM INSIGHTS',
            'MACHINE LEARNING SPECIALIST',
            'ETL • BI • VISUALIZATION',
            'PYTHON • SQL • CLOUD'
        ];
        
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let charIndex = 0;
        
        const typeText = () => {
            const fullText = texts[currentIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            subtitle.textContent = currentText;
            
            let speed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === fullText.length) {
                speed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                speed = 500; // Pause before new text
            }
            
            setTimeout(typeText, speed);
        };
        
        setTimeout(typeText, 2000);
    }

    // Enhanced Particle System
    createParticleSystem() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = window.innerWidth > 768 ? 50 : 25;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = Math.random() * 15 + 's';
            
            // Add some variety in particle colors
            if (Math.random() > 0.7) {
                particle.style.background = 'var(--secondary-color)';
            }
            
            particlesContainer.appendChild(particle);
        }
    }

    // Enhanced Matrix Effect
    createEnhancedMatrix() {
        const matrix = document.getElementById('matrix');
        if (!matrix) return;

        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()';
        const density = window.innerWidth > 768 ? 200 : 300;
        
        setInterval(() => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + 'vw';
            char.style.animationDuration = (Math.random() * 5 + 3) + 's';
            char.style.fontSize = (Math.random() * 8 + 10) + 'px';
            char.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Add color variation
            if (Math.random() > 0.8) {
                char.style.color = 'var(--secondary-color)';
            }
            
            matrix.appendChild(char);
            
            setTimeout(() => {
                if (char.parentNode) {
                    char.remove();
                }
            }, 8000);
        }, density);
    }

    // Enhanced Intersection Observer
    initializeIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add special effects for different sections
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    } else if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillItem(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    animateProjectCard(card) {
        const icon = card.querySelector('.project-icon');
        const techItems = card.querySelectorAll('.tech-item');
        
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 600);
            }, 200);
        }
        
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 200);
            }, index * 100);
        });
    }

    animateSkillItem(item) {
        const icon = item.querySelector('.skill-icon');
        
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.2) rotate(15deg)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 500);
            }, 100);
        }
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (!hamburger || !navMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Enhanced Scroll Indicator
    updateScrollIndicator() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;

        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        scrollIndicator.style.width = scrollPercent + '%';
    }

    // Enhanced Navbar with Hide/Show
    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const currentScrollY = window.pageYOffset;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (!this.lastScrollY) this.lastScrollY = 0;
        
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = currentScrollY;
    }

    // Enhanced Parallax Effect
    updateParallax() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        const particles = document.getElementById('particles');
        const shapes = document.querySelectorAll('.shape');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    // Smooth Scrolling Setup
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Cursor Glow
    setupCursorGlow() {
        let glow = null;
        let mouseTimeout = null;

        document.addEventListener('mousemove', (e) => {
            if (!glow) {
                glow = document.createElement('div');
                glow.className = 'cursor-glow';
                glow.style.cssText = `
                    position: fixed;
                    width: 40px;
                    height: 40px;
                    background: radial-gradient(circle, rgba(0,255,136,0.3) 0%, rgba(0,162,255,0.1) 50%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: all 0.1s ease;
                    opacity: 0;
                `;
                document.body.appendChild(glow);
            }
            
            glow.style.left = e.clientX - 20 + 'px';
            glow.style.top = e.clientY - 20 + 'px';
            glow.style.opacity = '1';
            
            // Hide cursor glow after inactivity
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                if (glow) {
                    glow.style.opacity = '0';
                }
            }, 1000);
        });

        // Enhanced cursor effects on hover
        document.querySelectorAll('.project-card, .skill-item, .contact-link, .cta-button').forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (glow) {
                    glow.style.transform = 'scale(1.5)';
                    glow.style.background = 'radial-gradient(circle, rgba(0,255,136,0.4) 0%, rgba(0,162,255,0.2) 50%, transparent 70%)';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (glow) {
                    glow.style.transform = 'scale(1)';
                    glow.style.background = 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, rgba(0,162,255,0.1) 50%, transparent 70%)';
                }
            });
        });
    }

    // Add Staggered Card Animations
    addCardAnimations() {
        setTimeout(() => {
            const projectCards = document.querySelectorAll('.project-card');
            const skillItems = document.querySelectorAll('.skill-item');
            
            projectCards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.15}s`;
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });

            skillItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        }, 1000);
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (e.key === 'Escape') {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Add keyboard navigation for sections
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                this.navigateToNextSection();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                this.navigateToPrevSection();
            }
        });
    }

    navigateToNextSection() {
        const sections = document.querySelectorAll('section[id]');
        const currentScroll = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop > currentScroll + 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    navigateToPrevSection() {
        const sections = Array.from(document.querySelectorAll('section[id]')).reverse();
        const currentScroll = window.pageYOffset;
        
        for (let section of sections) {
            if (section.offsetTop < currentScroll - 100) {
                section.scrollIntoView({ behavior: 'smooth' });
                break;
            }
        }
    }

    // Performance Optimization
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Preconnect External Domains
    preconnectExternalDomains() {
        const domains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];
        
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = '';
            document.head.appendChild(link);
        });
    }

    // Active Section Highlighting
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Add this to the scroll handler
    handleScroll() {
        this.updateScrollIndicator();
        this.updateNavbar();
        this.updateParallax();
        this.updateActiveSection();
    }
}

// Initialize Portfolio Enhancer
const portfolioEnhancer = new PortfolioEnhancer();

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav a.active {
        color: var(--primary-color);
        background-size: 100% 2px;
    }
    
    .nav a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioEnhancer;
}