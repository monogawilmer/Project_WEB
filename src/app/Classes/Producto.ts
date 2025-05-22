export class Producto{
    id!:number;
    nombreProducto!:string;
    precioUnitario!:number;
    imagenProducto!:string;

    constructor(id:number,nombreProducto:string,precioUnitario:number,imagenProducto:string){
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.precioUnitario = precioUnitario;
        this.imagenProducto = imagenProducto;
    }
}