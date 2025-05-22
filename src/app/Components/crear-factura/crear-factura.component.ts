import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Cliente } from '../../Classes/Cliente';
import { Producto } from '../../Classes/Producto';
import { FilaProducto } from '../../Classes/FilaProducto';
import { FacturaServiceService } from '../../Services/factura-service.service';



@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './crear-factura.component.html',
  styleUrl: './crear-factura.component.css'
})

export class CrearFacturaComponent implements OnInit {

  constructor(private facturaServiceService: FacturaServiceService){

  }
  
  //Datos Formulario
  listadoClientes: Cliente[] = []; //Array para consultar todos los clientes disponibles de bd
  listadoProductos: Producto[] = []; //Array para consultar todos los productos disponibles de bd
  opcionSeleccionada:string = '';
  numFacturaForm:string = '';
  
  idProductoSeleccionado:string ='';
  listaProductosFormulario:FilaProducto[] = [];
  cantidadProducto:string = '';
  subTotal:number = 0;
  valorCalculadoImpuesto:number = 0;
  totalCalculado:number = 0;

  ngOnInit(){
    //Consulta API para traer todos los clientes de BD
    //this.listadoClientes.push(new Cliente(1,'SYC SAS','',''));
    this.facturaServiceService.consultarClientes().subscribe({
      next: (data) => {
        this.listadoClientes = data;
      },
      error: (error) => {
        console.error('Error al cargar listadoClientes:', error);
      }
    });

    //Consulta API para traer todos los productos de BD
    //this.listadoProductos.push(new Producto(1,'MOUSE LOGITECH',132.3,'../../../favicon.ico'));
    this.facturaServiceService.consultarProducto().subscribe({
      next: (data) => {
        this.listadoProductos = data;
      },
      error: (error) => {
        console.error('Error al cargar listadoClientes:', error);
      }
    });

    this.agregarNuevoProducto();
  }

  agregarNuevoProducto(){
    this.listaProductosFormulario.push(new FilaProducto(
      0,
      0,
      0,
      '',
      0
    ))
  }

  seleccionarProducto(index:number, productoId:number){
    const producto = this.listadoProductos.find(p => p.id == productoId); //Se busca en el listado de los productos consultados a bd el id del producto seleccionado
    if(producto){
      const filaFormulario = this.listaProductosFormulario[index]; //Se toma el objeto del listado del formulario para asignarle los valores del producto de bd
      filaFormulario.precioUnitario = producto.precioUnitario;
      filaFormulario.cantidad = 0;
      filaFormulario.imagen = producto.imagenProducto;
    }else{
      alert('Ocurrio un error buscando la informacion del producto seleccionado');
    }
  }

  actualizarCantidad(index:number){
    const filaFormulario = this.listaProductosFormulario[index];
    let totalPrecio:number = filaFormulario.precioUnitario * filaFormulario.cantidad;
    filaFormulario.total = totalPrecio;
    this.actualizarSubTotales();
  }

  limpiarFormulario(){
    this.idProductoSeleccionado = '';
    this.listaProductosFormulario = [];
    this.opcionSeleccionada = '';
    this.numFacturaForm = '';
  }

  actualizarSubTotales(){
    let subTotal:number = 0;
    let valorIva:number = 0;
    let totalNeto:number = 0;
    this.listaProductosFormulario.forEach((productoForm, index)=>{
      subTotal += productoForm.total;
    }) 
    valorIva = subTotal * 0.19;
    totalNeto = subTotal + valorIva;
    this.subTotal = subTotal;
    this.valorCalculadoImpuesto = valorIva;
    this.totalCalculado = totalNeto;
  }

  // validarValor(index: number) {
  //   const filaFormulario = this.listaProductosFormulario[index];
  //   filaFormulario.cantidad = Math.max(1,index)
  // }

  guardarFactura(){
    if(this.opcionSeleccionada == ""){
      alert('Debe seleccionar un cliente');
      return;
    }
    if(this.numFacturaForm == ""){
      alert('Debe ingresar el numero de factura');
      return;
    }
    if(this.listaProductosFormulario.length == 0 || (this.listaProductosFormulario.length == 1 && this.listaProductosFormulario[0].idProducto == 0)){
      alert('Debe ingresar almenos un producto a la factura');
      return;
    }
    this.listaProductosFormulario.forEach((productoForm, index)=>{
      if(productoForm.cantidad == 0){
        alert('Debe ingresar cantidades para el producto numero: ' + (index+1));
      }
    })

    let arrayDetalles:{ idProducto: number; cantidad: number; }[] = [];
    this.listaProductosFormulario.forEach((productoForm, index)=>{
      let detalleProducto = {
        "idProducto" : productoForm.idProducto,
        "cantidad" : productoForm.cantidad
      }
      arrayDetalles.push(detalleProducto);
    })

    let body = {
      "idCliente" : this.opcionSeleccionada,
      "numeroFactura" : this.numFacturaForm,
      "detalles" : arrayDetalles,
    }

    this.facturaServiceService.guardarFactura(body).subscribe({
      next: (respuesta) => {
        alert('Se ha guardado la factura');
        console.log('Factura guardada:', respuesta);
        // Aquí puedes mostrar una alerta, navegar, limpiar formulario, etc.
      },
      error: (error) => {
        alert('Ha ocurrido un error guardando la factura');
        console.error('Error al guardar la factura:', error);
        // Muestra error al usuario si es necesario
      }
    })
  }
}
