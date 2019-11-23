import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss'],
})

export class AddDocumentComponent  {
  constructor() {
  }

  public documentForm = new FormGroup({
    documentName: new FormControl('', [Validators.required]),
  });

  public onSave(){

  }
}
