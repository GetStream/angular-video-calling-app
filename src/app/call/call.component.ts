import { Component, Input } from '@angular/core';
import { CallingService } from '../calling.service';
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { ParticipantComponent } from '../participant/participant.component';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css',
})
export class CallComponent {
  @Input({ required: true }) call!: Call;

  participants: StreamVideoParticipant[] = [];

  constructor(private callingService: CallingService) {
    this.callingService
      .call()
      ?.state.participants$.subscribe((participants) => {
        console.log('participants', participants);
        participants.forEach((participant) => {
          if (
            this.participants.filter(
              (p) => p.sessionId === participant.sessionId
            ).length < 1
          ) {
            this.participants.push(participant);
          }
        });
      });
  }

  toggleMicrophone() {
    this.call.microphone.toggle();
  }

  toggleCamera() {
    this.call.camera.toggle();
  }
}
