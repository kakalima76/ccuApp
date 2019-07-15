import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApresentacaoComponent } from './apresentacao/apresentacao.component'

const routes: Routes = [
  {path: 'apresentacao', component: ApresentacaoComponent, data: {title: 'Lista por categoria'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
