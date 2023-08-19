const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const faker = require("faker");


dotenv.config();

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());





//connect to db
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to db'))
    .catch(err => console.log(err));


//import models
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Coupon = require('./models/couponModel');
const Order = require('./models/orderModel');
const Blog = require('./models/blogModel');



//import routes
const authRoute = require('./routes/auth');
// const postRoute = require('./routes/posts');
const productRoute = require('./routes/products');
// const blogRoute = require('./routes/blogs');
const wishlistRoute = require('./routes/wishlist');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


//route middlewares
app.use('/api/user', authRoute);
// app.use('/api/posts', postRoute);
app.use('/api/products', productRoute);
// app.use('/api/blog', blogRoute);
app.use('/api/wishlist', wishlistRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);


app.use('/api/coupon', async (req, res) => {
  const coupon = await Coupon.find();
  res.send(coupon);
}
);


const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
});

// Assuming you have already configured your cloudinary instance

const getImagesInFolder = async (folderName) => {
  try {
    const response = await cloudinary.api.resources({
      type: "upload",
      prefix: folderName + "/", // Specify the folder name as a prefix
      resource_type: "image",   // Only retrieve image resources
      max_results: 500          // Maximum number of resources to return, defaults to 10, set to 500 to match default limit
    });

    // generateDummyProducts(response.resources);

    let images = []
    for (let i = 0; i < response.resources.length; i++) {
        const image = {
            public_id: response.resources[i].public_id,
            url: response.resources[i].secure_url
        }
        images.push(image)
    }
    console.log(images);

    generateDummyProducts(images);

    const imageUrls = response.resources.map((resource) => resource.secure_url);

    console.log("Image URLs in folder:", imageUrls);
    console.log("Total number of images in folder:", imageUrls.length);
    return imageUrls;
  } catch (error) {
    console.error("Error getting images in folder:", error);
    throw error;
  }
};



const folderName = "samples/ecommerce";

// getImagesInFolder(folderName);


const generateDummyProducts = async (imageUrls) => {
  try {
    const dummyProducts = [];

    for (let i = 0; i < imageUrls.length; i++) {
      const title = faker.commerce.productName();
      const slug = title.replace(/\s+/g, "-").toLowerCase();
      const description = faker.lorem.paragraph();
      const price = faker.commerce.price();
      const category = faker.commerce.department();
      const brand = faker.company.companyName();
      const quantity = Math.floor(Math.random() * 100);
      const color = [faker.commerce.color()];
      const tags = Math.random() < 0.5 ? "popular" : Math.random() < 0.5 ? "featured" : "special";
      const product = {
        title,
        slug,
        description,
        price,
        category,
        brand,
        quantity,
        images: [imageUrls[i]],
        color,
        tags,
      };
      dummyProducts.push(product);
    }

    await Product.insertMany(dummyProducts);
    console.log("Dummy products created successfully");
  } catch (error) {
    console.error("Error seeding dummy products:", error);
  } 
};





app.listen(27017, () => console.log('server up and running'));
