document.addEventListener('DOMContentLoaded', () => {
    // Cursor glow effect
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Navbar scroll effect
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for scroll elements
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);

        // Card hover glow tracking
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Reusable typing animation function
    function initTypewriter(selector, words, loopDelay = 2000, typingSpeed = 120, erasingSpeed = 50) {
        const el = document.querySelector(selector);
        if (!el) return;
        
        el.classList.add('typing-active');
        let fallbackText = el.textContent;
        el.textContent = '';
        
        // If words is empty but element had text, use that text
        if (words.length === 0 && fallbackText) {
            words = [fallbackText];
        }
        if (words.length === 0) return;
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                el.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                el.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? erasingSpeed : typingSpeed;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = loopDelay;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        const typeObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(type, 500);
                typeObserver.disconnect();
            }
        }, { threshold: 0.5 });
        
        typeObserver.observe(el.closest('h2, div, p'));
    }

    initTypewriter('.typing-text', [], 2000, 150, 80);
    initTypewriter('.typing-text-2', ['Premium Luxury Rides', 'Your Safety, Our Priority', '24/7 Availability'], 2000, 100, 50);
});
