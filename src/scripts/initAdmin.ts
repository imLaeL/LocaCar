import connectDB from '../config/db';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const initAdmin = async () => {
  try {
    await connectDB();
    
    const adminEmail = 'admin@locacar.com';
    const adminPassword = 'admin123';
    
    // Verificar se o admin já existe
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Usuário admin já existe!');
      // Atualizar senha caso necessário
      existingAdmin.password = adminPassword;
      existingAdmin.admin = true;
      await existingAdmin.save();
      console.log('Senha do admin atualizada!');
      process.exit(0);
    }
    
    // Criar novo admin
    const admin = new User({
      name: 'Administrador',
      email: adminEmail,
      password: adminPassword,
      admin: true,
    });
    
    await admin.save();
    console.log('Usuário admin criado com sucesso!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Senha: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error('Erro ao inicializar admin:', error);
    process.exit(1);
  }
};

initAdmin();

