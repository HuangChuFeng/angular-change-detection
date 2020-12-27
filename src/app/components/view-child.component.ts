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
  selector: 'app-view-child',
  templateUrl: template('view-child 检测策略: <b>Default</b> <app-child-1></app-child-1><app-child-2></app-child-2>')
})
export class ViewChildComponent extends CoreTemplateComponent {

  constructor(zone: NgZone, changeDetector: ChangeDetectorRef) {
    super('view-child', zone, changeDetector);
  }

}
