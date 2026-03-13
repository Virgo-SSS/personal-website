/**
 * Personal Website - Main JavaScript
 */

(function () {
    'use strict';

    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar-mobile');
    const overlay = document.getElementById('mobile-menu-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const currentYearEl = document.getElementById('current-year');

    function init() {
        initTheme();
        initSidebar();
        initCurrentYear();
        initActiveLink();
    }

    // Theme
    function initTheme() {
        const saved = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (saved === 'dark' || (!saved && prefersDark)) {
            document.documentElement.classList.add('dark');
        }

        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Sidebar
    function initSidebar() {
        if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
        if (overlay) overlay.addEventListener('click', closeSidebar);

        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) closeSidebar();
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSidebar();
        });
    }

    function openSidebar() {
        if (sidebar) sidebar.classList.remove('-translate-x-full');
        if (overlay) overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.add('-translate-x-full');
        if (overlay) overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Active link
    function initActiveLink() {
        const sections = document.querySelectorAll('section[id]');

        function update() {
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
        }

        window.addEventListener('scroll', update);
        update();
    }

    // Year
    function initCurrentYear() {
        if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
