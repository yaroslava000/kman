// Мінімальна логіка: підсвічування активної кнопки та плавний скрол
document.addEventListener('DOMContentLoaded', function () {
    const navBtns = Array.from(document.querySelectorAll('.nav-btn'));
    const sections = navBtns.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

    // Плавний скрол при кліку (fallback)
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = document.querySelector(btn.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', btn.getAttribute('href'));
            }
        });
    });

    // Підсвічування активної кнопки при скролі
    function onScroll() {
        const offset = window.scrollY + window.innerHeight * 0.18;
        let activeIndex = 0;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop <= offset) activeIndex = i;
            else break;
        }
        navBtns.forEach((b, i) => b.classList.toggle('active', i === activeIndex));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});