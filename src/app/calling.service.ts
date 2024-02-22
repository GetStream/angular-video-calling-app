import { Injectable, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  callId = signal<string | undefined>(undefined);
  call = signal<Call | undefined>(undefined);

  client: StreamVideoClient;

  constructor() {
    const apiKey = 'mmhfdzb5evj2';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiSmFjZW5fU29sbyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvSmFjZW5fU29sbyIsImlhdCI6MTcwODUwNzg1NCwiZXhwIjoxNzA5MTEyNjU5fQ.85gEDjDTRtnmsS7iwrouu209nIv9CI1G0_bNRXs8dN4';
    const user: User = { id: 'Jacen_Solo' };

    this.client = new StreamVideoClient({ apiKey, token, user });
  }

  setCallId(callId: string | undefined) {
    console.log('setCallId', callId);
    if (callId) {
      this.joinCall(callId);
    } else {
      this.leaveCall();
    }
  }

  private joinCall(callId: string) {
    const call = this.client.call('default', callId);

    call.join({ create: true }).then(async () => {
      call.camera.enable();
      call.microphone.enable();
    });
    this.callId.set(callId);
    this.call.set(call);
  }

  private leaveCall() {
    this.call()?.leave();
    this.callId.set(undefined);
    this.call.set(undefined);
  }
}
