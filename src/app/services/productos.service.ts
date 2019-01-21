import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];

  constructor( private http: HttpClient) { this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( (resolve, reject) => {
          this.http.get('https://angular-html-8b661.firebaseio.com/productos_idx.json')
          .subscribe(  (res: Producto[]) => {
          console.log(res);
          this.productos = res;
          this.cargando = false;
          resolve();
          /*setTimeout(() => {
            this.cargando = false;
          }, 3000); Este código sirve para realizar la acción despiues de 3 segundos*/
        });
    });
  }

  getProducto(id: String) {
      return this.http.get(`https://angular-html-8b661.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0 ) {
        this.cargarProductos().then( () => {
          if (termino.length === 0) {
              this.productosFiltrados = this.productos;
          } else {
              this.filtrarProductos( termino );
          }
      });
    } else {
          if (termino.length === 0) {
            this.productosFiltrados = this.productos;
          } else {
            this.filtrarProductos( termino );
          }
    }
  }

  private filtrarProductos(termino: string) {
    
    this.productosFiltrados = [];
    this.productos.forEach( prod => {
       if ( prod.categoria.toLowerCase().indexOf( termino.toLowerCase() ) >= 0 
       || prod.titulo.toLowerCase().indexOf( termino.toLowerCase() ) >= 0) {
          this.productosFiltrados.push( prod );
       }
    });
  }
}


