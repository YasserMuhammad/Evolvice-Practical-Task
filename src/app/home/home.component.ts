import { Component, OnInit } from '@angular/core';

import { ChatService } from "../services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * last message in the chat
   *
   */
  lastMessage: any;
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.lastMessage = this.chatService.getLastMessage();
  }

}
