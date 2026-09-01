import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import {
  Income, IncomeService
} from '../../../core/services/income.service';
import { Saving, SavingService } from '../../../core/services/saving.service';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="app-container">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <img src="img/Logo.png" alt="Lúmina" class="logo-img">
        </div>

        <nav class="sidebar-menu">
          <span class="menu-title">MENU</span>
          <ul>
            <li (click)="goToDashboard()"><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span> Dashboard</li>
            <li class="active"><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span> Ingresos</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </span> Egresos</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </span> Deudas</li>
            <li *ngIf="isAdmin"><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </span> Usuarios</li>
          </ul>
        </nav>

        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div class="user-details">
              <span class="user-name">{{ userName }}</span>
              <span class="user-role">Rol: {{ roleLabel }}</span>
            </div>
          </div>
          <button class="logout-btn" (click)="logout()">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="main-content">

        <!-- HEADER -->
        <header class="topbar">
          <div class="topbar-title">
            <h1>Ingresos</h1>
            <p>Bienvenido, {{ userName }}</p>
          </div>

          <div class="topbar-actions">
            <div class="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Buscar transacción..." [(ngModel)]="searchTerm" name="search">
            </div>
            <button class="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <span class="admin-badge">Admin</span>
            <button class="logout-btn-top" (click)="logout()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Salir
            </button>
          </div>
        </header>

        <!-- MENSAJE -->
        <div *ngIf="mensaje" class="alert" [class.error]="mensajeError">
          {{ mensaje }}
          <button class="alert-close" (click)="mensaje=''">&times;</button>
        </div>

        <!-- TARJETAS DE RESUMEN -->
        <section class="summary-cards">
          <div class="card stat-card">
            <div class="card-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <h3>Ingresos Fijos Totales</h3>
            </div>
            <h2>Q{{ totalFijos.toFixed(2) }}</h2>
            <p class="trend">Actualizado hoy</p>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <div class="icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>Ingresos Variables Totales</h3>
            </div>
            <h2>Q{{ totalVariables.toFixed(2) }}</h2>
            <p class="trend">Actualizado hoy</p>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 2v20"/></svg>
              </div>
              <h3>Ahorro total</h3>
            </div>
            <h2>Q{{ savingTotal.toFixed(2) }}</h2>
            <p class="trend">De una meta de Q{{ savingMeta.toFixed(2) }}</p>
          </div>
        </section>

        <!-- CONTENIDO -->
        <section class="content-grid">

          <!-- PANEL REGISTRAR INGRESO -->
          <div class="card form-card">
            <h3 class="section-title">Registrar Ingreso</h3>

            <form (ngSubmit)="agregarIngreso()" class="ingreso-form">
              <div class="form-group">
                <label for="descripcion">Descripción</label>
                <input id="descripcion" type="text" placeholder="Ej: Salario mensual"
                  [(ngModel)]="nuevo.descripcion" name="descripcion" required>
              </div>

              <div class="form-group">
                <label for="monto">Monto (Q)</label>
                <input id="monto" type="number" step="0.01" min="0" placeholder="0.00"
                  [(ngModel)]="nuevo.monto" name="monto" required>
              </div>

              <div class="form-group">
                <label for="tipo">Tipo de Ingreso</label>
                <select id="tipo" [(ngModel)]="nuevo.tipo" name="tipo">
                  <option value="Fijo">Fijo</option>
                  <option value="Variable">Variable</option>
                </select>
              </div>

              <div class="form-group">
                <label for="fecha">Fecha</label>
                <input id="fecha" type="date" [(ngModel)]="nuevo.fecha" name="fecha" required>
              </div>

              <button type="submit" class="btn-add" [disabled]="cargando">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Agregar Ingreso
              </button>
            </form>
          </div>

          <!-- PANEL HISTORIAL -->
          <div class="card history-card">
            <h3 class="section-title">Historial de Ingresos</h3>

            <table class="ingreso-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Tipo</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ingreso of ingresosList">
                  <td><span class="cell-desc">{{ ingreso.descripcion }}</span></td>
                  <td class="cell-monto">Q{{ ingreso.monto.toFixed(2) }}</td>
                  <td>
                    <span class="chip" [class.chip-fijo]="ingreso.tipo === 'Fijo'"
                      [class.chip-variable]="ingreso.tipo === 'Variable'">
                      {{ ingreso.tipo }}
                    </span>
                  </td>
                  <td class="cell-fecha">{{ formatFecha(ingreso.fecha) }}</td>
                  <td class="cell-actions">
                    <button class="action-btn edit" (click)="editarIngreso(ingreso)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                    </button>
                    <button class="action-btn delete" (click)="eliminarIngreso(ingreso.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="ingresosList.length === 0">
                  <td colspan="5" class="empty-state">No hay ingresos registrados</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

        <!-- PANEL DE AHORRO -->
        <section class="saving-section">
          <div class="card form-card">
            <h3 class="section-title">Ingresar un Ahorro</h3>

            <form (ngSubmit)="agregarAhorro()" class="saving-form">
              <div class="form-group">
                <label for="ahorroMonto">Monto a ahorrar (Q)</label>
                <input id="ahorroMonto" type="number" step="0.01" min="0" placeholder="0.00"
                  [(ngModel)]="nuevoAhorro.monto" name="ahorroMonto" required>
              </div>
              <div class="form-group">
                <label for="ahorroDesc">Descripción (opcional)</label>
                <input id="ahorroDesc" type="text" placeholder="Ej: Ahorro del mes"
                  [(ngModel)]="nuevoAhorro.descripcion" name="ahorroDesc">
              </div>
              <div class="form-group">
                <label for="metaAhorro">Meta mensual (Q)</label>
                <input id="metaAhorro" type="number" step="0.01" min="0" placeholder="0.00"
                  [(ngModel)]="metaAhorro" name="metaAhorro">
              </div>
              <div class="form-actions">
                <button type="submit" class="btn-add" [disabled]="cargando">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 7H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Guardar Ahorro
                </button>
                <button type="button" class="btn-set-meta" (click)="guardarMeta()" [disabled]="cargando">
                  Guardar Meta
                </button>
              </div>
            </form>

            <div class="saving-progress" *ngIf="savingMeta > 0">
              <div class="saving-progress-header">
                <span>Progreso de meta</span>
                <span>{{ savingProgreso }}%</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill" [style.width.%]="savingProgreso"></div>
              </div>
            </div>
          </div>

          <div class="card history-card">
            <h3 class="section-title">Historial de Ahorros</h3>
            <table class="ingreso-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ahorro of ahorros">
                  <td><span class="cell-desc">{{ ahorro.descripcion || 'Ahorro' }}</span></td>
                  <td class="cell-monto">Q{{ ahorro.monto.toFixed(2) }}</td>
                  <td class="cell-fecha">{{ (ahorro.created_at | date:'dd/MM/yyyy') || '—' }}</td>
                  <td class="cell-actions">
                    <button class="action-btn delete" (click)="eliminarAhorro(ahorro.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                  </td>
                </tr>
                <tr *ngIf="ahorros.length === 0">
                  <td colspan="4" class="empty-state">No hay ahorros registrados</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :host {
      --bg-app: #0d0d0f;
      --bg-sidebar: #141416;
      --bg-card: #1a1a1e;
      --bg-input: #2a2c31;
      --border-color: #2a2c31;
      --text-main: #ffffff;
      --text-muted: #8b8d93;
      --text-secondary: #a0a2ab;
      --green: #10b981;
      --green-soft: rgba(16, 185, 129, 0.15);
      --purple: #8b5cf6;
      --purple-lavender: #a78bfa;
      --purple-soft: rgba(139, 92, 246, 0.15);
      --red: #ef4444;
      --blue: #3b82f6;
      --brand-orange: #d97706;

      display: block;
      height: 100vh;
      width: 100vw;
      background-color: var(--bg-app);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    .app-container {
      display: flex;
      height: 100vh;
    }

    /* ========== SIDEBAR ========== */
    .sidebar {
      width: 260px;
      min-width: 260px;
      background-color: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.5rem;
    }

    .logo-img {
      height: 60px;
      width: auto;
      border-radius: 10px;
      filter: drop-shadow(0 0 12px rgba(139, 92, 246, 0.6));
    }

    .menu-title {
      color: var(--text-muted);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 10px;
      display: block;
      margin-top: 1rem;
    }

    .sidebar-menu { flex: 1; }
    .sidebar-menu ul { list-style: none; }

    .sidebar-menu li {
      padding: 11px 14px;
      margin-bottom: 4px;
      border-radius: 10px;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .menu-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
    }

    .sidebar-menu li:hover {
      color: var(--text-main);
      background-color: rgba(255, 255, 255, 0.05);
    }

    .sidebar-menu li.active {
      background-color: rgba(139, 92, 246, 0.15);
      color: var(--purple-lavender);
    }

    /* SIDEBAR FOOTER */
    .sidebar-footer {
      border-top: 1px solid var(--border-color);
      padding-top: 1.2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--bg-input);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-muted);
    }

    .user-details {
      display: flex;
      flex-direction: column;
    }

    .user-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .user-role {
      font-size: 0.72rem;
      color: var(--text-muted);
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: var(--brand-orange);
      font-size: 0.85rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .logout-btn:hover {
      background: rgba(217, 119, 6, 0.1);
    }

    /* ========== MAIN CONTENT ========== */
    .main-content {
      flex: 1;
      padding: 2rem 2.5rem;
      overflow-y: auto;
    }

    /* TOPBAR */
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .topbar-title h1 {
      font-size: 1.7rem;
      font-weight: 700;
    }

    .topbar-title p {
      color: var(--text-muted);
      font-size: 0.85rem;
      margin-top: 4px;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 8px 14px;
      color: var(--text-muted);
      min-width: 220px;
    }

    .search-bar input {
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      width: 100%;
    }

    .search-bar input::placeholder {
      color: var(--text-muted);
    }

    .icon-btn {
      background-color: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 50%;
      width: 38px;
      height: 38px;
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .admin-badge {
      background-color: rgba(59, 130, 246, 0.15);
      color: var(--blue);
      border: 1px solid rgba(59, 130, 246, 0.4);
      border-radius: 20px;
      padding: 5px 14px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .logout-btn-top {
      display: flex;
      align-items: center;
      gap: 6px;
      background-color: rgba(239, 68, 68, 0.15);
      color: var(--red);
      border: 1px solid rgba(239, 68, 68, 0.4);
      border-radius: 10px;
      padding: 8px 14px;
      font-size: 0.8rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .logout-btn-top:hover {
      background-color: rgba(239, 68, 68, 0.25);
    }

    /* ALERT */
    .alert {
      background-color: var(--green-soft);
      color: var(--green);
      border: 1px solid rgba(16, 185, 129, 0.4);
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
    }

    .alert.error {
      background-color: rgba(239, 68, 68, 0.15);
      color: var(--red);
      border-color: rgba(239, 68, 68, 0.4);
    }

    .alert-close {
      background: transparent;
      border: none;
      color: inherit;
      font-size: 1.2rem;
      cursor: pointer;
    }

    /* SUMMARY CARDS */
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .card {
      background-color: var(--bg-card);
      border-radius: 14px;
      padding: 1.4rem;
      border: 1px solid var(--border-color);
    }

    .stat-card .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1rem;
    }

    .icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon.green { background-color: var(--green-soft); color: var(--green); }
    .icon.purple { background-color: var(--purple-soft); color: var(--purple-lavender); }

    .stat-card h3 {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .stat-card h2 {
      font-size: 1.7rem;
      margin-bottom: 0.4rem;
      font-weight: 700;
    }

    .trend {
      font-size: 0.78rem;
      color: var(--text-muted);
    }

    /* CONTENT GRID */
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }

    .section-title {
      font-size: 1.05rem;
      font-weight: 600;
      margin-bottom: 1.2rem;
    }

    /* FORM */
    .ingreso-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-size: 0.8rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .form-group input, .form-group select {
      background-color: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 11px 14px;
      color: var(--text-main);
      font-size: 0.9rem;
      font-family: 'Inter', sans-serif;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .form-group input:focus, .form-group select:focus {
      border-color: var(--purple);
    }

    .form-group input::placeholder {
      color: var(--text-muted);
    }

    .form-group select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B8D93' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      cursor: pointer;
    }

    .btn-add {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: var(--green);
      color: #ffffff;
      border: none;
      border-radius: 10px;
      padding: 13px 14px;
      font-size: 0.95rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      margin-top: 4px;
      transition: background 0.2s ease;
    }

    .btn-add:hover:not(:disabled) {
      background-color: #0ea371;
    }

    .btn-add:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-set-meta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background-color: var(--purple-soft);
      color: var(--purple-lavender);
      border: 1px solid rgba(139, 92, 246, 0.4);
      border-radius: 10px;
      padding: 13px 14px;
      font-size: 0.9rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .btn-set-meta:hover:not(:disabled) {
      background-color: rgba(139, 92, 246, 0.25);
    }

    .btn-set-meta:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 4px;
    }

    .form-actions .btn-add {
      flex: 1;
    }

    .form-actions .btn-set-meta {
      flex: 1;
    }

    /* HISTORY TABLE */
    .history-card {
      overflow: hidden;
    }

    .ingreso-table {
      width: 100%;
      border-collapse: collapse;
    }

    .ingreso-table th {
      text-align: left;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .ingreso-table td {
      padding: 12px;
      font-size: 0.85rem;
      border-bottom: 1px solid var(--border-color);
      color: var(--text-secondary);
    }

    .ingreso-table tr:last-child td {
      border-bottom: none;
    }

    .ingreso-table tr:hover td {
      background-color: rgba(255, 255, 255, 0.02);
    }

    .cell-desc {
      color: var(--text-main);
      font-weight: 500;
    }

    .cell-monto {
      font-weight: 600;
      color: var(--text-main);
    }

    .cell-fecha {
      color: var(--text-muted);
    }

    .chip {
      display: inline-block;
      border-radius: 20px;
      padding: 4px 12px;
      font-size: 0.72rem;
      font-weight: 600;
    }

    .chip-fijo {
      background-color: var(--green-soft);
      color: var(--green);
    }

    .chip-variable {
      background-color: var(--purple-soft);
      color: var(--purple-lavender);
    }

    .cell-actions {
      display: flex;
      gap: 6px;
    }

    .action-btn {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background-color: var(--bg-input);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .action-btn.edit { color: var(--blue); }
    .action-btn.delete { color: var(--red); }

    .action-btn.edit:hover {
      background-color: rgba(59, 130, 246, 0.15);
    }

    .action-btn.delete:hover {
      background-color: rgba(239, 68, 68, 0.15);
    }

    .empty-state {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem 0;
      font-size: 0.9rem;
    }

    /* SAVING SECTION */
    .saving-section {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 1.2rem;
    }

    .saving-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .saving-progress {
      margin-top: 1.4rem;
      padding-top: 1.2rem;
      border-top: 1px solid var(--border-color);
    }

    .saving-progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.85rem;
      margin-bottom: 0.7rem;
      color: var(--text-secondary);
    }

    .saving-progress-header span:last-child {
      color: var(--green);
      font-weight: 700;
    }

    .progress-track {
      width: 100%;
      height: 10px;
      background-color: var(--bg-input);
      border-radius: 10px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--green), #34d399);
      border-radius: 10px;
      transition: width 0.5s ease;
    }
  `]
})
export class IngresosComponent implements OnInit {
  authService = inject(AuthService);
  incomeService = inject(IncomeService);
  savingService = inject(SavingService);
  private router = inject(Router);

  searchTerm = '';
  mensaje = '';
  mensajeError = false;
  cargando = false;

  ingresos: Income[] = [];
  ahorros: Saving[] = [];

  nuevo = {
    descripcion: '',
    monto: null as number | null,
    tipo: 'Fijo' as 'Fijo' | 'Variable',
    fecha: ''
  };

  nuevoAhorro = {
    monto: null as number | null,
    descripcion: ''
  };

  metaAhorro: number | null = null;
  savingTotal = 0;
  savingMeta = 0;
  savingProgreso = 0;

  get ingresosList(): Income[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.ingresos;
    return this.ingresos.filter(i =>
      i.descripcion.toLowerCase().includes(term) ||
      i.tipo.toLowerCase().includes(term) ||
      (i.fecha || '').toLowerCase().includes(term)
    );
  }

  get totalFijos(): number {
    return this.ingresos.filter(i => i.tipo === 'Fijo').reduce((s, i) => s + Number(i.monto), 0);
  }

  get totalVariables(): number {
    return this.ingresos.filter(i => i.tipo === 'Variable').reduce((s, i) => s + Number(i.monto), 0);
  }

  ngOnInit(): void {
    this.cargarIngresos();
    this.cargarAhorros();
  }

  cargarIngresos(): void {
    this.incomeService.getAll().subscribe({
      next: (res) => { this.ingresos = res.incomes; },
      error: (err) => this.mostrarMensaje(this.extraerError(err), true)
    });
  }

  cargarAhorros(): void {
    this.savingService.getSummary().subscribe({
      next: (res) => {
        this.savingTotal = res.total;
        this.savingMeta = res.meta;
        this.savingProgreso = res.progreso;
        this.metaAhorro = res.meta;
        this.savingService.getAll().subscribe({
          next: (s) => { this.ahorros = s.savings; },
          error: (err) => this.mostrarMensaje(this.extraerError(err), true)
        });
      },
      error: (err) => this.mostrarMensaje(this.extraerError(err), true)
    });
  }

  agregarIngreso(): void {
    if (!this.nuevo.descripcion || this.nuevo.monto == null || this.nuevo.monto < 0) return;
    this.cargando = true;
    this.incomeService.create({
      descripcion: this.nuevo.descripcion,
      monto: this.nuevo.monto,
      tipo: this.nuevo.tipo,
      fecha: this.nuevo.fecha || null
    }).subscribe({
      next: () => {
        this.mostrarMensaje('Ingreso registrado correctamente');
        this.nuevo = { descripcion: '', monto: null, tipo: 'Fijo', fecha: '' };
        this.cargarIngresos();
        this.cargando = false;
      },
      error: (err) => {
        this.mostrarMensaje(this.extraerError(err), true);
        this.cargando = false;
      }
    });
  }

  eliminarIngreso(id: string): void {
    this.incomeService.delete(id).subscribe({
      next: () => {
        this.mostrarMensaje('Ingreso eliminado');
        this.cargarIngresos();
      },
      error: (err) => this.mostrarMensaje(this.extraerError(err), true)
    });
  }

  editarIngreso(ingreso: Income): void {
    this.nuevo = {
      descripcion: ingreso.descripcion,
      monto: Number(ingreso.monto),
      tipo: ingreso.tipo,
      fecha: this.toDateInput(ingreso.fecha)
    };
    this.eliminarIngreso(ingreso.id);
  }

  formatFecha(fecha: string | null): string {
    if (!fecha) return '—';
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return fecha;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  toDateInput(fecha: string | null): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }

  agregarAhorro(): void {
    if (this.nuevoAhorro.monto == null || this.nuevoAhorro.monto < 0) return;
    this.cargando = true;
    this.savingService.create({
      monto: this.nuevoAhorro.monto,
      descripcion: this.nuevoAhorro.descripcion || undefined
    }).subscribe({
      next: () => {
        this.mostrarMensaje('Ahorro guardado correctamente');
        this.nuevoAhorro = { monto: null, descripcion: '' };
        this.cargarAhorros();
        this.cargando = false;
      },
      error: (err) => {
        this.mostrarMensaje(this.extraerError(err), true);
        this.cargando = false;
      }
    });
  }

  eliminarAhorro(id: string): void {
    this.savingService.delete(id).subscribe({
      next: () => {
        this.mostrarMensaje('Ahorro eliminado');
        this.cargarAhorros();
      },
      error: (err) => this.mostrarMensaje(this.extraerError(err), true)
    });
  }

  guardarMeta(): void {
    if (this.metaAhorro == null || this.metaAhorro < 0) return;
    this.cargando = true;
    this.savingService.setGoal(this.metaAhorro).subscribe({
      next: () => {
        this.mostrarMensaje('Meta de ahorro actualizada');
        this.cargarAhorros();
        this.cargando = false;
      },
      error: (err) => {
        this.mostrarMensaje(this.extraerError(err), true);
        this.cargando = false;
      }
    });
  }

  private mostrarMensaje(msg: string, error = false): void {
    this.mensaje = msg;
    this.mensajeError = error;
    setTimeout(() => { this.mensaje = ''; }, 4000);
  }

  private extraerError(err: any): string {
    return err?.error?.message || err?.message || 'Ocurrió un error';
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  get userName(): string {
    return this.authService.currentUserSubject.value?.name || 'Usuario';
  }

  get isAdmin(): boolean {
    return this.authService.currentUserSubject.value?.role === 'admin';
  }

  get roleLabel(): string {
    return this.isAdmin ? 'Administrador' : 'Usuario';
  }

  logout(): void {
    this.authService.logout();
  }
}
