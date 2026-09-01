import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Saving {
  id: string;
  user_id: string;
  descripcion: string | null;
  monto: number;
  created_at?: Date;
}

export interface SavingSummary {
  success: boolean;
  total: number;
  meta: number;
  progreso: number;
}

@Injectable({
  providedIn: 'root'
})
export class SavingService {
  private http = inject(HttpClient);

  getAll(): Observable<{ success: boolean; savings: Saving[] }> {
    return this.http.get<{ success: boolean; savings: Saving[] }>(`${environment.apiUrl}/savings`);
  }

  getSummary(): Observable<SavingSummary> {
    return this.http.get<SavingSummary>(`${environment.apiUrl}/savings/summary`);
  }

  create(data: { monto: number; descripcion?: string }): Observable<{ success: boolean; saving: Saving }> {
    return this.http.post<{ success: boolean; saving: Saving }>(`${environment.apiUrl}/savings`, data);
  }

  setGoal(meta: number): Observable<{ success: boolean; meta: number }> {
    return this.http.post<{ success: boolean; meta: number }>(`${environment.apiUrl}/savings/meta`, { meta });
  }

  delete(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${environment.apiUrl}/savings/${id}`);
  }
}
