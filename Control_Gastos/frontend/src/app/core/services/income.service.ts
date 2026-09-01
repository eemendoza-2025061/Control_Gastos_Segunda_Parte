import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private http = inject(HttpClient);

  getAll(): Observable<{ success: boolean; incomes: Income[] }> {
    return this.http.get<{ success: boolean; incomes: Income[] }>(`${environment.apiUrl}/incomes`);
  }

  getTotal(): Observable<{ success: boolean; total: number }> {
    return this.http.get<{ success: boolean; total: number }>(`${environment.apiUrl}/incomes/total`);
  }

  create(data: IncomeInput): Observable<{ success: boolean; income: Income }> {
    return this.http.post<{ success: boolean; income: Income }>(`${environment.apiUrl}/incomes`, data);
  }

  update(id: string, data: Partial<IncomeInput>): Observable<{ success: boolean; income: Income }> {
    return this.http.put<{ success: boolean; income: Income }>(`${environment.apiUrl}/incomes/${id}`, data);
  }

  delete(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${environment.apiUrl}/incomes/${id}`);
  }
}
