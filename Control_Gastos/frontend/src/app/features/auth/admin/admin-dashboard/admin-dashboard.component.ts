import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-container">

      <!-- SIDEBAR -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <img src="img/Logo.png" alt="Logo" class="logo-img">
          <h2>Lúmina</h2>
        </div>

        <nav class="sidebar-menu">
          <span class="menu-title">Menu</span>
          <ul>
            <li class="active"><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </span> Dashboards</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </span> Transaction</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </span> Statistics</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </span> Analytics</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span> My Wallet</li>
          </ul>

          <span class="menu-title">Help</span>
          <ul>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </span> Support</li>
            <li><span class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            </span> Setting</li>
          </ul>
        </nav>
      </aside>

      <!-- CONTENIDO PRINCIPAL -->
      <main class="main-content">

        <!-- CABECERA -->
        <header class="topbar">
          <div class="topbar-title">
            <h1>Dashboard</h1>
            <p>Bienvenido, {{ (authService.currentUser$ | async)?.name }}</p>
          </div>

          <div class="topbar-actions">
            <div class="search-bar">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted)"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" placeholder="Search...">
            </div>
            <button class="icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </button>
            <div class="user-profile">
              <span class="user-badge">Admin</span>
            </div>
            <button (click)="logout()" class="btn-logout-top">Salir</button>
          </div>
        </header>

        <!-- TARJETAS DE RESUMEN -->
        <section class="summary-cards">
          <div class="card stat-card">
            <div class="card-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3>Total earnings</h3>
            </div>
            <h2>$0.00</h2>
            <p class="trend"><span>0%</span> from last week</p>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <div class="icon green">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <h3>Total Spending</h3>
            </div>
            <h2>$0.00</h2>
            <p class="trend"><span>0%</span> from last week</p>
          </div>

          <div class="card stat-card">
            <div class="card-header">
              <div class="icon gold">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3>Spending Goal</h3>
            </div>
            <h2>$0.00</h2>
            <p class="trend"><span>0%</span> from last week</p>
          </div>
        </section>

        <!-- GRÁFICOS -->
        <section class="charts-section">
          <div class="card chart-large">
            <h3>Revenue Flow</h3>
            <div class="placeholder-chart">
              <p style="color: #64748b; margin-top: 40px; text-align: center;">[Área del Gráfico de Barras]</p>
            </div>
          </div>

          <div class="card chart-small">
            <h3>Efficiency</h3>
            <div class="placeholder-chart">
              <p style="color: #64748b; margin-top: 40px; text-align: center;">[Área del Gráfico Circular]</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :host {
      --bg-app: #131517;
      --bg-sidebar: #181a1c;
      --bg-card: #1e1f23;
      --bg-input: #2a2c31;
      --text-main: #ffffff;
      --text-muted: #8b8d93;
      --brand-green: #10b981;
      --brand-gold: #f59e0b;
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

    .sidebar {
      width: 260px;
      background-color: var(--bg-sidebar);
      border-right: 1px solid var(--border-color);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 2.5rem;
    }

    .logo-img {
      height: 36px;
      width: auto;
      border-radius: 8px;
      filter: drop-shadow(0 0 6px rgba(99, 102, 241, 0.4));
    }

    .sidebar-brand h2 {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .menu-title {
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
      display: block;
      margin-top: 1.5rem;
    }

    .sidebar-menu ul { list-style: none; }

    .sidebar-menu li {
      padding: 12px 15px;
      margin-bottom: 5px;
      border-radius: 10px;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
      font-weight: 500;
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
      background-color: rgba(99, 102, 241, 0.1);
      color: #818cf8;
      border-left: 4px solid #818cf8;
    }

    .main-content {
      flex: 1;
      padding: 2rem 3rem;
      overflow-y: auto;
    }

    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2.5rem;
    }

    .topbar-title h1 { font-size: 1.8rem; font-weight: 700; }

    .topbar-title p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .topbar-actions {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .search-bar {
      background-color: var(--bg-input);
      border-radius: 20px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .search-bar input {
      background: transparent;
      border: none;
      color: var(--text-main);
      outline: none;
      width: 200px;
      font-family: 'Inter', sans-serif;
    }

    .icon-btn {
      background-color: var(--bg-input);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: var(--text-main);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-badge {
      background: rgba(99, 102, 241, 0.15);
      color: #818cf8;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .btn-logout-top {
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.25);
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s ease;
    }

    .btn-logout-top:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
    }

    .summary-cards {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .card {
      background-color: var(--bg-card);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid var(--border-color);
    }

    .stat-card .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 1.5rem;
    }

    .icon {
      width: 35px;
      height: 35px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .icon.green { background-color: rgba(16, 185, 129, 0.15); }
    .icon.gold { background-color: rgba(245, 158, 11, 0.15); }

    .stat-card h3 { font-size: 1rem; color: var(--text-main); font-weight: 600; }
    .stat-card h2 { font-size: 2rem; margin-bottom: 0.5rem; }

    .trend { font-size: 0.85rem; color: var(--text-muted); }
    .trend.positive span { color: var(--brand-green); font-weight: 600; }

    .charts-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;
    }

    .chart-large h3, .chart-small h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .placeholder-chart {
      height: 200px;
      background-color: rgba(0,0,0,0.2);
      border-radius: 8px;
      margin-top: 1rem;
      border: 1px dashed var(--border-color);
    }
  `]
})
export class AdminDashboardComponent {
  authService = inject(AuthService);
  logout() { this.authService.logout(); }
}
