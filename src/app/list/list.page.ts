import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProviderService } from '../provider.service';



@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss'],
    providers: [ProviderService]
})
export class ListPage implements OnInit {
    personal = []
    valida: string;
    fecha: string;

    constructor(public proveedor: ProviderService) { }

    ngOnInit() {
        this.proveedor.ObtenerDatos().subscribe(datos => {
            this.personal = datos;
        });
    }

    consultaDetalle(usuario) {
        this.validaRut(usuario.rut);

        if (this.existeFecha(usuario.fechaNacimiento)){ this.fecha = 'ok'}else {this.fecha = 'mal'}
    }
    
    validaRut(rut) {
        rut = '18210645-3';

        rut.substr(1,2);

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
            this.valida = 'rut ok';
        else
            this.valida = 'rut malo';
    }




    existeFecha(fecha) {
        debugger
    var fechaf = fecha.split("/");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];

        // Verifica que dia, mes, año, solo sean numeros
    var error = ((day.isInteger) || (month.isInteger) || (year.isNumber));

    // Lista de dias en los meses, por defecto no es año bisiesto
    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 1 || month > 2)
        if (day > ListofDays[month - 1] || day < 0 || ListofDays[month - 1] === undefined)
            error = true;

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

}
