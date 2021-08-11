import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  title: string = '';
  img: string = '';
  description: string = '';
  logo: string = '';

  index: number = 0;

  constructor() { }

  get(str: string) {
    return of(str).pipe(
      delay(this.getRandomTimeout(100, 3000)),
      distinctUntilChanged(),
    )
  }

  private getRandomTimeout(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

}
