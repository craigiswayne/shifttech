import {Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnChanges {

  @HostBinding('class') cssClass = 'timer';

  @Input() expiry: string;
  public remaining = '00:00';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(change: SimpleChanges){
    this.remaining = '00:00';
    if (!change.hasOwnProperty('expiry')){
      return;
    }

    this.expiry = change.expiry.currentValue;

    const now = new Date();
    const nowMS = Date.parse(now.toUTCString());
    const expiryDate = new Date(this.expiry);
    const expiryMS = Date.parse(expiryDate.toUTCString());

    const remainingMS = expiryMS - nowMS;
    if (remainingMS < 0){
      return;
    }

    const seconds = remainingMS / 1000;
    const minutes = remainingMS / 1000;
  }

}
