import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'sended',
  templateUrl: './sended.component.html'
})

export class SendedComponent implements OnInit{
  public title:string;
  constructor(){
    this.title = 'Mensajes enviados';
  }
  ngOnInit(): void {
     console.log('main.component cargado!');
  }
}


