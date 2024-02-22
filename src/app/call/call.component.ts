import { Component, Input } from '@angular/core';
import { CallingService } from '../calling.service';
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { ParticipantComponent } from '../participant/participant.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css',
})
export class CallComponent {
  @Input({ required: true }) call!: Call;

  participants$: Observable<StreamVideoParticipant[]>;

  constructor(private callingService: CallingService) {
    this.participants$ = this.callingService.call()!.state.participants$;
  }

  toggleMicrophone() {
    this.call.microphone.toggle();
  }

  toggleCamera() {
    this.call.camera.toggle();
  }

  trackBySessionId(_: number, participant: StreamVideoParticipant) {
    return participant.sessionId;
  }
}
