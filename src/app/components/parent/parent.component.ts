import { Component, OnDestroy, OnInit, NgZone, ApplicationRef, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { fromEvent, of, Subject, } from 'rxjs';
import { takeUntil, tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, OnDestroy {
  @ViewChild('tickBtn', { static: true }) tickBtn: ElementRef;

  private _destroy$ = new Subject<void>();

  msg = false;

  test$ = of('Observable 数据').pipe(
    delay(3000),
    tap(() => {
      console.log('Observable async 触发检测');
    }))

  constructor(private applicationRef: ApplicationRef, private zone: NgZone, private http: HttpClient) { }

  ngOnInit() {
    fromEvent(window, 'resize').pipe(
      takeUntil(this._destroy$)
    )
    .subscribe(event => {
    });


    // zone.runOutsideAngular 方法，Angular不会对里面的变化进行跟踪
    this.zone.runOutsideAngular(() => {
      fromEvent(this.tickBtn.nativeElement, 'click').pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(event => {
        // 全局检测
        this.applicationRef.tick();
        console.log('ApplicationRef.tick()')
      });
    });

    // rxjs 异步触发检测
    // this.test$.subscribe(() => {})

  }

  changeMsg() {
    this.msg = !this.msg;
  }

  ngOnDestroy(): void {
    this._destroy$.complete();
  }

}
