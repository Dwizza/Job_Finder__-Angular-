import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { NgFor, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export const location: { [key: string]: string } = {
  "austria": "at",
  "australia": "au",
  "belgium": "be",
  "brazil": "br",
  "canada": "ca",
  "switzerland": "ch",
  "germany": "de",
  "spain": "es",
  "france": "fr",
  "united kingdom": "gb",
  "india": "in",
  "italy": "it",
  "mexico": "mx",
  "netherlands": "nl",
  "new zealand": "nz",
  "poland": "pl",
  "singapore": "sg",
  "united states": "us",
  "south africa": "za"
};

@Component({
  selector: 'app-search',
  imports: [FormsModule, NgFor, TitleCasePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  keyword = '';
  location = '';

  locations = Object.entries(location).map(([key, value]) => ({ key, value }));

  @Input() resetKey = 0;
  @Output() search = new EventEmitter<{ keyword: string, location: string }>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetKey']) {
      this.keyword = '';
      this.location = '';
    }
  }
   
  onSearchClick() {
    this.search.emit({ keyword: this.keyword, location: this.location });
  }

}