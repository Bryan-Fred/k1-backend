const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/supermarket', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  category: String, // Add the category field here
});

const Product = mongoose.model('Product', productSchema);

const updateProducts = async () => {
  try {
    // Add category field to all products
    const result = await Product.updateMany(
      {},
      { $set: { category: "Toiletries" } }
    );
    console.log('Update successful:', result);
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.connection.close();
  }
};

updateProducts();
