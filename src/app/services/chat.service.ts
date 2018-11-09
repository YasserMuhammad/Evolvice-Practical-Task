import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Message } from "./message";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  
  /**
   * List of Messages type Message
   */
  messagesList = new BehaviorSubject<Message[]>([]);

  constructor(private http: HttpClient) {

    /**
     * check if there is stored messages in the localStorage from previous chat.
     */
    if(localStorage.getItem('evolvice-message-list')){
      this.messagesList.next(JSON.parse(localStorage.getItem('evolvice-message-list')))
    } 

  }

  /**
   * Check if the there is stored array or not.
   * return a Array of Messages
   */
  initMessages() : any{
    if (this.messagesList.getValue().length > 0){
        return this.messagesList.getValue();
    }
    else {
      return this.http.get<Message[]>('assets/server/messages.json').toPromise().then(res => {
        this.messagesList.next(res);
        return this.messagesList.asObservable();
      });
    }
  } 

  getMessages(pageNumber: number, searchKey?: string) : Message[]{
    var msgs;

    if(searchKey && searchKey != ''){
      msgs = this.messagesList.getValue().filter(msg => msg.messageText.includes(searchKey))
    }else{
      msgs = this.messagesList.getValue();
    }
    return msgs.slice(pageNumber*5, (pageNumber+1)*5);
   }

   /**
    * Push New Message to the Stored array in the Service
    * @param message 
    */
   sentMessage(message){
     let msgdate =  this.generateMessageTime();
     this.messagesList.getValue().push({
      id : 2,
      messageText : message.messageText,
      createdDate : msgdate,
      modifiedDate : msgdate,
      createdByUserId : message.createdByUserId,
      createdByUserName : message.createdByUserName

     })
   }

   /**
    * get the current time for new Messages 
    */
   generateMessageTime(){
     let currentDate = new Date;
     return currentDate.getHours() + ':' + currentDate.getMinutes();
   }

   /**
    * add new message to localStorage
    */
   sendMessages() {
     localStorage.setItem('evolvice-message-list', JSON.stringify(this.messagesList.getValue()))
  }

  /**
   * get the last sent message
   */
  lastMessage(){
    return this.messagesList.getValue()[this.messagesList.getValue().length -1];
  }
}
