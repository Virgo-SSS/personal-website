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

const initFancybox = () => {
    if (typeof Fancybox === 'undefined') return;
    Fancybox.bind('[data-fancybox]', {
        Images: { zoom: true },
    });
};

const init = () => {
    initTheme();
    initSidebar();
    initCurrentYear();
    initActiveLink();
    initFancybox();
};

init();
