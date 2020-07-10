import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsComponent } from './promotions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PromotionService } from '../../services/promotion/promotion.service';

describe('PromotionsComponent', () => {
  let component: PromotionsComponent;
  let fixture: ComponentFixture<PromotionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionsComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ PromotionService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
