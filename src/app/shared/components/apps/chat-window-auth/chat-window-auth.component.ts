import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'swtvap-chat-window-auth',
  templateUrl: './chat-window-auth.component.html',
  styleUrls: ['./chat-window-auth.component.css']
})
export class ChatWindowAuthComponent implements OnInit {

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
    document.getElementById('FileUploadAuth').click()
  }
}
