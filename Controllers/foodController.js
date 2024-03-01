const Food = require('../Models/Food');

const getAllFood = async (req, res) => {
  try {
    const food = await Food.find();
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createFood = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const food = new Food({
      name,
      description,
      price,
      image,
      category,
    });
    await food.save();
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;
  try {
    let food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    food.name = name;
    food.description = description;
    food.price = price;
    food.image = image;
    food.category = category;

    await food.save();
    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;
  try {
    let food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    await food.remove();
    res.json({ message: 'Food removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getAllFood, getFoodById, createFood, updateFood, deleteFood };