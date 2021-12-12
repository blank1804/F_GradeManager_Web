import { OnDestroy, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
@Injectable()
export abstract class AbstractPageComponent implements OnInit, OnDestroy {

    protected subscriptions!: Map<string, Subscription>;
    @ViewChild('tableContainer') private readonly _tableContainer!: ElementRef;

    scollTable() {
        let tableWidth = 0;
        let X = 10;
        if (this._tableContainer) {
            tableWidth = (this._tableContainer.nativeElement as HTMLImageElement).clientWidth - X;
            if (tableWidth < 768) {
                // tableWidth = 768
            }
        }
        return { x: (tableWidth || 0) + 'px', y: '240px' };
    }



    ngOnInit(): void {
        this.subscriptions = new Map<string, Subscription>();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription, key: string) => subscription.unsubscribe());
    }
}
