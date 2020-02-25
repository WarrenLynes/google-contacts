import { Component, OnInit } from '@angular/core';
import { ContactsFacade } from '@contacts/core-state';
import { Observable } from 'rxjs';
import { filter, first, map, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ContactFormComponent } from '@contacts/ui';

@Component({
  selector: 'contacts-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts$: Observable<any> = this.contactsFacade.allContacts$;
  contact$: Observable<any> = this.contactsFacade.selectedContact$;

  constructor(
    private contactsFacade: ContactsFacade,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.contactsFacade.loadContacts();
    this.contact$.pipe(
      filter((x) => x.id),
      first(),
      tap((x) => this.openDialog(x))
    ).subscribe();
  }

  saveContact(contact) {

    if (contact.id) {
      this.contactsFacade.updateContact(contact);
    } else {
      this.contactsFacade.createContact(contact);
    }
    this.contactsFacade.selectContact(null);
  }

  deleteContact(contactId:any) {
    this.contactsFacade.deleteContact(contactId);
  }

  onCreateContact() {
    this.openDialog({names: [{firstName: '', givenName: ''}]});
  }

  editContact(contactId:any) {
    this.contactsFacade.selectContact(contactId);
  }

  openDialog(contact): void {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      width: '250px',
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      this.saveContact(result);
    });
  }

}
