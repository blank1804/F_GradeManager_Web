import { Injectable } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingComponent } from './loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  componentPortal: ComponentPortal<LoadingComponent>;
  loadingMap: Map<string, {overlayRef: OverlayRef, counter: number}>;

  overlayRef: OverlayRef | undefined;
  counter: number | undefined;

  constructor(private overlay: Overlay) {
    this.componentPortal = new ComponentPortal(LoadingComponent);
    this.loadingMap = new Map<string, {overlayRef: OverlayRef, counter: number}>();
  }

  show(key?: string) {

    let name = this.getName(key!);
    let data = this.getData(name);

    data.counter++;
    if(!data.overlayRef.hasAttached()) {
      data.overlayRef.attach(this.componentPortal);
    }
    this.setData(name, data);
  }

  hide(key?: string) {
    let name = this.getName(key!);
    let data = this.getData(name);

    data.counter--;
    if(data.counter <= 0) {
      data.counter = 0;
      if(data.overlayRef.hasAttached()) {
        data.overlayRef.detach();
      }
    }
    this.setData(name, data);
  }

  private getName(key: string) : string {
    if(key == null || key == '') {
      key = '_defaults_';
    }
    return key;
  }

  private getData(key: string) : {overlayRef: OverlayRef, counter: number} {
    let data = this.loadingMap.get(key);
    if(data == null) {
      const positionStrategy = this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically();
      const overlayConfig = new OverlayConfig({
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });

      let overlayRef = this.overlay.create(overlayConfig);
      //overlayRef.backdropClick().subscribe(() => this.hide());

      data = {
        overlayRef: overlayRef,
        counter: 0
      };

      this.loadingMap.set(key, data);
    }
    return data;
  }

  private setData(key: string, data: {overlayRef: OverlayRef, counter: number}) {
    this.loadingMap.set(key, data);
  }
}
