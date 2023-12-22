import { Component } from '@angular/core';
import { SignUpService } from '../services/sign-up.service';
import { Candidate, CandidateDto, Message } from '../model';
import * as SockJs from 'sockjs-client';
import * as StompJs from 'stompjs';

////declare var SockJs;
//declare var StompJs;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  showSidebar: boolean = false;
  currentCandidate!: CandidateDto;
  selectedOne!: CandidateDto;
  username: any = localStorage.getItem('username');
  candidateDesignation!: string;
  candidateName!: string;
  AllChats: any = [];
  firstName: string = '';
  inputMessage: string = '';
  messageToBeSent: Message = {} as Message;
  messages: Message[] = [];
  channel: string = '';
  connectedUser: CandidateDto = {} as CandidateDto;
  token = localStorage.getItem('token');

  constructor(private signupService: SignUpService) {}

  ngOnInit() {
    this.signupService.getCurrentCandidate(this.username).subscribe((data) => {
      this.currentCandidate = data;
      this.candidateDesignation = data.designation;
      this.candidateName = data.firstName;
      this.firstName = data.firstName;

      this.signupService.getAllChats(this.currentCandidate.id).subscribe(
        (data) => {
          this.AllChats = data;
          // console.log(this.AllChats);
        },
        (error) => {
          console.error('Error fetching chats:', error);
        }
      );
    });

   
  }

  connectToSocket(user: CandidateDto) {
    
    const socket = new SockJs(`http://localhost:8080/stomp-endpoint`);
    const customHeader={
      Authorization:`Bearer ${this.token}`
    }
   
    const stompClient = StompJs.over(socket);
    this.connectedUser = user;

    

    if (this.currentCandidate.id < user.id)
      this.channel = this.currentCandidate.id + '-' + user.id;
    else this.channel = user.id + '-' + this.currentCandidate.id;

    stompClient.connect(customHeader,(frame: any) => {
      console.log('connecting status ' + frame);
      console.log(customHeader);
      stompClient.subscribe('/topic/' + this.channel, (greeting: any) => {
        console.warn('Greeting');
        this.loadChat();
      });
    });
  }

  loadChat() {
    const getMessages = this.signupService.getAllMessages(this.channel);
    getMessages.subscribe((data: Message[]) => {
      this.messages = data;
      console.log('from loadchat', this.messages);
    });
  }

  selectedCandidate(user: CandidateDto) {
    this.selectedOne = user;
    this.connectToSocket(user);
    this.loadChat();
  }

  sendMessage(): void {
    this.messageToBeSent.message = this.inputMessage;
    this.messageToBeSent.sender = this.currentCandidate;
    this.messageToBeSent.receiver = this.connectedUser;
    this.messageToBeSent.time = new Date().toString();
    this.messageToBeSent.channel = this.channel;

    this.signupService.sendMessage(this.channel, this.messageToBeSent);
    this.inputMessage = '';
  }

  sidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logOut() {
    this.signupService.logOut();
  }
}
