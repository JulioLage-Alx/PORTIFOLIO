// Portfolio Responsivo e Otimizado
// Autor: Adaptado para o portfólio de Júlio Lage
// Versão: 3.0

"use strict";

class PortfolioApp {
    constructor() {
        this.initialized = false;
        this.isMobile = window.innerWidth <= 768;
        this.isLowEndDevice = this.detectLowEndDevice();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Inicialização
        this.init();
    }

    /**
     * Inicializa todas as funcionalidades do portfólio
     */
    init() {
        if (this.initialized) return;
        
        // Event Listeners essenciais
        this.addEventListeners();
        
        // Setup básico de componentes
        this.setupLoadingScreen();
        
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
            this.setupOptimizedScrolling();
            this.setupResponsiveMenu();
            this.setupViewportFix();
            
            // Inicializar componentes principais apenas se o conteúdo estiver carregado
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                this.setupVisualEffects();
            } else {
                window.addEventListener('load', () => this.setupVisualEffects());
            }
            
            this.initialized = true;
        });
    }

    /**
     * Adiciona listeners de eventos básicos
     */
    addEventListeners() {
        window.addEventListener('resize', this.throttle(() => this.handleResize(), 100));
        window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
        window.addEventListener('orientationchange', () => this.handleOrientationChange());
    }

    /**
     * Configura a tela de carregamento e animação inicial
     */
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const mainContent = document.getElementById('mainContent');
        
        if (!loadingScreen || !mainContent) return;
        
        // Garante que a tela de carregamento seja removida mesmo se a animação falhar
        const hideLoadingScreen = () => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                mainContent.classList.add('visible');
                this.setupVisualEffects();
                
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.remove();
                    }
                }, 800);
            }, 300);
        };
        
        // Código anterior para simular progresso, mas com fallback de segurança
        const progressBar = loadingScreen.querySelector('.progress-bar');
        let progress = 0;
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            
            if (progress > 100) {
                progress = 100;
                clearInterval(progressInterval);
                
                // Espera um pouco antes de esconder a tela de carregamento
                setTimeout(hideLoadingScreen, 500);
            }
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
        }, 100);
        
        // Segurança: remover a tela de carregamento após um tempo máximo
        setTimeout(() => {
            if (loadingScreen.parentNode && !loadingScreen.classList.contains('fade-out')) {
                clearInterval(progressInterval);
                hideLoadingScreen();
            }
        }, 5000);
    }

    /**
     * Inicializa componentes básicos após o carregamento do DOM
     */
    initializeComponents() {
        // Ativar animações somente após carregamento
        document.body.classList.add('transitions-enabled');
        
        // Detectar capacidades do dispositivo e definir classes CSS
        if (this.isTouch) {
            document.body.classList.add('touch-device');
        }
        
        if (this.isLowEndDevice) {
            document.body.classList.add('low-end-device');
        }
        
        if (this.prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
        }
        
        // Configura Lazy Loading para imagens
        this.setupLazyLoading();
        
        // Otimizar para conexões lentas
        this.optimizeForConnection();
    }

    /**
     * Detecta dispositivos de baixo desempenho
     */
    detectLowEndDevice() {
        // Detectar baixa memória (se disponível)
        if (navigator.deviceMemory !== undefined && navigator.deviceMemory < 4) {
            return true;
        }
        
        // Detectar CPU lenta (se disponível)
        if (navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4) {
            return true;
        }
        
        // Verificar dispositivos móveis mais antigos
        const userAgent = navigator.userAgent.toLowerCase();
        if (/android\s[0-3]\./.test(userAgent)) {
            return true;
        }
        
        return false;
    }

    /**
     * Configura efeitos visuais otimizados
     */
    setupVisualEffects() {
        // Aplicar efeitos apenas se o dispositivo permitir
        if (this.prefersReducedMotion || (this.isMobile && this.isLowEndDevice)) {
            this.setupMinimalEffects();
        } else {
            this.setupFullEffects();
        }
        
        // Inicializar efeito de digitação
        this.setupTypingEffect();
        
        // Configurar observador de interseção para animações
        this.setupIntersectionObserver();
        
        // Configurar efeito de cursor (apenas desktop)
        if (!this.isTouch) {
            this.setupCursorEffect();
        }
    }

    /**
     * Configura efeitos mínimos para dispositivos de baixo desempenho
     */
    setupMinimalEffects() {
        // Ocultar elementos intensivos
        const heavyElements = document.querySelectorAll('.matrix-bg, .animated-bg');
        heavyElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Versão simplificada para partículas
        this.createSimpleParticles();
    }

    /**
     * Configura todos os efeitos visuais para dispositivos com bom desempenho
     */
    setupFullEffects() {
        // Inicializar efeitos completos
        this.createParticles();
        this.createMatrix();
    }

    /**
     * Cria partículas de forma otimizada
     */
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        // Limpar container por segurança
        particlesContainer.innerHTML = '';
        
        // Ajustar quantidade com base no dispositivo
        const particleCount = this.isMobile ? 20 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posicionamento aleatório
            particle.style.left = Math.random() * 100 + 'vw';
            
            // Tamanho adaptado ao dispositivo
            const size = this.isMobile ? 
                Math.random() * 2 + 1 : // 1-3px em mobile
                Math.random() * 3 + 2;  // 2-5px em desktop
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Duração de animação adaptada
            const duration = this.isMobile ? 
                8 + Math.random() * 7 : // 8-15s em mobile
                10 + Math.random() * 15; // 10-25s em desktop
            
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            // Variação de cor para algumas partículas
            if (Math.random() > 0.7) {
                particle.style.background = 'var(--secondary-color)';
            }
            
            // Variação de opacidade
            particle.style.opacity = (Math.random() * 0.4 + 0.3).toString();
            
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Cria versão simplificada de partículas para dispositivos de baixo desempenho
     */
    createSimpleParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        particlesContainer.innerHTML = '';
        
        // Número reduzido de partículas
        const particleCount = 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.animationDuration = (10 + Math.random() * 5) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    /**
     * Cria efeito de matrix otimizado
     */
    createMatrix() {
        const matrix = document.getElementById('matrix');
        if (!matrix) return;
        
        // Configurar com base no dispositivo
        const density = this.isMobile ? 400 : 200;
        const maxCharacters = this.isMobile ? 30 : 100;
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+';
        
        let activeCharacters = 0;
        
        // Adicionar caracteres com limite de quantidade
        const addCharacter = () => {
            if (activeCharacters >= maxCharacters) return;
            
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + 'vw';
            char.style.animationDuration = (Math.random() * 3 + 3) + 's';
            char.style.fontSize = (Math.random() * 6 + (this.isMobile ? 8 : 12)) + 'px';
            char.style.opacity = (Math.random() * 0.3 + 0.1).toString();
            
            // Variação de cor
            if (Math.random() > 0.8) {
                char.style.color = 'var(--secondary-color)';
            }
            
            matrix.appendChild(char);
            activeCharacters++;
            
            // Remover após animação completa
            const duration = parseFloat(char.style.animationDuration) * 1000;
            setTimeout(() => {
                if (char.parentNode) {
                    char.parentNode.removeChild(char);
                    activeCharacters--;
                }
            }, duration);
        };
        
        // Iniciar intervalo com limite de caracteres
        const matrixInterval = setInterval(addCharacter, density);
        
        // Limpar quando a página for ocultada
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(matrixInterval);
                // Limpar caracteres existentes para economizar recursos
                matrix.innerHTML = '';
                activeCharacters = 0;
            } else if (activeCharacters < maxCharacters) {
                // Reiniciar apenas se estiver visível e abaixo do limite
                clearInterval(matrixInterval);
                setInterval(addCharacter, density);
            }
        });
        
        // Ajustar em redimensionamento
        window.addEventListener('resize', () => {
            const isTooSmall = window.innerWidth < 360;
            
            if (isTooSmall) {
                clearInterval(matrixInterval);
                matrix.style.display = 'none';
                matrix.innerHTML = '';
            } else if (matrix.style.display === 'none') {
                matrix.style.display = '';
                setInterval(addCharacter, density);
            }
        });
    }

    /**
     * Configura efeito de digitação para subtítulo
     */
    setupTypingEffect() {
        const subtitle = document.getElementById('dynamicSubtitle');
        if (!subtitle) return;
        
        // Definir textos apropriados para tamanho da tela
        const texts = this.isMobile ? 
            ['PYTHON • ML', 'DATA INSIGHTS', 'ML SPECIALIST', 'BI • ETL'] :
            ['DATA ANALYST • PYTHON • ML', 'TRANSFORMANDO DADOS EM INSIGHTS', 'MACHINE LEARNING SPECIALIST', 'ETL • BI • VISUALIZATION'];
        
        let currentIndex = 0;
        let currentText = '';
        let isDeleting = false;
        let charIndex = 0;
        
        const typeNextChar = () => {
            const fullText = texts[currentIndex];
            
            if (isDeleting) {
                currentText = fullText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = fullText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            subtitle.textContent = currentText;
            
            // Velocidade adaptativa com variação aleatória para efeito mais natural
            let speed = isDeleting ? 50 : 100;
            speed += Math.random() * 30 - 15; // Adiciona variação de ±15ms
            
            if (!isDeleting && charIndex === fullText.length) {
                speed = 2000; // Pausa no final
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
                speed = 500; // Pausa antes do próximo texto
            }
            
            setTimeout(typeNextChar, speed);
        };
        
        // Iniciar após pequeno atraso
        setTimeout(typeNextChar, 1000);
    }

    /**
     * Configura menu responsivo aprimorado
     */
    setupResponsiveMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const body = document.body;
        
        if (!hamburger || !navMenu) return;
        
        // Toggle do menu mobile
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Previne propagação
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Controlar scroll do body
            body.classList.toggle('menu-open');
            body.style.overflow = body.classList.contains('menu-open') ? 'hidden' : '';
        });
        
        // Fechar menu ao clicar nos links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }
        });
        
        // Otimizar para dispositivos touch
        if (this.isTouch) {
            let touchStartX = 0;
            
            navMenu.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            navMenu.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const difference = touchStartX - touchEndX;
                
                // Fechar menu com deslize para esquerda
                if (difference > 50) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                    body.style.overflow = '';
                }
            }, { passive: true });
        }
    }

    /**
     * Configura rolagem suave otimizada
     */
    setupOptimizedScrolling() {
        // Rolagem suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const target = document.querySelector(anchor.getAttribute('href'));
                if (!target) return;
                
                // Calcular posição considerando menu
                const offset = 70; // Altura do menu
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Usar rolagem suave nativa, se disponível
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback para navegadores antigos
                    window.scrollTo(0, targetPosition);
                }
            });
        });
        
        // Barra de progresso de rolagem
        this.updateScrollIndicator();
    }

    /**
     * Configurar observador de interseção para animações
     */
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;
        
        // Configurações do observador
        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        // Criar observador para elementos fade-in
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                    
                    // Animar elementos filhos com atraso
                    if (entry.target.classList.contains('project-card') || 
                        entry.target.classList.contains('skill-item')) {
                        this.animateChildrenWithDelay(entry.target);
                    }
                }
            });
        }, observerOptions);
        
        // Observar todos os elementos fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            fadeObserver.observe(el);
        });
    }

    /**
     * Anima elementos filhos com atraso para efeito em cascata
     */
    animateChildrenWithDelay(parent) {
        const animatableElements = parent.querySelectorAll('.tech-item, .project-icon, h3, p, .project-links');
        
        animatableElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                // Forçar reflow
                void el.offsetWidth;
                
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    /**
     * Configura efeito de cursor para desktop
     */
    setupCursorEffect() {
        // Não aplicar em dispositivos touch
        if (this.isTouch) return;
        
        let cursorGlow = document.querySelector('.cursor-glow');
        
        // Criar elemento se não existir
        if (!cursorGlow) {
            cursorGlow = document.createElement('div');
            cursorGlow.className = 'cursor-glow';
            document.body.appendChild(cursorGlow);
        }
        
        // Atualizar posição do cursor
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.left = e.clientX + 'px';
        });
        
        // Aumentar efeito ao passar sobre elementos interativos
        const interactiveElements = document.querySelectorAll('.project-card, .skill-item, .contact-link, .cta-button, .nav a');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0,255,136,0.4) 0%, rgba(0,162,255,0.2) 50%, transparent 70%)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorGlow.style.background = 'radial-gradient(circle, rgba(0,255,136,0.3) 0%, rgba(0,162,255,0.1) 50%, transparent 70%)';
            });
        });
        
        // Ocultar quando o cursor sai da janela
        document.addEventListener('mouseleave', () => {
            cursorGlow.style.opacity = '0';
        });
    }

    /**
     * Configura correção de altura de viewport para mobile
     */
    setupViewportFix() {
        // Correção para viewport em iOS
        const setVhProperty = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVhProperty();
        
        window.addEventListener('resize', setVhProperty);
        window.addEventListener('orientationchange', setVhProperty);
    }

    /**
     * Configura lazy loading para imagens
     */
    setupLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    /**
     * Otimiza para conexões lentas
     */
    optimizeForConnection() {
        // Verificar conexão do dispositivo
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.saveData || 
                connection.effectiveType === 'slow-2g' || 
                connection.effectiveType === '2g') {
                
                document.body.classList.add('low-bandwidth');
                
                // Reduzir ou desativar efeitos pesados
                const heavyElements = document.querySelectorAll('.matrix-bg, .animated-bg');
                heavyElements.forEach(el => {
                    el.style.display = 'none';
                });
                
                // Carregar apenas imagens visíveis
                document.querySelectorAll('img:not([loading="lazy"])').forEach(img => {
                    img.setAttribute('loading', 'lazy');
                });
            }
        }
    }

    /**
     * Manipuladores de evento
     */
    handleScroll() {
        this.updateScrollIndicator();
        this.updateNavbar();
        this.parallaxEffect();
    }

    handleResize() {
        // Atualizar flags
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // Resetar menu mobile em desktop
        if (wasMobile && !this.isMobile) {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                document.body.style.overflow = '';
            }
        }
    }

    handleOrientationChange() {
        // Corrigir problemas de layout após mudança de orientação
        setTimeout(() => {
            // Forçar redraw
            window.scrollBy(0, 1);
            window.scrollBy(0, -1);
            
            // Atualizar altura do viewport
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 200);
    }

    /**
     * Atualiza indicador de rolagem
     */
    updateScrollIndicator() {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (!scrollIndicator) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollIndicator.style.width = `${scrollPercent}%`;
    }

    /**
     * Atualiza navegação durante rolagem
     */
    updateNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adicionar/remover classe com base na rolagem
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar navbar com base na direção de rolagem
        if (!this.lastScrollTop) this.lastScrollTop = 0;
        
        // Apenas ocultar após uma certa distância e em telas pequenas
        if (this.isMobile && scrollTop > 100) {
            if (scrollTop > this.lastScrollTop + 10) {
                navbar.style.transform = 'translateY(-100%)';
            } else if (scrollTop < this.lastScrollTop - 10) {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }

    /**
     * Aplica efeito parallax otimizado
     */
    parallaxEffect() {
        // Pular em dispositivos de baixo desempenho
        if (this.isLowEndDevice) return;
        
        const scrolled = window.pageYOffset || document.documentElement.scrollTop;
        
        // Aplicar parallax seletivamente
        const header = document.querySelector('.header');
        const particles = document.getElementById('particles');
        
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }

    /**
     * Utilitário: throttle para limitar a frequência de execução
     */
    throttle(func, wait) {
        let timeout = null;
        let previous = 0;
        
        return function(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }
}

// Inicializar o aplicativo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});