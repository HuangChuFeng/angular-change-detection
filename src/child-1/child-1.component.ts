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

@Component({
  selector: 'app-child-1',
  templateUrl: './child-1.component.html',
  styleUrls: ['./child-1.component.css'],
})
export class Child1Component implements OnInit, DoCheck, OnChanges, AfterViewChecked, AfterViewInit, AfterContentInit, AfterContentChecked {
  @ViewChild('onChangesTag', { static: true }) onChangesTag: ElementRef;
  @ViewChild('doCheckTag', { static: true }) doCheckTag: ElementRef;
  @ViewChild('afterContentCheckedTag', { static: true }) afterContentCheckedTag: ElementRef;
  @ViewChild('afterViewCheckedTag', { static: true }) afterViewCheckedTag: ElementRef;
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  onChangeTime = null;
  docheckTime = null;
  afterContentCheckedTime = null;
  afterViewCheckedTime = null;
  touchTime = null;

  public get touch(): string {
    this.zone.runOutsideAngular(() => {
      console.log('touch---')
      this.zone.runOutsideAngular(() => {
        clearTimeout(this.touchTime);
        this.touchTime = this.blink(this.wrapper.nativeElement, 1500)
      });
    });
    return null;
  }

  constructor(private zone: NgZone, private changeDetector: ChangeDetectorRef) {
  }

  ngOnChanges() {
    console.log(1, 'ngOnChages'); 
  }

  ngOnInit() {
    console.log(2, 'ngOnInit');
  }
  ngDoCheck() {
    console.log(3, 'ngDoCheck');
    this.zone.runOutsideAngular(() => {
      clearTimeout(this.docheckTime);
      this.docheckTime = this.blink(this.doCheckTag.nativeElement)
    });
  }
  ngAfterContentInit() {
    console.log(4, 'ngAfterContentInit');
  }
  ngAfterContentChecked() {
    console.log(5, 'ngAfterContentChecked');
    this.zone.runOutsideAngular(() => {
      clearTimeout(this.afterContentCheckedTime);
      this.afterContentCheckedTime = this.blink(this.afterContentCheckedTag.nativeElement)
    });
  }
  ngAfterViewInit() : void {
    console.log(6, 'ngAfterViewInit');
  }
  ngAfterViewChecked() {
    console.log(7, 'ngAfterViewChecked');
    this.zone.runOutsideAngular(() => {
      clearTimeout(this.afterViewCheckedTime);
      this.afterViewCheckedTime = this.blink(this.afterViewCheckedTag.nativeElement)
    });
  }

  onClick() {
  }

  blink(el: HTMLElement, interval = 1000) {
    el.classList.add('active');
    return setTimeout(() => {
        el.classList.remove('active');
      }, interval)
  }
}
