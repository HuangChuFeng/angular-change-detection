// tslint:disable
import {
  Component,
  ChangeDetectorRef,
  NgZone,
  OnInit,
  DoCheck,
  OnChanges,
  AfterViewChecked,
  AfterViewInit,
  AfterContentChecked,
  AfterContentInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { CoreTemplateComponent } from '../core-template/core-template.component';
import { template } from '../core-template/core-template.component.template';

const html = `
  child-2-1: 
`

@Component({
  selector: 'app-child-2-1',
  templateUrl: template('child-2-1 检测策略: <b>Default</b>'),
})
export class Child21Component extends CoreTemplateComponent {

  constructor(zone: NgZone, changeDetector: ChangeDetectorRef) {
    super('child-2-1', zone, changeDetector);
  }

}
