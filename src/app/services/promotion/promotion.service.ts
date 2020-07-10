import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promotion } from '../../models/promotion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private apiBase = '/assets/json';
  constructor(private readonly http: HttpClient) { }

  public get(id = 1): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${this.apiBase}/promotions-${id}.json`);
  }
}
