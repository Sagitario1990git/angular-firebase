import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoIdx } from '../../interfaces/productoidx.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  prodDescription: ProductoIdx;
  id: String;

  constructor(private route: ActivatedRoute, private producto: ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe( parametros => {
        console.log(parametros);
        console.log(parametros['id']);

        this.producto.getProducto(parametros['id'])
        .subscribe((productoIdx: ProductoIdx) => {
            console.log(productoIdx.categoria);
            this.prodDescription = productoIdx;
            this.id = parametros['id'];
        });
    });

  }

}
