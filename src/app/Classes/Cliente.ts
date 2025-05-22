export class Cliente{
    id!:number;
    razonSocial!:string;
    rfc!:string;
    TipoCliente!:string;
    
    constructor(id:number,razonSocial:string,rfc:string,TipoCliente:string){
        this.id = id
        this.razonSocial = razonSocial;
        this.rfc = rfc;
        this.TipoCliente = TipoCliente; 
    }
}