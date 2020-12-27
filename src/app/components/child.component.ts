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

@Component({
  selector: 'app-child',
  templateUrl: template('child 检测策略: <b>Default</b>')
})
export class ChildComponent extends CoreTemplateComponent {

  constructor(zone: NgZone, changeDetector: ChangeDetectorRef) {
    super('child', zone, changeDetector);
  }

}
