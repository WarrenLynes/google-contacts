import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsService } from './contacts/contacts.service';
import { SnackbarComponent } from './snackbar/snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [ CommonModule, HttpClientModule ],
  providers: [ ContactsService ],
  entryComponents: [SnackbarComponent],
})
export class CoreDataModule {}
