import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;

  equipo: any = [];


  constructor( private http: HttpClient) { 
    console.log('Se inicio este servicio');
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){  
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) =>{
          console.log(resp);
          console.log('y el twitter: ' + resp.twitter);
          this.cargada = true;
          this.info = resp;
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-8b661.firebaseio.com/equipo.json')
      .subscribe( (resp) =>{
          this.equipo = resp;
          console.log('el equipo es: ' + resp);
      });
  }
}
