import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ProviderService } from '../provider.service';
import { CommonModule } from '@angular/common';
import { DetallePage } from '../detalle/detalle.page';
import { Router } from '@angular/router';


@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss'],
    providers: [ProviderService]
})
export class ListPage implements OnInit {
    detallePage = "DetallePage";
    personal = []
    valida: string;
    fecha: string;

    constructor(public proveedor: ProviderService, public router: Router) { }

    ngOnInit() {
        this.proveedor.ObtenerDatos().subscribe(datos => {
            this.personal = datos;
        });
    }

    consultaDetalle(usuario) {

        try {

            this.validaRut(usuario.rut);// el metodo no funciona bien

            if (this.existeFecha(usuario.fechaNacimiento)) { this.fecha = ' fecha ok' } else { this.fecha = ' fecha mala' }

            this.router.navigate(['detalle']);
        } catch ( a) {

        }
    }






    validaRut(rut) {

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
