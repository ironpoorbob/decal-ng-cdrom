import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  public videoRefArray: any[] = [];

  constructor() { }

  public addVideoRef(videoPlayerRef) {
    this.videoRefArray.push(videoPlayerRef);
    console.log('video player ref: ', this.videoRefArray);
  }

  public getVideoRefs(): any[] {
    console.log('video player ref: ', this.videoRefArray);
    return this.videoRefArray;
  }

}
