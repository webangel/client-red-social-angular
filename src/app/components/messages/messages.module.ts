//modulos
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//rutas
import { MessagesRoutingModule } from './messages-routing.module';

//componentes
import { UserService } from 'src/app/services/user.service';
import { AddComponent } from './components/add/add.component';
import { MainComponent } from './components/main/main.component';
import { ReceivedComponent } from './components/received/received.component';
import { SendedComponent } from './components/sended/sended.component';


@NgModule({
  declarations: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MessagesRoutingModule
  ],
  exports: [
    MainComponent,
    AddComponent,
    ReceivedComponent,
    SendedComponent
  ],
  providers: [MessagesRoutingModule, UserService]
})
export class MessagesModule{}
