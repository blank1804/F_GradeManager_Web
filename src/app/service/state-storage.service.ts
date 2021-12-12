import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { merge } from 'rxjs';

interface Saver {
    data: any,
    type: string
}
@Injectable({ providedIn: 'root'})
export class StateStorageService {

    private dateRegex = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;
    private internalKey = "reg.session";

    constructor(private $sessionStorage: SessionStorageService) {
        merge().subscribe(()=>{
            // this.clearSaveData();
        })
    }

    public storeUrl(url: string) {
        this.$sessionStorage.store('previouseUrl', url);
    }

    public getUrl() : string {
        return this.$sessionStorage.retrieve('previouseUrl');
    }

    private convertDates(object: Object) {
        if (!object || !(object instanceof Object)) {
            return;
        }
    }

    save(data: any, key: string) {
        let type: any = typeof (data);
        let dataString;
        if (type !== "object") {
            dataString = String(data);
        }
        else if (data instanceof Date) {
            dataString = data ? data.getTime() : null;
            type = "date";
        }
        else {
            dataString = JSON.stringify(data);
        }
        const saveData = {
            data: dataString,
            type: type
        }

        sessionStorage.setItem(`${this.internalKey}.${key}`, JSON.stringify(saveData));
    }

    retrive(key: string) {
        const dataStore = sessionStorage.getItem(`${this.internalKey}.${key}`);
        if (dataStore) {
            const saveData: Saver = JSON.parse(dataStore);
            switch (saveData.type) {
                case 'string':
                    return saveData.data;
                case 'number':
                    return Number(saveData.data);
                case 'boolean':
                    return saveData.data as boolean;
                case 'date':
                    return saveData.data ? new Date(saveData.data) : null;
                case 'object':
                    let obj = JSON.parse(saveData.data);
                    this.convertDates(obj);
                    return obj;
                default:
                    return null;
            }
        }
        else return null;
    }

    delete(key: string) {
        sessionStorage.removeItem(key)
    }

}
