import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Promotion } from '../../models/promotion';
import { Observable } from 'rxjs';
import { PromotionService } from '../../services/promotion/promotion.service';
import {CountdownComponent, CountdownConfig, CountdownEvent} from 'ngx-countdown';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  providers: [PromotionService]
})
export class PromotionsComponent implements OnInit, AfterViewInit {

  public promotions: Observable<Promotion[]>;

  @ViewChild('cd', { static: false }) private countdown: CountdownComponent;

  constructor(private readonly promotionService: PromotionService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {

  }

  private async fetchData(): Promise<void> {
    this.promotions =  this.promotionService.get().pipe(
        map( (promos: Promotion[]) => {
          promos = promos.map( p => {
            return new Promotion(p);
          });
          return promos;
        })
    );
  }

  public getCountdownConfig(promo: Promotion){
    const now = new Date();
    const nowMS = Date.parse(now.toUTCString());
    const expiryDate = new Date(promo.expiry);
    const expiryMS = Date.parse(expiryDate.toUTCString());

    const remainingMs = expiryMS - nowMS;
    const remainingSeconds = remainingMs / 1000;

    const config: CountdownConfig = {
      leftTime: remainingSeconds < 0 ? 0 : remainingSeconds
    };

    /**
     * show just the minutes and seconds
     * if the time remaining is less than an hour
     */
    if (remainingSeconds < 3600){
      config.format = 'mm:ss';
    }

    return config;
  }

  public countdownChange(event: CountdownEvent, promo: Promotion) {

    if (event.action !== 'done') {
      return;
    }

    promo.canClaim = false;
    if (this.countdown) {
      this.countdown.stop();
    }
    return;
  }

  /**
   * Claims a promotion
   * adds 'claimed' cssClass so user can see promo has been claimed
   *
   * @param promo   promo that needs to be claimed
   * @param el      html element containing the promo
   */
  public claim(promo: Promotion, el: HTMLElement){
    // Although the button is disabled when claimed
    // just an additional check
    if (promo.claimed) {
      console.warn('Nope... Promo already claimed');
      return;
    }

    el.classList.add('claimed');
    promo.claimed = true;
  }
}
