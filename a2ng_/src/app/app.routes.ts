import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PlayersComponent } from './players/players.component';
import { ResultsComponent } from './results/results.component';
import { RoutesComponent } from './routes/routes.component';
import { StatsComponent } from './stats/stats.component';
import { TablesComponent } from './tables/tables.component';
import { TeamsComponent } from './teams/teams.component';


export const routes: Routes = [
    {path: '', component: RoutesComponent, title: 'Routes'},
    {path: 'routes', component: RoutesComponent, title: 'Routes'},
    {path: 'teams', component: TeamsComponent, title: 'Teams'},
    {path: 'players', component: PlayersComponent, title: 'Players'},
    {path: 'results', component: ResultsComponent, title: 'Results'},
    {path: 'tables', component: TablesComponent, title: 'Tables'},
    {path: 'stats', component: StatsComponent, title: 'Stats'},
    {path: 'login', component: LoginComponent, title: 'Login'},
    {path: 'admin', component: AdminComponent, title: 'Admin'},
    {path: 'logout', component: LogoutComponent, title: 'Logout'}
];
