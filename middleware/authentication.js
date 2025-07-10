// Authentication middleware
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === process.env.api_key) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  };
  
  // Error handling middleware
  const err = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  };
  
  // Validation middleware for product data
  const validateProduct = (req, res, next) => {
    const { name, description, price, category, inStock } = req.body;
    if (
      typeof name === 'string' &&
      typeof description === 'string' &&
      typeof price === 'number' &&
      typeof category === 'string' &&
      typeof inStock === 'boolean'
    ) {
      next();
    } else {
      res.status(400).send('Validation Error: Invalid product data');
    }
  };
  
  // Request logging middleware
  const logger = (req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  };
  
  // Export all middleware functions
  module.exports = {
    auth,
    err,
    validateProduct,
    logger,
  };