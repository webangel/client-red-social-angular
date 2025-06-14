import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { authGuard } from 'src/app/services/user.guard';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';

const messagesRoutes: Routes =[
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'recibidos', pathMatch: 'full'},
      {path: 'enviar', component: AddComponent, canActivate: [authGuard] },
      {path: 'recibidos', component: ReceivedComponent, canActivate: [authGuard] },
      {path: 'enviados', component: SendedComponent, canActivate: [authGuard] },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messagesRoutes)
  ], exports: [
    RouterModule
  ]
})
export class MessagesRoutingModule{}
