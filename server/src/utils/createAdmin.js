require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');

const createAdmin = async () => {
  const args = process.argv.slice(2);
  const name = args[0] || 'Constituency Administrator';
  const email = args[1] || 'admin@gmail.com';
  const password = args[2] || 'admin';

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sathenna_profile';
    await mongoose.connect(mongoUri);

    const existing = await AdminUser.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log(`[Admin Setup] Administrator with email '${email}' already exists. Updating password...`);
      existing.passwordHash = await AdminUser.hashPassword(password);
      existing.name = name;
      existing.isActive = true;
      await existing.save();
      console.log(`[Admin Setup] Password updated successfully for: ${email}`);
    } else {
      const passwordHash = await AdminUser.hashPassword(password);
      await AdminUser.create({
        name,
        email: email.toLowerCase(),
        passwordHash,
        role: 'admin',
        isActive: true
      });
      console.log(`[Admin Setup] New administrator created successfully: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('[Admin Setup Error]', error.message);
    process.exit(1);
  }
};

createAdmin();
