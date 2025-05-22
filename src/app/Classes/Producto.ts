export class Producto{
    id!:number;
    nombreProducto!:string;
    precioUnitario!:number;
    imagenBase64!:string;

    constructor(id:number,nombreProducto:string,precioUnitario:number,imagenBase64:string){
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.precioUnitario = precioUnitario;
        this.imagenBase64 = imagenBase64;
    }
}