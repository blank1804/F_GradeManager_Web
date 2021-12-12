import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
@Injectable({ providedIn: 'root' })
export class PageStateService {

    _key: string;

    constructor(
        private $sessionStorage: SessionStorageService
    ) {
        this._key = "reg.session";
    }

    private getKey(key: string) {
        return this._key + '.' + key;
    }

    public clear() {
        this.$sessionStorage.clear(this.getKey('__params'));
        this.$sessionStorage.clear(this.getKey('__state'));
        this.$sessionStorage.clear(this.getKey('__pageState'));
        this.$sessionStorage.clear(this.getKey('__result'));
    }

    public clearAll() {
        this.$sessionStorage.clear();
    }

    public navigate(
        router: Router,
        route: ActivatedRoute,
        url: string,
        params: any = null,
        state: any = null
    ) {
        let pageState = {
            __params: params,
            __state: state,
            __previousUrl: router.url,
            __pageState: this.$sessionStorage.retrieve(this.getKey('__pageState'))
        };

        this.$sessionStorage.store(this.getKey('__params'), params);
        this.$sessionStorage.store(this.getKey('__state'), null);
        this.$sessionStorage.store(this.getKey('__pageState'), pageState);

        this.$sessionStorage.store(this.getKey('__result'), null);
        router.navigate([url], {});


    }

    public back(
        router: Router,
        route: ActivatedRoute,
        url: string,
        result: any = null
    ) {

        let pageState = this.$sessionStorage.retrieve(this.getKey('__pageState'));
        let previousUrl = url;
        let previousState: null = null;
        let previousPageState: null = null;
        let previousParam: null = null;

        if (pageState) {
            previousUrl = pageState.__previousUrl || url;
            previousState = pageState.__state;
            previousPageState = pageState.__pageState;
            previousParam = pageState.__params;
        }

        if (previousUrl) {
            console.log(previousUrl);
            router.navigate([previousUrl], {}).then((navigate: boolean) => {
                if (navigate) {
                    this.$sessionStorage.store(this.getKey('__params'), previousParam);

                    this.$sessionStorage.store(this.getKey('__state'), previousState);
                    this.$sessionStorage.store(this.getKey('__pageState'), previousPageState);
                    this.$sessionStorage.store(this.getKey('__result'), result);
                }
            });
        }
    }

    public getBackState(): any {
        return this.$sessionStorage.retrieve(this.getKey('__state'));
    }

    public getParams(): any {
        return this.$sessionStorage.retrieve(this.getKey('__params'));
    }

    public getResult(): any {
        return this.$sessionStorage.retrieve(this.getKey('__result'));
    }

    public backStateToForm(form: FormGroup, grid?: any) {
        let state = this.getBackState();
        if (state) {
            form.patchValue(state);
            if (grid) {
                grid.pageIndex = state.pageIndex;
                grid.pageSize = state.pageSize;
                grid.api.setSortModel(state.sorts);
                grid.isLoaded = state.isLoaded;
            }
        }
    }

    public getGridState(grid: any) {
        if (!grid) {
            return null;
        }
        return {
            ...grid.state,
            pageIndex: grid.pageIndex,
            pageSize: grid.pageSize,
            sorts: grid.api.getSortModel(),
            isLoaded: grid.isLoaded
        };
    };
}
