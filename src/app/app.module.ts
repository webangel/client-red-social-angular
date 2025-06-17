import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

//cargar componentes
import { FollowedComponent } from './components/followed/followed.component';
import { FollowingComponent } from './components/following/following.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicationsComponent } from './components/publications/publications';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserPublicationComponent } from './components/user_publication/user-publication';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { FromUnixPipe } from './shared/from-unix.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    UserPublicationComponent,
    SidebarComponent,
    PublicationsComponent,
    ProfileComponent,
    MenuComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FromUnixPipe
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
