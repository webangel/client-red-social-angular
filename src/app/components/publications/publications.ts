
import { AfterViewInit, Component, DoCheck, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import anime from 'animejs/lib/anime.es.js';
import { Publication } from 'src/app/models/publication';
import { GLOBAL } from 'src/app/services/global';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { PublicationService } from '../../services/publication.service';



@Component({
  selector: 'publications',
  templateUrl: './publications.component.html',
  providers: [UserService, PublicationService],
  styleUrls: ['./publications.css'],
})
export class PublicationsComponent implements OnInit, AfterViewInit, DoCheck  {

  @ViewChild('content', { static: false })
  private content: ElementRef | null = null;



  public title: string;
  public identity: any;
  public token: any;
  public stats: any;
  public status: string;
  public url: string;
  public message: string;
  public page;
  public itemsPerPage: any;
  public publications: Publication[];
  public currentDate: any;

  public total: any;
  public pages: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _publicationService: PublicationService,
    private renderer: Renderer2,
    private _sharedService: SharedService

  ) {
    this.title = "publications";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.message = "";
    this.status = "";
    this.page = 1;
    this.itemsPerPage;
    this.publications = [];

  }
  ngOnInit() {
    console.log('publications.component cargando...');
    this.getPublications(this.page);
  }

  ngAfterViewInit(): void {
    // Your initialization logic

  }

  ngDoCheck(){

  }

   enviarDato(id: any) {
      this._sharedService.sendMessage({ id: id });
    }


   getPublications(page: any, adding = false) {


    this._publicationService.getPublications(this.token, page).subscribe(
          data => {
            if (data.publications) {
              this.total = data.total_items;
              this.pages = data.pages;
              this.itemsPerPage = data.items_per_page;

              if (!adding) {
                this.publications = data.publications;
              } else {
                var arrayA = this.publications;
                var arrayB = data.publications;
                this.publications = arrayA.concat(arrayB);

                this.scrollToBottom();
              }

              if (page > this.pages) {
                // this._router.navigate(['/home']);
              }
              console.log("Publicaciones", data);
               this.status = 'success';
            } else {
              this.status = 'error';
            }

          },
          error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            if (errorMessage != null) {
              this.status = 'error';
            }
          }
        );

  }
  deletePublication(id: any){
    this._publicationService.deletePublication(this.token, id).subscribe({
      next: () =>{
          this.refresh();
      },
      error: err =>{
         var errorMessage = <any>err;
            console.log(errorMessage);
            if (errorMessage != null) {
              this.status = 'error';
            }
          }
    });
  }

  public noMore = false;

  viewMore() {

    this.page += 1;

    if (this.page == this.pages) {
      this.noMore = true;
    }

    this.getPublications(this.page, true);
  }

  scrollToBottom(): void {
    if (this.content) {
      // setTimeout(() => {
      //   this.content!.nativeElement.scrollTo({
      //     top: this.content!.nativeElement.scrollHeight, // Posición vertical
      //     left: 100, // Posición horizontal
      //     behavior: 'smooth'// Comportamiento de desplazamiento
      //   });
      // }, 500);

      anime({
        targets: this.content.nativeElement,
        scrollTop: this.content.nativeElement.scrollHeight,
        duration: 500,
        easing: 'easeInOutQuad',
      });
    }
  }

  @Input() valor: any;

  refresh(event: any = null){
    if(this.valor==true){
      this.getPublications(this.page);
    }
  }

}

