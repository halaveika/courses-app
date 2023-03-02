import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesRoutingModule } from './features/features-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), FeaturesRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
