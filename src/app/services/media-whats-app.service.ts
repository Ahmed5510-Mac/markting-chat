import { Injectable } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser'
import * as RecordRTC from 'recordrtc'

@Injectable({
  providedIn: 'root'
})
export class MediaWhatsAppService {
  private mediaRecorder: any;
  private audioChunks: any[] = [];

  constructor() {}

  startRecording() {
    const mediaConstraints = {
      audio: true,
    };

    navigator.mediaDevices.getUserMedia(mediaConstraints).then((stream) => {
      this.mediaRecorder = new RecordRTC.MediaStreamRecorder(stream,mediaConstraints.audio);
      this.mediaRecorder.mimeType = 'audio/wav'; // Adjust mime type based on your requirements

      this.mediaRecorder.ondataavailable = (blob:any) => {
        this.audioChunks.push(blob);
      };

      this.mediaRecorder.startRecording();
    });
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop((blob: any) => {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          this.audioChunks = [];
          resolve(audioBlob);
        });
      } else {
        reject('No recording in progress.');
      }
    });
  }
}
