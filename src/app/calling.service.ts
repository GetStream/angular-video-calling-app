import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  callId = signal<string | undefined>(undefined);

  call = computed<Call | undefined>(() => {
    const currentCallId = this.callId();
    if (currentCallId !== undefined) {
      const call = this.client.call('default', currentCallId);

      call.join({ create: true }).then(async () => {
        call.camera.enable();
        call.microphone.enable();
      });
      return call;
    } else {
      return undefined;
    }
  });

  client: StreamVideoClient;

  constructor() {
    const apiKey = 'mmhfdzb5evj2';
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ2Fybm9yX0pheCIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvQ2Fybm9yX0pheCIsImlhdCI6MTcwODU5NjE3NSwiZXhwIjoxNzA5MjAwOTgwfQ.aaanw1N3BctIGtX8869uJXb8cnbTt8JXzZHFjEm5y8M';
    const user: User = { id: 'Carnor_Jax' };

    this.client = new StreamVideoClient({ apiKey, token, user });
  }

  setCallId(callId: string | undefined) {
    if (callId === undefined) {
      this.call()?.leave();
    }
    this.callId.set(callId);
  }
}
