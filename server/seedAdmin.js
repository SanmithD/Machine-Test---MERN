import 'dotenv/config';
import { connect } from 'mongoose';
import { userModel } from './src/models/user.model.js';

const seedAdmin = async () => {
  try {
    await connect(process.env.DATABASE);
    
    const existingAdmin = await userModel.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = await userModel.create({
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
