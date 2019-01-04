import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

    constructor(public http: HttpClient) { }

    ObtenerDatos() {
        return this.http.get('https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf/user');
    }
}
