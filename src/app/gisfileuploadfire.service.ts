import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GisfileuploadfireService {
  private data = new BehaviorSubject('');

  data$ = this.data.asObservable();
  constructor() { }

  changeData(data: any) {
    console.log(data)
    this.data.next(data)
  }
}
