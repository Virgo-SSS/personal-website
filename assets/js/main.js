'use strict';

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeSidebarBtn = document.getElementById('close-sidebar');
const sidebar = document.getElementById('sidebar-mobile');
const overlay = document.getElementById('mobile-menu-overlay');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const currentYearEl = document.getElementById('current-year');

const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const openSidebar = () => {
    sidebar?.classList.remove('-translate-x-full');
    overlay?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

const closeSidebar = () => {
    sidebar?.classList.add('-translate-x-full');
    overlay?.classList.add('hidden');
    document.body.style.overflow = '';
};

const initTheme = () => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (saved === 'dark' || (!saved && prefersDark)) {
        document.documentElement.classList.add('dark');
    }

    themeToggle?.addEventListener('click', toggleTheme);
    themeToggleMobile?.addEventListener('click', toggleTheme);
};

const initSidebar = () => {
    mobileMenuBtn?.addEventListener('click', openSidebar);
    closeSidebarBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) closeSidebar();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });
};

const initActiveLink = () => {
    const sections = document.querySelectorAll('section[id]');

    const update = () => {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            document.querySelectorAll(`.sidebar-link[href="#${id}"]`).forEach(link => {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '#14b8a6';
                    link.classList.add('font-medium');
                } else {
                    link.style.color = '';
                    link.classList.remove('font-medium');
                }
            });
        });
    };

    window.addEventListener('scroll', update);
    update();
};

const initCurrentYear = () => {
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
};

const FANCYBOX_CSS = 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css';
const FANCYBOX_JS = 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js';

const loadStylesheet = (href) => new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
});

const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
});

let fancyboxLoading = null;
const ensureFancybox = () => {
    if (typeof Fancybox !== 'undefined') return Promise.resolve();
    if (fancyboxLoading) return fancyboxLoading;
    fancyboxLoading = Promise.all([loadStylesheet(FANCYBOX_CSS), loadScript(FANCYBOX_JS)])
        .then(() => Fancybox.bind('[data-fancybox]', { Images: { zoom: true } }));
    return fancyboxLoading;
};

const initFancybox = () => {
    document.addEventListener('click', async (e) => {
        const trigger = e.target.closest('[data-fancybox]');
        if (!trigger) return;
        if (typeof Fancybox !== 'undefined') return;
        e.preventDefault();
        await ensureFancybox();
        trigger.click();
    }, true);
};

const init = () => {
    initTheme();
    initSidebar();
    initCurrentYear();
    initActiveLink();
    initFancybox();
};

init();
