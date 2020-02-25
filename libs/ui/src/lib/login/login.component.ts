import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'contacts-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  @Output() submitForm = new EventEmitter();

  constructor() {
    this.form = new FormGroup({
      familyName: new FormControl(''),
      givenName: new FormControl('')
    })
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitForm.emit(this.form.value);
  }

}
