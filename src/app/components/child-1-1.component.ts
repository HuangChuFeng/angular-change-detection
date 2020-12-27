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
  selector: 'app-child-1-1',
  templateUrl: template('child-1-1 检测策略: <b>OnPush</b>'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Child11Component extends CoreTemplateComponent {

  constructor(zone: NgZone, changeDetector: ChangeDetectorRef) {
    super('child-1-1', zone, changeDetector);
  }

}
