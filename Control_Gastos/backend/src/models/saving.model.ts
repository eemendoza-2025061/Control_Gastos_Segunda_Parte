export interface Saving {
  id: string;
  user_id: string;
  descripcion: string | null;
  monto: number;
  created_at?: Date;
}

export interface SavingInput {
  descripcion?: string | null;
  monto: number;
}

export interface SavingGoal {
  id: string;
  user_id: string;
  meta: number;
  updated_at?: Date;
}
