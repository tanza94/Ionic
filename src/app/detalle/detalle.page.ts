import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss']
})
export class DetallePage implements OnInit {
  personal: any;
  rut;
  fecha;
  valida;

  constructor(private _route: ActivatedRoute) {
    this.rut = this._route.snapshot.paramMap.get('rut');
    this.fecha = this._route.snapshot.paramMap.get('fecha');
  }

  ngOnInit() {
    this.validaRut(this.rut);// el metodo no funciona bien

    if (this.existeFecha(this.fecha)) { this.fecha = this.fecha + ' fecha ok' } else { this.fecha = this.fecha + ' fecha mala' }

  }

  itemSelected(item) { }

  validaRut(rut) {

    rut.substr(1, 2);

    this.valida = '';
    var suma = 0;
    var arrRut = rut.split("-");
    var rutSolo = arrRut[0];
    var verif = arrRut[1];
    var continuar = true;
    for (var i = 2; continuar; i++) {
      suma += (rutSolo % 10) * i;
      rutSolo = (rutSolo / 10);
      i = (i == 7) ? 1 : i;
      continuar = (rutSolo == 0) ? false : true;
    }
    var resto = suma % 11;
    var dv = 11 - resto;
    //no funciona redondear el dv, pero en caso de hacerlo funciona
    if (dv == 10) {
      if (verif.toUpperCase() == 'K')
        return true;
    }
    else if (dv == 11 && verif == 0)
      this.valida = 'rut ok';
    else if (dv == verif)
      this.valida = ' El Rut esta ok';
    else
      this.valida = 'El rut esta malo';
  }




  existeFecha(fecha) {
    if (fecha.length == 10) {
      var fechaf = fecha.split("/");
      var dayAux = fechaf[0];
      if (dayAux.charAt(0) == "0") { var day: number = dayAux.substring(1); } else { var day: number = dayAux; }

      var monthAux = fechaf[1];
      if (monthAux.charAt(0) == "0") { var month: number = monthAux.substring(1); } else { var month: number = monthAux; }

      var year = fechaf[2];

      // Lista de dias en los meses, por defecto no es año bisiesto
      var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 1 || month > 2)
        if (day > ListofDays[month - 1] || day < 0 || ListofDays[month - 1] === undefined)
          var error = true;

      // Detecta si es año bisiesto y asigna a febrero 29 dias
      if (month === 2) {
        var lyear = ((!(year % 4) && year % 100) || !(year % 400));
        if (lyear === false && day >= 29)
          error = true;
        if (lyear === true && day > 29)
          error = true;
      }

      if (error === true) {
        return false;
      }
      else

        return true;

    }
    else { return false }
  }

}
