// tslint:disable
import {
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
  Input,
  OnDestroy
} from '@angular/core';

import { fromEvent, Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class CoreTemplateComponent implements 
  OnDestroy,
  OnInit,
  DoCheck,
  OnChanges,
  AfterViewChecked,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked
{
  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;
  @ViewChild('addTimeInterval', { static: true }) addTimeIntervalBtn: ElementRef;
  @ViewChild('clearTimeInterval', { static: true }) clearTimeIntervalBtn: ElementRef;

  @ViewChild('onChangesTag', { static: true }) onChangesTag: ElementRef;
  @ViewChild('doCheckTag', { static: true }) doCheckTag: ElementRef;
  @ViewChild('afterContentCheckedTag', { static: true }) afterContentCheckedTag: ElementRef;
  @ViewChild('afterViewCheckedTag', { static: true }) afterViewCheckedTag: ElementRef;

  @ViewChild('detectChanges', { static: true }) detectChangesBtn: ElementRef;
  @ViewChild('markForCheck', { static: true }) markForCheckBtn: ElementRef;;
  @ViewChild('detach', { static: true }) detachBtn: ElementRef;
  @ViewChild('reattach', { static: true }) reattachBtn: ElementRef;

  @Input() msg: boolean;

  onChangeTime = null;
  docheckTime = null;
  afterContentCheckedTime = null;
  afterViewCheckedTime = null;
  touchTime = null;

  testTimeHandler = null;

  private _destroy$ = new Subject<void>();

  public get touch(): string {
    this.zone.runOutsideAngular(() => {
      this.zone.runOutsideAngular(() => {
        clearTimeout(this.touchTime);
        this.touchTime = this.blink(this.wrapper.nativeElement, 1500)
      });
    });
    return null;
  }

  constructor(private name, private zone: NgZone, private changeDetector: ChangeDetectorRef) {
  }

  ngOnChanges() {
    // console.log(1, 'ngOnChanges'); 
    this.zone.runOutsideAngular(() => {
      clearTimeout(this.onChangeTime);
      this.onChangeTime = this.blink(this.onChangesTag.nativeElement)
    });
  }

  ngOnInit() {
    // console.log(2, 'ngOnInit');
  }
  ngDoCheck() {
    // console.log(3, 'ngDoCheck', this.name);
    this.zone.runOutsideAngular(() => {
      clearTimeout(this.docheckTime);
      this.docheckTime = this.blink(this.doCheckTag.nativeElement)
    });
  }
  ngAfterContentInit() {
    // console.log(4, 'ngAfterContentInit');
  }
  ngAfterContentChecked() {
    // console.log(5, 'ngAfterContentChecked');
    // this.zone.runOutsideAngular(() => {
    //   clearTimeout(this.afterContentCheckedTime);
    //   this.afterContentCheckedTime = this.blink(this.afterContentCheckedTag.nativeElement)
    // });
  }
  ngAfterViewInit() : void {
    // console.log(6, 'ngAfterViewInit');
    this.zone.runOutsideAngular(() => {
      // detectChanges
      fromEvent(this.detectChangesBtn.nativeElement, 'click').pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {
        console.log('ChangeDetectorRef.detectChanges()', this.name);
        this.changeDetector.detectChanges();
      });

      // markForCheck
      fromEvent(this.markForCheckBtn.nativeElement, 'click').pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {
        console.log('ChangeDetectorRef.markForCheck()', this.name);
        this.changeDetector.markForCheck();
      });

      // detach
      fromEvent(this.detachBtn.nativeElement, 'click').pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {
        console.log('ChangeDetectorRef.detach()', this.name);
        this.changeDetector.detach();
      });

      // reattach
      fromEvent(this.reattachBtn.nativeElement, 'click').pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {
        console.log('ChangeDetectorRef.reattach()', this.name);
        this.changeDetector.reattach();
      });
    });

    fromEvent(this.addTimeIntervalBtn.nativeElement, 'click').pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      this.testTimeHandler = setInterval(() => {
      }, 2000);
    });

    fromEvent(this.clearTimeIntervalBtn.nativeElement, 'click').pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(() => {
      clearTimeout(this.testTimeHandler)
    });
  }

  ngAfterViewChecked() {
    // console.log(7, 'ngAfterViewChecked', this.name);
    // this.zone.runOutsideAngular(() => {
    //   clearTimeout(this.afterViewCheckedTime);
    //   this.afterViewCheckedTime = this.blink(this.afterViewCheckedTag.nativeElement)
    // });
  }

  onClick() {
  }

  blink(el: HTMLElement, interval = 1000) {
    el.classList.add('active');
    return setTimeout(() => {
        el.classList.remove('active');
      }, interval)
  }

  public ngOnDestroy(): void {
    this._destroy$.complete();
  }
}
