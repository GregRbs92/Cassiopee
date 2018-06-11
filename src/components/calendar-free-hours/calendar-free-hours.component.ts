import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment-timezone';
import { Appointment } from '../../interfaces/appointment';

@Component({
  selector: 'calendar-free-hours',
  templateUrl: 'calendar-free-hours.component.html'
})
export class CalendarFreeHoursComponent implements OnChanges {

  @Input() date: number;
  @Input() month: number;
  @Input() year: number;
  @Input() events: Appointment[];
  @Input() startHour: number;
  @Input() endHour: number;
  @Input() interval: number;
  @Input() freeDays: number[] = [];

  @Output() freeTimeClicked = new EventEmitter<Date[]>();

  dayEvents: Appointment[] = [];
  rangeHours: Date[] = [];
  mom: any = moment;

  constructor() {
  }

  ngOnChanges() {
    this.dayEvents = [];
    let a = moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris');
    let i = 0;
    while (i < this.events.length && a.isSameOrAfter(this.events[i].startDate, 'day')) {
      if (a.isBetween(this.events[i].startDate, this.events[i].endDate, 'day', '[]')) {
        this.dayEvents.push(this.events[i]);
      }
      i++;
    }
  }

  getFreeHours() {
    let d = moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris');
    if (this.freeDays.indexOf(d.day()) > -1) return [];

    let numberOfIntervals = Math.floor((this.endHour - this.startHour) * (60 / this.interval));
    let result = [];
    for (let i = 0; i < numberOfIntervals; i++) {
      let startInterval = moment({y: this.year, M: this.month, d: this.date, h: this.startHour}).tz('Europe/Paris').add(this.interval*i, 'm').toDate();
      let endInterval = moment({y: this.year, M: this.month, d: this.date, h: this.startHour}).tz('Europe/Paris').add(this.interval*(i+1), 'm').toDate();
      result.push([startInterval, endInterval]);
      for (const e of this.dayEvents) {
        if (!moment(e.endDate).tz('Europe/Paris').isSameOrBefore(startInterval) && !moment(e.startDate).tz('Europe/Paris').isSameOrAfter(endInterval)) {
          result.pop();
          break;
        }
      }
    }
    return result;
  }

  onClick(event, start: Date, end: Date) {
    this.freeTimeClicked.emit([start, end]);
  }

}
