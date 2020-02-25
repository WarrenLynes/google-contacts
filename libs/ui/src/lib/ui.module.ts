import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@contacts/material';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [LoginComponent, NotFoundComponent, ContactFormComponent],
  exports: [LoginComponent, NotFoundComponent, ContactFormComponent],
  entryComponents: [ContactFormComponent]
})
export class UiModule {}
