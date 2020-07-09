import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  private apiBase = '/assets/json/promotions.json';
  constructor(private readonly http: HttpClient) { }

  public get(){
    this.http.get<Promotion[]>(this.apiBase);
  }
}
