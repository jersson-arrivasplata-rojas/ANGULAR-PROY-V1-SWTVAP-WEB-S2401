import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
   closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
  saveFile(){
    document.getElementById('FileUploadNoAuth').click()
  }
}
