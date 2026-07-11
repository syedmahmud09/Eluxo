const products = [
  {
    id: 'ELX-101',
    name: 'Royal Chronograph',
    collection: 'Command Series',
    category: ['men'],
    price: 18500,
    image: 'assets/watch-royal-chronograph.jpg',
    badge: 'Signature',
    description: 'A commanding chronograph defined by its deep black dial, warm gold-tone case and refined leather strap. Designed for a confident presence from day to evening.',
    specs: { Movement: 'Quartz Chronograph', Case: '42 mm', Strap: 'Black Leather', Crystal: 'Mineral Glass', Resistance: '5 ATM', Dial: 'Black / Gold' }
  },
  {
    id: 'ELX-102',
    name: 'Obsidian Classic',
    collection: 'Heritage Series',
    category: ['men'],
    price: 12500,
    image: 'assets/watch-obsidian-classic.jpg',
    badge: 'Essential',
    description: 'Restrained and elegant, the Obsidian Classic pairs a slim rose-gold-tone profile with an inky black dial and rich brown leather for effortless daily refinement.',
    specs: { Movement: 'Precision Quartz', Case: '40 mm', Strap: 'Brown Leather', Crystal: 'Mineral Glass', Resistance: '3 ATM', Dial: 'Obsidian Black' }
  },
  {
    id: 'ELX-103',
    name: 'Aureus Automatic',
    collection: 'Atelier Series',
    category: ['men', 'automatic'],
    price: 28500,
    image: 'assets/watch-aureus-automatic.jpg',
    badge: 'Automatic',
    description: 'An open-worked dial reveals the rhythm within. Aureus brings mechanical character, intricate detailing and a polished gold-tone silhouette together in one expressive timepiece.',
    specs: { Movement: 'Self-Winding', Case: '42 mm', Strap: 'Black Leather', Crystal: 'Hardened Mineral', Resistance: '5 ATM', Dial: 'Skeleton' }
  },
  {
    id: 'ELX-104',
    name: 'Midnight Steel',
    collection: 'Urban Series',
    category: ['men'],
    price: 16500,
    image: 'assets/watch-midnight-steel.jpg',
    badge: 'New',
    description: 'Contemporary geometry meets a deep blue sunburst dial. The integrated gunmetal bracelet gives Midnight Steel a sleek, architectural character.',
    specs: { Movement: 'Precision Quartz', Case: '41 mm', Strap: 'Steel Bracelet', Crystal: 'Mineral Glass', Resistance: '5 ATM', Dial: 'Midnight Blue' }
  },
  {
    id: 'ELX-105',
    name: 'Celeste Petite',
    collection: 'Élan Series',
    category: ['women'],
    price: 14500,
    image: 'assets/watch-celeste-ladies.jpg',
    badge: 'Petite',
    description: 'A graceful gold-tone bracelet and luminous ivory dial give Celeste Petite its quiet radiance. Delicate in scale, distinctive in detail.',
    specs: { Movement: 'Precision Quartz', Case: '28 mm', Strap: 'Gold-Tone Steel', Crystal: 'Mineral Glass', Resistance: '3 ATM', Dial: 'Pearl Ivory' }
  },
  {
    id: 'ELX-106',
    name: 'Voyager Dual Time',
    collection: 'Navigator Series',
    category: ['men'],
    price: 22000,
    image: 'assets/watch-voyager-dual.jpg',
    badge: 'Travel',
    description: 'Built for a world in motion, Voyager combines a bold 24-hour bezel, dual-time styling and polished steel with unmistakable black-and-gold ELUXO character.',
    specs: { Movement: 'Quartz GMT', Case: '42 mm', Strap: 'Steel Bracelet', Crystal: 'Hardened Mineral', Resistance: '10 ATM', Dial: 'Black / Gold' }
  }
];

const grid = document.querySelector('#product-grid');
const emptyState = document.querySelector('#empty-state');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');
const filterButtons = [...document.querySelectorAll('.filter-button')];
const modal = document.querySelector('#product-modal');
const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
let activeFilter = 'all';

function formatPrice(value) {
  return `৳${new Intl.NumberFormat('en-BD').format(value)}`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const sort = sortSelect.value;

  let visible = products.filter((product) => {
    const inCategory = activeFilter === 'all' || product.category.includes(activeFilter);
    const searchable = `${product.name} ${product.collection} ${product.id}`.toLowerCase();
    return inCategory && searchable.includes(query);
  });

  visible = [...visible].sort((a, b) => {
    if (sort === 'price-low') return a.price - b.price;
    if (sort === 'price-high') return b.price - a.price;
    if (sort === 'name') return a.name.localeCompare(b.name);
    return products.indexOf(a) - products.indexOf(b);
  });

  grid.innerHTML = visible.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 65}ms">
      <div class="product-image" data-open-product="${product.id}" tabindex="0" role="button" aria-label="View ${product.name} details">
        <img src="${product.image}" alt="${product.name} wristwatch" loading="lazy">
        <span class="product-badge">${product.badge}</span>
        <button class="quick-view" type="button" data-open-product="${product.id}">View details</button>
      </div>
      <div class="product-info">
        <span class="product-kicker">${product.collection} · ${product.id}</span>
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <p class="product-meta">${product.specs.Case} · ${product.specs.Movement}</p>
      </div>
    </article>
  `).join('');

  emptyState.hidden = visible.length > 0;
}

function setFilter(filter) {
  activeFilter = filter;
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  renderProducts();
}

function openProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const image = modal.querySelector('#modal-image');
  image.src = product.image;
  image.alt = `${product.name} wristwatch`;
  modal.querySelector('#modal-ref').textContent = `${product.collection} · Ref. ${product.id}`;
  modal.querySelector('#modal-title').textContent = product.name;
  modal.querySelector('#modal-price').textContent = formatPrice(product.price);
  modal.querySelector('#modal-description').textContent = product.description;
  modal.querySelector('#modal-specs').innerHTML = Object.entries(product.specs).map(([label, value]) => `
    <div><span>${label}</span><strong>${value}</strong></div>
  `).join('');

  modal.showModal();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.close();
  document.body.style.overflow = '';
}

filterButtons.forEach((button) => button.addEventListener('click', () => setFilter(button.dataset.filter)));
searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);

grid.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-open-product]');
  if (trigger) openProduct(trigger.dataset.openProduct);
});
grid.addEventListener('keydown', (event) => {
  const trigger = event.target.closest('.product-image[data-open-product]');
  if (trigger && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openProduct(trigger.dataset.openProduct);
  }
});

modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  const bounds = modal.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeModal();
});
modal.addEventListener('close', () => { document.body.style.overflow = ''; });

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  primaryNav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

document.querySelectorAll('.primary-nav a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
  primaryNav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

document.querySelectorAll('[data-footer-filter]').forEach((button) => button.addEventListener('click', () => {
  setFilter(button.dataset.footerFilter);
  document.querySelector('#collection').scrollIntoView({ behavior: 'smooth' });
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const header = document.querySelector('.site-header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 24); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelector('#year').textContent = new Date().getFullYear();
setFilter('all');
