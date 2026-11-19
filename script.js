const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.focus();
  }
});

document.querySelectorAll('#year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('[data-category]');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const chosen = button.dataset.filter;
    filters.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
    items.forEach((item) => {
      item.hidden = chosen !== 'all' && item.dataset.category !== chosen;
    });
  });
});
