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

  messagesOriginalSize: number ;
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


  /**
   * 
   * @param pageNumber number - Number of the next page
   * @param searchKey  string 
   * 
   * @returns sliced Array of Messages
   */
  getMessages(pageNumber: number, searchKey?: string) : Message[]{
    var msgs;

    // Set Array Size at First request
    if(pageNumber === 0){
      this.messagesOriginalSize = this.messagesList.getValue().length -1 ;
    }

    if(searchKey && searchKey != ''){
      msgs = this.messagesList.getValue().filter(msg => msg.messageText.includes(searchKey))
    }else{
      msgs = this.messagesList.getValue();
    }

    // check if getting last messages
    if((this.messagesOriginalSize - (pageNumber * 5) - 4) < 0){
      return msgs.slice(0, this.messagesOriginalSize - (pageNumber * 5) + 1);
    } else {
      return msgs.slice(this.messagesOriginalSize - (pageNumber * 5) - 4, this.messagesOriginalSize - (pageNumber * 5) + 1);
    }
   }

   /**
    * Push New Message to the Stored array in the Service
    * @param message 
    */
   sentMessage(message){
     let msgdate =  this.generateMessageTime();
     let newMessage = {
      id : 2,
      messageText : message.messageText,
      createdDate : msgdate,
      modifiedDate : msgdate,
      createdByUserId : message.createdByUserId,
      createdByUserName : message.createdByUserName
     }

     // Update Array to add message to component
     this.messagesList.getValue().push(newMessage);
     return newMessage;
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
   saveMessagesToStorage() {
     localStorage.setItem('evolvice-message-list', JSON.stringify(this.messagesList.getValue()))
  }

  /**
   * get the last sent message
   */
  getLastMessage(){
    return this.messagesList.getValue()[this.messagesList.getValue().length -1];
  }
}
