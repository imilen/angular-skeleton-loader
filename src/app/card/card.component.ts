import { DOCUMENT } from '@angular/common';
import {
  Component, OnInit, Inject, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { CardService } from '../card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, AfterViewInit {

  isLoading = true;
  avatarName?: string;
  avatarStyle: Object = {};
  @Input() title?: string;
  @Input() img?: string;
  @Input() description?: string;
  @Input() logo?: string;
  @Input() index: number = 0;

  private title$?: Observable<string>;
  private img$?: Observable<string>;
  private description$?: Observable<string>;
  private logo$?: Observable<string>;
  private allData$?: Observable<[string, string, string, string]>;

  constructor(@Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef,
    private cs: CardService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {

    const avatar = this.doc.getElementById(`avatar-${this.index}`);

    if (this.title && this.img && this.description && this.logo && avatar) {

      this.title$ = this.cs.get(this.title);
      this.img$ = this.cs.get(this.img);
      this.description$ = this.cs.get(this.description);
      this.logo$ = this.cs.get(this.logo);

      this.allData$ = forkJoin([this.title$, this.img$, this.description$, this.logo$]);

      this.allData$
        .subscribe(res => {
          this.title = res[0];
          this.description = res[2];

          const img = new Image();

          img.setAttribute('mat-card-image', '');
          img.src = res[1];
          img.style.width = '100%';
          img.alt = `image ${this.index}`;

          img.addEventListener('load', (e) => {

            this.doc.getElementById(`img-${this.index}`)?.appendChild(img);

            this.avatarName = res[3].replace(/[\.\/a-zA-Z0-9]+\//i, '').replace(/\.(svg|png)/i, '');
            this.avatarStyle = {
              'border-radius': '0%',
              'background-image': `url(${res[3]})`
            };

            this.isLoading = false;
            this.cdr.detectChanges();
          });
        });

    }
  }

}
