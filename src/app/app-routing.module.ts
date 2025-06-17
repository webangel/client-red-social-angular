import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//cargar componentes
import { FollowedComponent } from './components/followed/followed.component';
import { FollowingComponent } from './components/following/following.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { authGuard } from './services/user.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'mis-datos', component: UserEditComponent, canActivate: [authGuard] },
  { path: 'gente', component: UsersComponent, canActivate: [authGuard] },
  { path: 'gente/:page', component: UsersComponent, canActivate: [authGuard]  },
  { path: 'perfil/:id', component: ProfileComponent, canActivate: [authGuard]  },
  { path: 'siguiendo/:id/:page', component: FollowingComponent, canActivate: [authGuard]  },
  { path: 'seguidores/:id/:page', component: FollowedComponent, canActivate: [authGuard]  },
   {
    path: 'mensajes',
    loadChildren: () => import('./components/messages/messages.module').then(m => m.MessagesModule)
  },
  { path: '**', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
