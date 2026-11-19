const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
const scrim = document.querySelector('.scrim');
const closeBtn = document.querySelector('.close');

function setMenu(open) {
  nav.classList.toggle('open', open);
  scrim.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menu.setAttribute('aria-expanded', String(open));
  if (open) {
    closeBtn.focus();
  } else {
    menu.focus();
  }
}

menu?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
closeBtn?.addEventListener('click', () => setMenu(false));
scrim?.addEventListener('click', () => setMenu(false));

document.addEventListener('keydown', (e) => {
  if (!nav?.classList.contains('open')) return;
  if (e.key === 'Escape') {
    setMenu(false);
    return;
  }
  if (e.key === 'Tab') {
    const items = [closeBtn, ...nav.querySelectorAll('a')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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
