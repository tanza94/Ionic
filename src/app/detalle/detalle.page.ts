import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';




@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
    personal = [];

    constructor(public proveedor: ProviderService) { }

  ngOnInit() {
      this.proveedor.ObtenerDatos().subscribe(datos => {  this.personal = datos; });

  }

}
