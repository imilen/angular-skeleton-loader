import { Component, Inject } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { WindowToken } from './app.module';

interface CardData {
  title: string;
  img: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-skeleton-loader';

  list?: CardData[];
  cardWidth = 400;
  cardXsWidth = 300;

  constructor(private mediaObserver: MediaObserver,
    @Inject(WindowToken) private window: Window) { }

  ngOnInit(): void {
    this.mediaObserver.media$
      .subscribe((res) => {
        if (res.mqAlias === 'xs') {
          this.list = Array(Math.floor(this.window.innerHeight / 300) * Math.floor(this.window.innerWidth / this.cardXsWidth))
            .fill({ title: '', img: '', description: '', logo: '' } as CardData);
        }
        else {
          this.list = Array(Math.floor(this.window.innerHeight / 300) * Math.floor(this.window.innerWidth / this.cardWidth))
            .fill({ title: '', img: '', description: '', logo: '' } as CardData);
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.list = Array(8).fill({
        title: 'Angular',
        img: '../../assets/angular-wallpaper.png',
        description: 'Angular is an application design framework and development platform for creating efficient and sophisticated single-page apps.',
        logo: '../../assets/angular-logo.svg',
      } as CardData);
      this.mediaObserver.ngOnDestroy();
    }, 3 * 1000);
  }
}
