import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from "../services/chat.service";

import { Message } from "../services/message";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  /**
   * List of messages
   */
  messageList = [];

  ///// Current User Info
  currentUserID: number = 2;

  currentUserName: string = 'Yasser';

  /////

  /**
   * current Page Number
   */
  pageNumber:number = 0;

  /**
   * reference to add Message Input Field
   */
  @ViewChild('sendMessage')
  sendMessageInput: ElementRef;
  
  constructor(private chatService: ChatService) { 
   }

  ngOnInit() {
    var res = this.chatService.initMessages();
    if (res instanceof Array) {
      this.messageList = this.chatService.getMessages(this.pageNumber);
    } else {
      res.then(_ => {

        this.messageList = this.chatService.getMessages(this.pageNumber);
      });
    }
  }
  
  /**
   * return filtered Messages based on searchKey 
   * @param searchKey 
   */
  searchMessages(searchKey){
    this.messageList = this.chatService.getMessages(0,searchKey)
  }

  sentMessage(inputMessage){
    if(this.sendMessageInput.nativeElement.value != ''){
      let msgObject = {
        messageText : inputMessage,
        createdByUserId : this.currentUserID,
        createdByUserName : this.currentUserName
      }
      this.chatService.sentMessage(msgObject);
      this.sendMessageInput.nativeElement.value = '';
    }
  }


  getNewMessages(){
    this.pageNumber += 1;
    this.messageList = this.messageList.concat(this.chatService.getMessages(this.pageNumber))
  }

  ngOnDestroy(){
    this.chatService.sendMessages();
  }
}
