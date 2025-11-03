const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Sample products data with real Unsplash images
const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 25999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.5,
    numReviews: 120
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracker and smartwatch with heart rate monitor',
    price: 64999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 30,
    rating: 4.3,
    numReviews: 85
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily workouts',
    price: 29299,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    stock: 100,
    rating: 4.7,
    numReviews: 200
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable backpack with laptop compartment',
    price: 16299,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 75,
    rating: 4.4,
    numReviews: 150
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 22799,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 40,
    rating: 4.6,
    numReviews: 95
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat for fitness and meditation',
    price: 9749,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 120,
    rating: 4.5,
    numReviews: 180
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with USB charging port',
    price: 13099,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    stock: 60,
    rating: 4.2,
    numReviews: 110
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker',
    price: 19499,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    stock: 80,
    rating: 4.6,
    numReviews: 140
  },
  {
    name: 'Gaming Mouse',
    description: 'RGB gaming mouse with programmable buttons',
    price: 14949,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    stock: 65,
    rating: 4.4,
    numReviews: 175
  },
  {
    name: 'Water Bottle',
    description: 'Insulated stainless steel water bottle, 32oz',
    price: 8149,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    stock: 150,
    rating: 4.6,
    numReviews: 220
  },
  {
    name: 'Sunglasses',
    description: 'UV protection polarized sunglasses',
    price: 25999,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    stock: 90,
    rating: 4.3,
    numReviews: 130
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    price: 42249,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 45,
    rating: 4.7,
    numReviews: 165
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'admin123',
  role: 'admin'
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Existing data cleared');

    // Insert products
    await Product.insertMany(products);
    console.log(`${products.length} products added successfully!`);

    // Create admin user
    await User.create(adminUser);
    console.log('Admin user created');

    console.log('\n✅ Database seeded successfully!');
    console.log('📧 Admin credentials: admin@example.com / admin123');
    console.log(`🛍️  Added ${products.length} products with real images\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
