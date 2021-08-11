import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

  @Input() width?: { value?: number, sufix?: string } | string;
  @Input() height?: { value?: number, sufix?: string } | string;
  @Input() circle = false;

  @Input() aditional?: object = {};

  private styles = {};

  constructor() { }

  buildStyles() {

    this.buildWeight(this.width);
    this.buildHeight(this.height);

    if (this.circle) {
      this.styles = Object.assign({ 'border-radius': '50%' }, this.styles)
    }

    if (this.aditional) {
      this.styles = Object.assign(this.aditional, this.styles)
    }

    return this.styles;
  }

  private buildWeight(width?: { value?: number, sufix?: string } | string) {
    if (typeof width === "object" && width?.sufix === 'px') {
      this.styles = Object.assign({ 'width.px': width.value ? width.value : '' }, this.styles)
    }
    else if (typeof width === "object" && width?.sufix === '%') {
      this.styles = Object.assign({ 'width.%': width?.value ? width.value : '' }, this.styles)
    }
    else {
      this.styles = Object.assign({ 'width': width ? width : '' }, this.styles)
    }
  }

  private buildHeight(height?: { value?: number, sufix?: string } | string) {
    if (typeof height === "object" && height?.sufix === 'px') {
      this.styles = Object.assign({ 'height.px': height.value ? height.value : '' }, this.styles)
    }
    else if (typeof height === "object" && height?.sufix === '%') {
      this.styles = Object.assign({ 'height.%': height?.value ? height.value : '' }, this.styles)
    }
    else {
      this.styles = Object.assign({ 'height': height ? height : '' }, this.styles)
    }
  }


}
