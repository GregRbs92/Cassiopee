import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Appointment } from '../../interfaces/appointment';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {

  @Input() events: Appointment[];
  @Input() locale: string;
  @Input() showFreeTime: boolean;
  @Input() startHour: number;
  @Input() endHour: number;
  @Input() interval: number;
  @Input() freeDays: number[] = [];

  @Output() freeTimeClicked = new EventEmitter<Date[]>();

  months: string[];
  days: string[];
  date: number;
  month: number;
  year: number;

  ngOnInit() {
    moment.locale(this.locale);
    this.months = moment.months();
    this.days = moment.weekdaysShort();
    this.date = moment().tz('Europe/Paris').date();
    this.month = moment().tz('Europe/Paris').month();
    this.year = moment().tz('Europe/Paris').year();
  }

  getRangePreviousDays() {
    const previousDays = (moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris').startOf('month').day() + 6) % 7;
    const numberOfDaysLastMonth = moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris').startOf('month').subtract(1, 'h').date();
    let rangePreviousDays = [];
    for (let i = 0; i < previousDays; i++) {
      rangePreviousDays.unshift(numberOfDaysLastMonth - i);
    }
    return rangePreviousDays;
  }
  getRangeDays() {
    const numberOfDaysInMonth = moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris').endOf('month').date();
    let rangeDays = [];
    for (let i = 0; i < numberOfDaysInMonth; i++) {
      rangeDays.push(i);
    }
    return rangeDays;
  }
  getRangeNextDays() {
    const nextDays = (7 - moment({y: this.year, M: this.month, d: this.date}).tz('Europe/Paris').endOf('month').day()) % 7;
    let rangeNextDays = [];
    for (let i = 0; i < nextDays; i++) {
      rangeNextDays.push(i);
    }
    return rangeNextDays;
  }
  setDate(date: number) {
    this.date = date;
  }
  previousMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    }
    else {
      this.month--;
    }

    if (this.date === 31) {
      this.date = moment({y: this.year, M: this.month}).tz('Europe/Paris').endOf('month').date();
    }
  }
  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    }
    else {
      this.month++;
    }

    if (this.date === 31) {
      this.date = moment({y: this.year, M: this.month}).tz('Europe/Paris').endOf('month').date();
    }
  }

  getDayEvents(year, month, date): Appointment[] {
    let a = moment({y: year, M: month, d: date}).tz('Europe/Paris');
    let i = 0;
    let events: Appointment[] = [];
    while (i < this.events.length && a.isSameOrAfter(this.events[i].startDate, 'day')) {
      if (a.isBetween(this.events[i].startDate, this.events[i].endDate, 'day', '[]')) {
        events.push(this.events[i]);
      }
      i++;
    }

    return events;
  }

  isFreeDay(date: number) {
    let d = moment({y: this.year, M: this.month, d: date}).tz('Europe/Paris');
    return this.freeDays.indexOf(d.day()) !== -1;
  }

  onFreeTimeClick(dates: Date[]) {
    this.freeTimeClicked.emit(dates);
  }

}
