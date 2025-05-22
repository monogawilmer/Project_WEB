import { Routes } from '@angular/router';
import { ConsultaFacturaComponent } from './Components/consulta-factura/consulta-factura.component';
import { CrearFacturaComponent } from './Components/crear-factura/crear-factura.component';

export const routes: Routes = [
    { path: 'nuevaFactura', component: CrearFacturaComponent },
    { path: 'consultaFactura', component: ConsultaFacturaComponent }
];
