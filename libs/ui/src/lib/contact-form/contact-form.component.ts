import { Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'contacts-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnChanges {
  form: FormGroup;

  @Output() submitForm = new EventEmitter();


  constructor(
    public dialogRef: MatDialogRef<ContactFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log(this.data);
    this.buildForm(this.data.names[0])
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.data && changes.data.currentValue.id) {
      console.log('updates', changes.data);
      this.buildForm(this.data.names[0]);
    }
  }

  buildForm(vals) {
    this.form = new FormGroup({
      familyName: new FormControl(vals.familyName),
      givenName: new FormControl(vals.givenName)
    })
  }

  onSubmit() {
    this.dialogRef.close({...this.data, names: [this.form.value]});
  }
}
