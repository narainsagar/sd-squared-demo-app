import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SD Squared Demo App';
  sortByAscToggle = false; // toggle for sorting.
  searchControl: FormControl = new FormControl('', []);
  timer = Observable.timer(60 * 1000, 60 * 1000); // i.e., 1 min === 60 * 1000 ms
  filteredList: any[] = null;
  list: any[] = [{
    name: 'Jon',
    joining_date: '23/10/2015',
    age: 23
  }, {
    name: 'Viki',
    joining_date: '24/01/2015',
    age: 20
  }, {
    name: 'Abc',
    joining_date: '25/10/2015',
    age: 43
  }, {
    name: 'XYZ',
    joining_date: '28/10/2015',
    age: 21
  }];

  constructor() { }

  ngOnInit() {
    // timer for auto-insert rows.
    const subscription = this.timer.subscribe((counter) => {
      this.list.push(
        Object.assign({}, this.list[counter], {
          age: this.reverseNumber(this.list[counter].age),
          joining_date: this.getNextDate(this.list[counter].joining_date)
        })
      );
      if (this.list.length === 8) { // stop timer
        return subscription.unsubscribe();
      }
    });

    // subscribe on searchbox input FormControl.
    this.searchControl
      .valueChanges
      .subscribe(value => {
        this.filterByName(value);
      });
  }

  private reverseNumber(num: number): number | string {
    return num.toString().split('').reverse().join('');
  }

  private getNextDate(joining_date: string) {
    return moment(joining_date, 'DD/MM/YYYY').add(1, 'days').format('DD/MM/YYYY');
  }

  private sortAsc(item1, item2) {
    // This is a comparison function that will result in dates being sorted in
    // ASCENDING order. As you can see, JavaScript's native comparison operators
    // can be used to compare dates.
    const date1 = moment(item1.joining_date, 'DD/MM/YYYY').format();
    const date2 = moment(item2.joining_date, 'DD/MM/YYYY').format();
    if (date1 > date2) { return 1; }
    if (date1 < date2) { return -1; }
    return 0;
  }

  private filterByName(name: string) {
    this.filteredList = this.list.filter(item => item.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

  sortByJoiningDate(event?: any) { // sorting in ascending order.
    this.sortByAscToggle = !this.sortByAscToggle;
    if (this.sortByAscToggle) { // enable sorting
      this.filteredList = [...this.list].sort(this.sortAsc);
    } else { // disable sorting
      this.filteredList = null;
    }
  }
}
