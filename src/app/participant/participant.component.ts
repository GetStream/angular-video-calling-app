import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CallingService } from '../calling.service';
import { StreamVideoParticipant } from '@stream-io/video-client';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css',
})
export class ParticipantComponent {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('audioElement') audioElement!: ElementRef<HTMLAudioElement>;

  @Input() participant!: StreamVideoParticipant;
  unbindVideoElement: (() => void) | undefined;
  unbindAudioElement: (() => void) | undefined;

  constructor(private callingService: CallingService) {}

  ngAfterViewInit(): void {
    this.unbindVideoElement = this.callingService
      .call()
      ?.bindVideoElement(
        this.videoElement.nativeElement,
        this.participant.sessionId,
        'videoTrack'
      );

    this.unbindAudioElement = this.callingService
      .call()
      ?.bindAudioElement(
        this.audioElement.nativeElement,
        this.participant.sessionId
      );
  }

  ngOnDestroy(): void {
    this.unbindVideoElement?.();
    this.unbindAudioElement?.();
  }
}
