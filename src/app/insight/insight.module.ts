import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { InsightComponent } from './insight.component';
import { RouterModule, Routes } from '@angular/router';

const insightRoutes: Routes = [
  {path: '', component: InsightComponent},
  {path: 'card', component: CardComponent}
]

@NgModule({
  declarations: [
    InsightComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(insightRoutes)
  ]
})
export class InsightModule { }
