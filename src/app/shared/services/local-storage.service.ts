import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';


class LocalStorage implements Storage {
  [name: string]: any;
  private data: { [key: string]: string } = {};
  get length(): number {
    return Object.keys(this.data).length;
  }
  clear(): void {
    this.data = {};
  }
  getItem(key: string): string | null {
    return this.data[key] || null;
  }
  key(index: number): string | null {
    const keys = Object.keys(this.data);
    return keys[index] || null;
  }
  removeItem(key: string): void {
    delete this.data[key];
  }
  setItem(key: string, value: string): void {
    this.data[key] = value;
  }
}


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {

  private storage: Storage;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = new LocalStorage();
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.storage = localStorage;
    }
  }

  [name: string]: any;

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    return this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return this.storage.setItem(key, value);
  }
}
