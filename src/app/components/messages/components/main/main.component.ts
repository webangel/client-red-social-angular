import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'main',
  styleUrls: ['./main.css'],
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit{
  public title:string;
  constructor(){
    this.title = 'Menu';
  }
  ngOnInit(): void {
     console.log('main.component cargado!');
  }
}


