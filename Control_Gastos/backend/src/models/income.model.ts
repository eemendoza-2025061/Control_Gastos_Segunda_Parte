export interface Income {
  id: string;
  user_id: string;
  descripcion: string;
  monto: number;
  tipo: 'Fijo' | 'Variable';
  fecha: string | null;
  created_at?: Date;
}

export interface IncomeInput {
  descripcion: string;
  monto: number;
  tipo: 'Fijo' | 'Variable';
  fecha: string | null;
}
