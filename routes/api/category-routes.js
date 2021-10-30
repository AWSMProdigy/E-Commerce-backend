const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  // create a new category
  try{
  const newCat = await Category.create({
    category_name: req.body.category_name
  })
  res.status(200).json(newCat);
  return;
} catch(err){
    res.status(500).json(err);
    return;
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updatedCat = await Category.update(req.body, {
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

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletedCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(updatedCat){
      res.status(200).json(deletedCat);
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
