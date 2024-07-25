import { Routes } from '@angular/router';
import { IndexComponent } from './module/academy/index/index.component';
import { CreateComponent } from './module/academy/create/create.component';
import { EditComponent } from './module/academy/edit/edit.component';

/*
All'interno dell'Array routes è possibile impostare le rotte di navigazione dell'applicazione
e corrispondenti Component che Node.js dovrà caricare per ogni rotta

{ path: 'academy', redirectTo: 'academy/index', pathMatch: 'full'}
 Node.js comprende che, se la rotta di navigazione è http://localhost:4200/academy, deve caricare la IndexComponent
 Sarebbe il superpath dell'applicazione, la homepage

{ path: 'academy/index', component: IndexComponent } 
 Node.js comprende che, se la rotta di navigazione è http://localhost:4200/academy/index, 
 deve caricare la Component IndexComponent

{ path: 'academy/create', component: CreateComponent }
 Node.js comprende che, se la rotta di navigazione è http://localhost:4200/academy/create, 
 deve caricare la Component CreateComponent

{ path: 'academy/:code/edit', component: EditComponent } 
 Node.js comprende che, se la rotta di navigazione è http://localhost:4200/academy/edit, 
 deve caricare la Component EditComponent

 :code perché vuol dire che in quel path viene passato una path variable, che sarebbe il code dell'academy 
 su cui l'utente clicca e poi viene reindirizzato nella parte dell'edit dove saranno presenti già
 le info della variabile da modificare
*/
export const routes: Routes = [
    { path: 'academy', redirectTo: 'academy/index', pathMatch: 'full'},
    { path: 'academy/index', component: IndexComponent },
    { path: 'academy/create', component: CreateComponent },
    { path: 'academy/:code/edit', component: EditComponent } 
];
