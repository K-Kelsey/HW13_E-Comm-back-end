const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagDataSingle = await Tag.findByPk(req.params.id, {
      
      // be sure to include its associated Product data
      include: [{ model: Product }],
    });

    if (!tagDataSingle) {
      res.status(404).json({ message: 'Uh-oh this tag does not exist!'});
      return;
    }

    res.status(200).json(tagDataSingle);
  } catch {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // find tag by id to update
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if(!tagData[0]) {
      res.status(404).json({ message: 'Tag was not found!' })
      return;
    }
    
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      },
    });
    
    if (!deleteTag) {
      res.status(404).json({ message: "There is no tag that matches this ID" });
      return;
    }
    
    res.status(200).json({ message: 'Tag successfully deleted' });
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;

