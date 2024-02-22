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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2Fybm9yX0pheCIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvQ2Fybm9yX0pheCIsImlhdCI6MTcwODU5NjE3NSwiZXhwIjoxNzA5MjAwOTgwfQ.aaanw1N3BctIGtX8869uJXb8cnbTt8JXzZHFjEm5y8M';
    const user: User = { id: 'Carnor_Jax' };

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
