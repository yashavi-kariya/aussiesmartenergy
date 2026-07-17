import dotenv from 'dotenv';
import Admin from '../models/Admin.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
    await connectDB();

    const username = process.env.ADMIN_USERNAME || 'admin';
    const email = process.env.ADMIN_EMAIL || 'admin@aussiesmartenergy.com.au';
    const password = process.env.ADMIN_PASSWORD || 'Admin123!';

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
        console.log(`Default admin already exists: ${existingAdmin.username}`);
        process.exit(0);
    }

    const admin = await Admin.create({ username, email, password });

    console.log('✅ Default admin created!');
    console.log(`   Username : ${admin.username}`);
    console.log(`   Email    : ${admin.email}`);
    process.exit(0);
};

seedAdmin().catch((error) => {
    console.error(error);
    process.exit(1);
});
