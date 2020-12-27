export function template(children: string): string {
    return `
    <div class="wrapper" #wrapper>
      ${children}{{ touch }}
      <div style="margin-top: 10px">Input value: 
        <span style="color: #108ee9;">{{ msg }}</span>
      </div>

      <button (click)="onClick()">click</button>
      <button #addTimeInterval>触发定时任务</button>
      <button #clearTimeInterval>clear</button>

      <p>
        手动触发变更：<br/>
        <button #detectChanges>detectChanges</button>
        <button #markForCheck>markForCheck</button><br/>
        <button #detach>detach</button>
        <button #reattach>reattach</button>
      </p>

      <div class="tag">
        <div #onChangesTag>ngOnChanges</div>
        <div #doCheckTag>ngDoCheck</div>
        <!--<div #afterContentCheckedTag>ngAfterContentChecked</div>
        <div #afterViewCheckedTag>ngAfterViewChecked</div>-->
      </div>
      <ng-content></ng-content>
    </div>
  `;
}
