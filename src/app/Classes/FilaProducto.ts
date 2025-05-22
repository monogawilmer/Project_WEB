//Clase creada para poder manejar los productos agregados al formulario
export class FilaProducto{
    idProducto!:number;
    precioUnitario!:number;
    cantidad!:number;
    imagen!:string;
    total!:number;

    constructor(idProducto:number,precioUnitario:number,cantidad:number,imagen:string,total:number){
        this.idProducto = idProducto;
        this.precioUnitario = precioUnitario;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.total = total;
    }
}