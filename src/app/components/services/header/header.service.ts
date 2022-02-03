import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from '../../template/header/header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private _headerData = new BehaviorSubject<HeaderData>({
    title: 'Início',
    icon: 'home',
    routeUrl: ''
  })

  constructor() { }

  get HeaderData(): HeaderData {
    return this._headerData.value;
  }
  set HeaderData(HeaderData: HeaderData){
    this._headerData.next(HeaderData);
  }
}
