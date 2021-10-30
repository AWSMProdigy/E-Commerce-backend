const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try{
  const cats = await Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  res.status(200).json(cats);
  return;
} catch (err) {
  res.status(500).json(err);
  return;
}
});

router.get('/:id', (req, res) => {
  try{
  const oneCat = await Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  if(oneCat){
    res.status(200).json(oneCat);
    return;
  }else{
    res.status(404).json({message: "No such category found"});
    return;
  }
}
catch (err) {
  res.status(500).json(err);
  return;
}
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try{
  const newCat = Category.create({
    category_name: req.body.category_name
  })
  res.status(200).json(newCat);
  return;
} catch(err){
    res.status(500).json(err);
    return;
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCat = Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(updatedCat){
      res.status(200).json(updatedCat);
      return;
    }else{
      res.status(404).json({message:"Category does not exist to be updated"});
      return;
    }
  } catch(err){
    res.status(500).json(err);
    return;
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try{
    const updatedCat = Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(updatedCat){
      res.status(200).json(updatedCat);
      return;
    }else{
      res.status(404).json({message:"Category does not exist to be deleted"});
      return;
    }
  } catch(err){
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
