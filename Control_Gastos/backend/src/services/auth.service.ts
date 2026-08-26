import bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt.util';

export class AuthService {
  private userRepository = new UserRepository();

  async login(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas'); // Mensaje genérico por seguridad
    }

    const isPasswordValid = await bcrypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    const token = generateToken(user);
    
    // Remover el password antes de devolver el usuario
    const { password: _, ...userWithoutPassword } = user;

    return {
      token,
      user: userWithoutPassword
    };
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
}