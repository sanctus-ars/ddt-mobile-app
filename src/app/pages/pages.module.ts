import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from 'src/app/pages/pages-routing.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
      LoginComponent,
      NoContentComponent,
      RegistrationComponent,
  ],
  imports: [
      CoreModule,
      IonicModule,
      CommonModule,
      FormsModule,
      PagesRoutingModule,
  ]
})
export class PagesModule { }
