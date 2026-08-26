export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional porque no siempre lo devolvemos
  role: 'admin' | 'user';
  created_at?: Date;
  updated_at?: Date;
}