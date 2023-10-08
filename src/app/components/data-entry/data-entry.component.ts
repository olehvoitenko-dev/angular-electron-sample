import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
declare const electron: any;

@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css']
})

export class DataEntryComponent implements OnInit {
  inputText: string = '';
  savedText: string = '';
  displayed: boolean = false

  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z ]*')
  ]);

  ngOnInit(): void {
    this.loadText();
  }

  saveText() {
    electron.saveText(this.inputText);
    this.inputText = '';
    this.loadText().then(() => this.displayed = true);
  }

  async loadText() {
    this.savedText = await electron.getText();
    console.log(this.savedText)
  }
}
