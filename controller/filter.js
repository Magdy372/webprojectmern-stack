import filter from "../models/product_schema.js";

const filterform = (req, res) => {
  const category = req.body.category;
  const brand = req.body.brand;
  let query = { category: category };
  if (brand) {
    query['brand'] = brand;
  }
  
  filter.find(query)
    .then(results => {
      if (category === "laptop") {
        if (brand && results.length > 0 && results[0].brand === brand) {
          res.render('laptops', { products: results, user: (req.session.user === undefined ? "" : req.session.user) });
        } else {
          res.render('laptops', { products: results, user: (req.session.user === undefined ? "" : req.session.user) });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

export default filterform;