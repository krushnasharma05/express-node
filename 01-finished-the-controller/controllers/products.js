const products = [];

exports.getAddProduct = (req, res, next) => {
  res.send(`
    <h1>Add Product</h1>
    <form action="/admin/add-product" method="POST" class="product-form">
      <label for="title">Product Title</label>
      <input type="text" id="title" name="title" placeholder="Product Title" class="form-control">
      <button type="submit" class="btn">Add Product</button>
    </form>
  `);
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  let productsHTML = '<h1>Shop</h1>';

  if (products.length > 0) {
    productsHTML += '<div class="grid">';
    for (const product of products) {
      productsHTML += `
        <div class="card product-item">
          <div class="card__header">
            <h1 class="product__title">${product.title}</h1>
          </div>
          <div class="card__content">
            <p class="product__description">Product description goes here.</p>
            <p class="product__price">$9.99</p>
          </div>
          <div class="card__actions">
            <button class="btn">Add to Cart</button>
            <a href="#" class="btn">Details</a>
          </div>
        </div>
      `;
    }
    productsHTML += '</div>';
  } else {
    productsHTML += '<p>No products available.</p>';
  }

  res.send(productsHTML);
};
