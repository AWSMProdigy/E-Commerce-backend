const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    res.status(200).json(tags);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const oneTag = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    })
    if(oneTag){
      res.status(200).json(oneTag);
      return;
    }else{
      res.status(404).json({message: "No such Tag found"});
      return;
    }
  }
  catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
    tag_name: req.body.tag_name
  })
    res.status(200).json(newTag);
    return;
} catch(err){
    res.status(500).json(err);
    return;
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    console.log(req.body);
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(updatedTag){
      res.status(200).json(updatedTag);
      return;
    }else{
      res.status(404).json({message:"Tag does not exist to be updated"});
      return;
    }
  } catch(err){
    res.status(500).json(err);
    return;
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if(deletedTag){
      res.status(200).json(deletedTag);
      return;
    }else{
      res.status(404).json({message:"Tag does not exist to be deleted"});
      return;
    }
  } catch(err){
    res.status(500).json(err);
    return;
  }
});

module.exports = router;
