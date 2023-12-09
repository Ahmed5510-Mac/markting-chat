import { Component } from '@angular/core';
import{MediaWhatsAppService} from '../services/media-whats-app.service'

@Component({
  selector: 'app-audio-recording',
  templateUrl: './audio-recording.component.html',
  styleUrls: ['./audio-recording.component.scss']
})
export class AudioRecordingComponent {
  constructor(private _MediaWhatsAppService:MediaWhatsAppService){}

  recording:boolean=false

  startRecording() {
    this._MediaWhatsAppService.startRecording();
    this.recording=true;
  }

  stopRecording() {
    this.recording=false;
    this._MediaWhatsAppService.stopRecording().then((audioBlob) => {
      // Use the audio blob as needed (e.g., upload to server, play, etc.)
      //console.log('Audio recording stopped.', audioBlob);
    });
  }

}
