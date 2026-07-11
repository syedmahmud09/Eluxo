# ELUXO Watch Catalogue Website

A responsive, English-language Black & Gold catalogue website for **ELUXO**.

## Open the website

Open `index.html` in any modern browser. The site is completely static and does not require installation or a server.

## Included

- Luxury responsive homepage
- Six sample ELUXO watches with locally stored product images
- Category filters: All, Men, Women, Automatic
- Product search and price/name sorting
- Product-detail modal with specifications
- Mobile navigation
- Accessible keyboard controls and reduced-motion support
- Original supplied ELUXO logo, cropped for web display

## Important before publishing

The product names, prices, descriptions and specifications are **sample content** created for the first version. Replace them with your real inventory before publishing. The catalogue intentionally does not include cart, checkout or online ordering.

## Edit products

Open `script.js`. Each object inside `products` controls one product:

```js
{
  id: 'ELX-101',
  name: 'Royal Chronograph',
  price: 18500,
  image: 'assets/watch-royal-chronograph.jpg',
  // ...
}
```

To replace a product image, copy the new image into `assets/` and update its `image` path.

## Main files

- `index.html` — page structure and content
- `styles.css` — complete visual design and responsive layout
- `script.js` — product data, filtering, search, sorting and modal
- `assets/` — ELUXO logo and product images
