const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const adminModel = require('./models/userAdminModel');

mongoose.connect(`mongodb+srv://siyad:o2Omi34vLMmvKUNr@cluster0.ietlnyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Mongo connection opened");
  })
  .catch((err) => {
    console.error(err);
  });

const seedAdmin = [
  {
    userName: 'admin',
    email: 'admin@gmail.com',
    phone: '7356935589',
    password: 'admin123',
    role: 'admin',
  }
];

const seedDb = async () => {
  try {
    const hashedPassword = await bcrypt.hash("password", 10);

    seedAdmin[0].password = hashedPassword;

    await adminModel.insertMany(seedAdmin);

    console.log("Seeding complete");
  } catch (error) {
    console.error("Error seeding database:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDb();
