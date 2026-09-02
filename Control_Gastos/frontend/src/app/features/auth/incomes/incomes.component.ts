import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface Income {
  id: number;
  descripcion: string;
  monto: number;
  tipo: 'Fijo' | 'Variable';
  fecha: string;
}

interface Ahorro {
  id: number;
  descripcion: string;
  monto: number;
  categoria: 'Emergencia' | 'Inversión' | 'Retiro';
  fecha: string;
}

@Component({
  selector: 'app-incomes',
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
          <span class="menu-title">MENÚ</span>
          <ul>
            <li (click)="navigate('dashboard')"><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span> Dashboards</li>
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
              <input type="text" placeholder="Buscar transacción..." [(ngModel)]="searchTerm">
            </div>
            <button class="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <div class="user-profile">
              <span class="user-badge" [class.admin]="isAdmin">{{ isAdmin ? 'Admin' : 'Usuario' }}</span>
            </div>
            <button (click)="logout()" class="btn-logout-top">Salir</button>
          </div>
        </header>

        <!-- SECCIÓN: INGRESOS -->
        <section class="summary-cards">
          <div class="card stat-card">
            <div class="card-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <h3>Ingresos Fijos Totales</h3>
            </div>
            <h2>{{ money(fijosTotal) }}</h2>
            <p class="trend">Actualizado hoy</p>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <div class="icon purple">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              </div>
              <h3>Ingresos Variables Totales</h3>
            </div>
            <h2>{{ money(variablesTotal) }}</h2>
            <p class="trend">Actualizado hoy</p>
          </div>
        </section>

        <!-- PANELES DE INGRESOS -->
        <section class="panels">

          <!-- REGISTRAR INGRESO -->
          <div class="card form-card">
            <div class="panel-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              </div>
              <h3>Registrar Ingreso</h3>
            </div>

            <form class="income-form" (ngSubmit)="onSubmit()">
              <label for="descripcion">Descripción</label>
              <input id="descripcion" type="text" name="descripcion" placeholder="Ej: Salario mensual" [(ngModel)]="form.descripcion">

              <label for="monto">Monto (Q)</label>
              <input id="monto" type="number" min="0" step="0.01" name="monto" placeholder="0.00" [(ngModel)]="form.monto">

              <label for="tipo">Tipo de Ingreso</label>
              <select id="tipo" name="tipo" [(ngModel)]="form.tipo">
                <option value="Fijo">Fijo</option>
                <option value="Variable">Variable</option>
              </select>

              <label for="fecha">Fecha</label>
              <input id="fecha" type="text" name="fecha" placeholder="DD/MM/AAAA" [(ngModel)]="form.fecha">

              <button type="submit" class="btn-add" [disabled]="!form.descripcion || form.monto == null">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                {{ editingId != null ? 'Actualizar Ingreso' : 'Agregar Ingreso' }}
              </button>
            </form>
          </div>

          <!-- HISTORIAL -->
          <div class="card history-card">
            <div class="panel-header">
              <h3>Historial de Ingresos</h3>
              <span class="count-badge">{{ filteredIncomes.length }}</span>
            </div>

            <table class="income-table">
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
                @for (income of filteredIncomes; track income.id) {
                  <tr>
                    <td>{{ income.descripcion }}</td>
                    <td class="amount">{{ money(income.monto) }}</td>
                    <td>
                      <span class="chip" [class.fijo]="income.tipo === 'Fijo'" [class.variable]="income.tipo === 'Variable'">{{ income.tipo }}</span>
                    </td>
                    <td>{{ income.fecha }}</td>
                    <td class="actions">
                      <button class="action-btn edit" title="Editar" (click)="editIncome(income)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                      </button>
                      <button class="action-btn delete" title="Eliminar" (click)="deleteIncome(income.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="empty">No hay ingresos registrados</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

        </section>

        <!-- SECCIÓN: AHORROS -->
        <section class="section-ahorros">

          <div class="section-title">
            <h3>Ahorros</h3>
          </div>

          <section class="summary-cards">
            <div class="card stat-card">
              <div class="card-header">
                <div class="icon blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
                <h3>Total Ahorros</h3>
              </div>
              <h2>{{ money(ahorrosTotal) }}</h2>
              <p class="trend">Actualizado hoy</p>
            </div>

            <div class="card stat-card">
              <div class="card-header">
                <div class="icon orange">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                </div>
                <h3>Meta de Ahorro</h3>
              </div>
              <h2>{{ money(meta) }}</h2>
              <p class="trend">Actualizado hoy</p>
            </div>
          </section>

          <section class="panels">

            <!-- REGISTRAR AHORRO -->
            <div class="card form-card">
              <div class="panel-header">
                <div class="icon blue">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                </div>
                <h3>Registrar Ahorro</h3>
              </div>

              <form class="ahorro-form" (ngSubmit)="onSubmitAhorro()">
                <label for="ahorro-descripcion">Descripción</label>
                <input id="ahorro-descripcion" type="text" name="ahorroDescripcion" placeholder="Ej: Fondo de emergencia" [(ngModel)]="ahorroForm.descripcion">

                <label for="ahorro-monto">Monto (Q)</label>
                <input id="ahorro-monto" type="number" min="0" step="0.01" name="ahorroMonto" placeholder="0.00" [(ngModel)]="ahorroForm.monto">

                <label for="categoria">Categoría</label>
                <select id="categoria" name="ahorroCategoria" [(ngModel)]="ahorroForm.categoria">
                  <option value="">Seleccionar categoría</option>
                  <option value="Emergencia">Emergencia</option>
                  <option value="Inversión">Inversión</option>
                  <option value="Retiro">Retiro</option>
                </select>

                <label for="ahorro-fecha">Fecha</label>
                <input id="ahorro-fecha" type="text" name="ahorroFecha" placeholder="DD/MM/AAAA" [(ngModel)]="ahorroForm.fecha">

                <button type="submit" class="btn-add btn-add-blue" [disabled]="!ahorroForm.descripcion || ahorroForm.monto == null || !ahorroForm.categoria">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  {{ editingAhorroId != null ? 'Actualizar Ahorro' : 'Agregar Ahorro' }}
                </button>
              </form>
            </div>

            <!-- HISTORIAL -->
            <div class="card history-card">
              <div class="panel-header">
                <h3>Historial de Ahorros</h3>
                <span class="count-badge">{{ filteredAhorros.length }}</span>
              </div>

              <table class="income-table">
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Monto</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  @for (ahorro of filteredAhorros; track ahorro.id) {
                    <tr>
                      <td>{{ ahorro.descripcion }}</td>
                      <td class="amount">{{ money(ahorro.monto) }}</td>
                      <td>
                        <span class="chip" [class.emergencia]="ahorro.categoria === 'Emergencia'" [class.inversion]="ahorro.categoria === 'Inversión'" [class.retiro]="ahorro.categoria === 'Retiro'">{{ ahorro.categoria }}</span>
                      </td>
                      <td>{{ ahorro.fecha }}</td>
                      <td class="actions">
                        <button class="action-btn edit" title="Editar" (click)="editAhorro(ahorro)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                        </button>
                        <button class="action-btn delete" title="Eliminar" (click)="deleteAhorro(ahorro.id)">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="5" class="empty">No hay ahorros registrados</td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>

          </section>

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
      --text-main: #ffffff;
      --text-muted: #8b8d93;
      --brand-purple: #8b5cf6;
      --brand-lavender: #a78bfa;
      --brand-green: #10b981;
      --brand-blue: #3b82f6;
      --brand-amber: #f59e0b;
      --brand-red: #ef4444;
      --border-color: #2a2c31;

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

    /* SIDEBAR */
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
      color: var(--brand-lavender);
      border-left: 4px solid var(--brand-lavender);
      border-radius: 10px 0 0 10px;
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
      color: var(--brand-red);
      font-size: 0.85rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .logout-btn:hover {
      background: rgba(239, 68, 68, 0.1);
    }

    /* MAIN CONTENT */
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
      font-size: 1.6rem;
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
      background-color: var(--bg-input);
      border-radius: 20px;
      padding: 9px 18px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-muted);
    }

    .search-bar input {
      background: transparent;
      border: none;
      color: var(--text-main);
      outline: none;
      width: 190px;
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
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

    .user-badge {
      padding: 7px 16px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .btn-logout-top {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.25);
      padding: 9px 18px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.82rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s ease;
    }

    .btn-logout-top:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
    }

    /* SUMMARY CARDS */
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
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
      margin-bottom: 1.2rem;
    }

    .icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon.purple { background-color: rgba(139, 92, 246, 0.15); color: var(--brand-lavender); }
    .icon.green { background-color: rgba(16, 185, 129, 0.15); color: var(--brand-green); }
    .icon.blue { background-color: rgba(59, 130, 246, 0.15); color: #60a5fa; }
    .icon.orange { background-color: rgba(245, 158, 11, 0.15); color: var(--brand-amber); }

    .stat-card h3 {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    .stat-card h2 {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.4rem;
    }

    .trend {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 6px;
    }

    /* SECTION TITLE */
    .section-ahorros {
      margin-top: 2rem;
    }

    .section-title {
      display: flex;
      align-items: center;
      margin-bottom: 1.2rem;
    }

    .section-title h3 {
      font-size: 1.1rem;
      font-weight: 700;
    }

    .section-title::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--border-color);
      margin-left: 1rem;
    }

    /* PANELS */
    .panels {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 1.2rem;
      align-items: start;
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 1.2rem;
    }

    .panel-header h3 {
      font-size: 1rem;
      font-weight: 600;
      flex: 1;
    }

    .count-badge {
      background-color: var(--bg-input);
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 12px;
    }

    /* FORM */
    .income-form,
    .ahorro-form {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .income-form label,
    .ahorro-form label {
      font-size: 0.78rem;
      color: var(--text-muted);
      font-weight: 500;
      margin-top: 8px;
    }

    .income-form input,
    .income-form select,
    .ahorro-form input,
    .ahorro-form select {
      background-color: var(--bg-input);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 10px 14px;
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      outline: none;
    }

    .income-form input::placeholder,
    .ahorro-form input::placeholder {
      color: #6b7280;
    }

    .income-form input:focus,
    .income-form select:focus {
      border-color: var(--brand-purple);
    }

    .ahorro-form input:focus,
    .ahorro-form select:focus {
      border-color: var(--brand-blue);
    }

    .btn-add {
      margin-top: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 10px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: #ffffff;
      font-size: 0.9rem;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-add:hover:not(:disabled) {
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.35);
      transform: translateY(-1px);
    }

    .btn-add-blue {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
    }

    .btn-add-blue:hover:not(:disabled) {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.35);
    }

    .btn-add:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* TABLE */
    .history-card {
      overflow: hidden;
      padding: 1.4rem 0.5rem 1.4rem 1.4rem;
    }

    .income-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.85rem;
    }

    .income-table th {
      text-align: left;
      color: var(--text-muted);
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .income-table td {
      padding: 12px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      color: var(--text-main);
    }

    .income-table tr:last-child td {
      border-bottom: none;
    }

    .income-table tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.02);
    }

    .income-table .amount {
      font-weight: 600;
    }

    .chip {
      display: inline-block;
      padding: 3px 12px;
      border-radius: 12px;
      font-size: 0.72rem;
      font-weight: 600;
    }

    .chip.fijo {
      background-color: rgba(16, 185, 129, 0.15);
      color: var(--brand-green);
    }

    .chip.variable {
      background-color: rgba(139, 92, 246, 0.15);
      color: var(--brand-lavender);
    }

    .chip.emergencia {
      background-color: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
    }

    .chip.inversion {
      background-color: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
    }

    .chip.retiro {
      background-color: rgba(16, 185, 129, 0.15);
      color: #10b981;
    }

    .actions {
      display: flex;
      gap: 6px;
    }

    .action-btn {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background-color: var(--bg-input);
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .action-btn.edit:hover {
      color: var(--brand-lavender);
      background-color: rgba(139, 92, 246, 0.15);
    }

    .action-btn.delete:hover {
      color: #f87171;
      background-color: rgba(239, 68, 68, 0.15);
    }

    .empty {
      text-align: center;
      color: var(--text-muted);
      padding: 2rem 0 !important;
    }
  `]
})
export class IncomesComponent {
  authService = inject(AuthService);
  router = inject(Router);

  private readonly STORAGE_KEY = 'lumina_ingresos';
  private readonly STORAGE_KEY_AHORROS = 'lumina_ahorros';
  meta = 10000;

  searchTerm = '';

  form: { descripcion: string; monto: number | null; tipo: 'Fijo' | 'Variable'; fecha: string } = {
    descripcion: '',
    monto: null,
    tipo: 'Fijo',
    fecha: ''
  };

  editingId: number | null = null;
  incomes: Income[] = [];

  ahorroForm: { descripcion: string; monto: number | null; categoria: 'Emergencia' | 'Inversión' | 'Retiro' | ''; fecha: string } = {
    descripcion: '',
    monto: null,
    categoria: '',
    fecha: ''
  };

  editingAhorroId: number | null = null;
  ahorros: Ahorro[] = [];

  constructor() {
    this.loadIncomes();
    this.loadAhorros();
  }

  get fijosTotal(): number {
    return this.incomes
      .filter(i => i.tipo === 'Fijo')
      .reduce((sum, i) => sum + i.monto, 0);
  }

  get variablesTotal(): number {
    return this.incomes
      .filter(i => i.tipo === 'Variable')
      .reduce((sum, i) => sum + i.monto, 0);
  }

  get filteredIncomes(): Income[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.incomes;
    }
    return this.incomes.filter(i =>
      i.descripcion.toLowerCase().includes(term) ||
      i.tipo.toLowerCase().includes(term) ||
      i.fecha.toLowerCase().includes(term)
    );
  }

  get ahorrosTotal(): number {
    return this.ahorros.reduce((sum, a) => sum + a.monto, 0);
  }

  get filteredAhorros(): Ahorro[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.ahorros;
    }
    return this.ahorros.filter(a =>
      a.descripcion.toLowerCase().includes(term) ||
      a.categoria.toLowerCase().includes(term) ||
      a.fecha.toLowerCase().includes(term)
    );
  }

  get isAdmin(): boolean {
    return this.authService.currentUserSubject.value?.role === 'admin';
  }

  get userName(): string {
    return this.authService.currentUserSubject.value?.name || 'Usuario';
  }

  get roleLabel(): string {
    return this.isAdmin ? 'Administrador' : 'Usuario';
  }

  money(value: number): string {
    return 'Q' + value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  onSubmit(): void {
    if (!this.form.descripcion || this.form.monto == null) {
      return;
    }

    const monto = Number(this.form.monto);
    if (isNaN(monto)) {
      return;
    }

    if (this.editingId != null) {
      const index = this.incomes.findIndex(i => i.id === this.editingId);
      if (index !== -1) {
        this.incomes[index] = { ...this.incomes[index], descripcion: this.form.descripcion, monto, tipo: this.form.tipo, fecha: this.form.fecha };
      }
    } else {
      const nextId = this.incomes.reduce((max, i) => Math.max(max, i.id), 0) + 1;
      this.incomes.push({ id: nextId, descripcion: this.form.descripcion, monto, tipo: this.form.tipo, fecha: this.form.fecha });
    }

    this.resetForm();
    this.persist();
  }

  editIncome(income: Income): void {
    this.editingId = income.id;
    this.form = { descripcion: income.descripcion, monto: income.monto, tipo: income.tipo, fecha: income.fecha };
  }

  deleteIncome(id: number): void {
    this.incomes = this.incomes.filter(i => i.id !== id);
    if (this.editingId === id) {
      this.resetForm();
    }
    this.persist();
  }

  onSubmitAhorro(): void {
    if (!this.ahorroForm.descripcion || this.ahorroForm.monto == null || !this.ahorroForm.categoria) {
      return;
    }

    const monto = Number(this.ahorroForm.monto);
    if (isNaN(monto)) {
      return;
    }

    if (this.editingAhorroId != null) {
      const index = this.ahorros.findIndex(a => a.id === this.editingAhorroId);
      if (index !== -1) {
        this.ahorros[index] = { ...this.ahorros[index], descripcion: this.ahorroForm.descripcion, monto, categoria: this.ahorroForm.categoria, fecha: this.ahorroForm.fecha };
      }
    } else {
      const nextId = this.ahorros.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      this.ahorros.push({ id: nextId, descripcion: this.ahorroForm.descripcion, monto, categoria: this.ahorroForm.categoria, fecha: this.ahorroForm.fecha });
    }

    this.resetAhorroForm();
    this.persistAhorros();
  }

  editAhorro(ahorro: Ahorro): void {
    this.editingAhorroId = ahorro.id;
    this.ahorroForm = { descripcion: ahorro.descripcion, monto: ahorro.monto, categoria: ahorro.categoria, fecha: ahorro.fecha };
  }

  deleteAhorro(id: number): void {
    this.ahorros = this.ahorros.filter(a => a.id !== id);
    if (this.editingAhorroId === id) {
      this.resetAhorroForm();
    }
    this.persistAhorros();
  }

  private resetForm(): void {
    this.form = { descripcion: '', monto: null, tipo: 'Fijo', fecha: '' };
    this.editingId = null;
  }

  private resetAhorroForm(): void {
    this.ahorroForm = { descripcion: '', monto: null, categoria: '', fecha: '' };
    this.editingAhorroId = null;
  }

  private loadIncomes(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw) {
      try {
        this.incomes = JSON.parse(raw);
        return;
      } catch {
        this.incomes = [];
      }
    }
    this.incomes = [
      { id: 1, descripcion: 'Salario mensual', monto: 2500, tipo: 'Fijo', fecha: '01/08/2026' },
      { id: 2, descripcion: 'Freelance proyecto', monto: 800, tipo: 'Variable', fecha: '15/08/2026' },
      { id: 3, descripcion: 'Dividendos', monto: 150, tipo: 'Fijo', fecha: '20/08/2026' }
    ];
    this.persist();
  }

  private loadAhorros(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY_AHORROS);
    if (raw) {
      try {
        this.ahorros = JSON.parse(raw);
        return;
      } catch {
        this.ahorros = [];
      }
    }
    this.ahorros = [
      { id: 1, descripcion: 'Fondo de emergencia', monto: 500, categoria: 'Emergencia', fecha: '01/08/2026' },
      { id: 2, descripcion: 'Inversión acciones', monto: 1200, categoria: 'Inversión', fecha: '10/08/2026' },
      { id: 3, descripcion: 'Ahorro retiro', monto: 300, categoria: 'Retiro', fecha: '20/08/2026' }
    ];
    this.persistAhorros();
  }

  private persist(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.incomes));
  }

  private persistAhorros(): void {
    localStorage.setItem(this.STORAGE_KEY_AHORROS, JSON.stringify(this.ahorros));
  }

  logout(): void {
    this.authService.logout();
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}