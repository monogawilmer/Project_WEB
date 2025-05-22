import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../Classes/Producto';
import { Cliente } from '../Classes/Cliente';

@Injectable({
  providedIn: 'root'
})
export class FacturaServiceService {

  constructor(private http:HttpClient) { }

  consultarClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>('https://localhost:7233/api/Clientes');
  }

  consultarProducto():Observable<Producto[]>{
    return this.http.get<Producto[]>('https://localhost:7233/api/Productos');
  }

  guardarFactura(body:any):Observable<any>{
    return this.http.post('https://localhost:7233/api/Facturas',body);
  }
}
