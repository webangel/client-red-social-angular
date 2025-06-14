import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'received',
  templateUrl: './received.component.html'
})

export class ReceivedComponent implements OnInit{
  public title:string;
  constructor(){
    this.title = 'Mensajes recividos';
  }
  ngOnInit(): void {
     console.log('main.component cargado!');
  }
}


