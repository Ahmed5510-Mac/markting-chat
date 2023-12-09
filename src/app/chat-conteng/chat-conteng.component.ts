import { Component, Input,ViewChild,ElementRef, OnInit, EventEmitter } from '@angular/core';
import {MediaWhatsAppService} from '../services/media-whats-app.service'

@Component({
  selector: 'app-chat-conteng',
  templateUrl: './chat-conteng.component.html',
  styleUrls: ['./chat-conteng.component.scss']
})
export class ChatContengComponent  implements OnInit{
  constructor( private _MediaWhatsAppService:MediaWhatsAppService){
    console.log(this.users);

   }

  ngOnInit(): void {
    // this.scrolling()

  }

  startRecording(){
    this._MediaWhatsAppService.startRecording()
  }
 stopRecording(){
    this._MediaWhatsAppService.stopRecording()
  }

  ngAfterViewInit() {
   this.scrolling();
  }
  imgavtar:string='../../assets/images/ahmed darwish.jpg'
  @Input()users:any;
  // @Output()onsubmit:EventEmitter<any> = new EventEmitter()
  @ViewChild('scrollableDiv') scrollableDiv!: ElementRef;
  emojivisable:boolean = false;
  message='';
  swithImoje(){
    this.emojivisable=!this.emojivisable
  }
  addemoji(event:any){
    this.message+=event.emoji.native
  }
   scrolling(value:number=0){
   this.scrollableDiv.nativeElement.scrollTop= this.scrollableDiv.nativeElement.scrollHeight+value;
   }
Time() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    return  `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
  }

   sendMessage(textMessage:any){
    let value=textMessage.target.value.trim()
    if(value.length>1){
      this.users.messages.push({
        id:7 ,
        body:value
        ,time:this.Time(),
        my:true
      })
      this.users.leatsMessage=value
      // textMessage.target.value='';
      this.message=''
      this.scrolling()
      textMessage.target.stylt.backgroundColor="red";
      textMessage.placeholder = 'Type Message'
    }
    else{
      textMessage.preventDefault();
      return
    }
   }
}
