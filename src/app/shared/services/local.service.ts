import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    public saveData(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public getData(key: string): any {
        let data = localStorage.getItem(key) || '';
        return data;
    }
    public removeData(key: string) {
        localStorage.removeItem(key);
    }

    public clearData() {
        localStorage.clear();
    }

}
