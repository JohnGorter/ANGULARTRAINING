import { Route } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { InvitePage } from './pages/invite/invite.page';

export const routes: Route[] = [
	{ path: 'home', component: HomePage },
	{ path: 'invite', component: InvitePage },
];