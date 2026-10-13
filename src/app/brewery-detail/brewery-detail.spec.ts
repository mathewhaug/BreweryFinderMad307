import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreweryDetail } from './brewery-detail';

describe('BreweryDetail', () => {
  let component: BreweryDetail;
  let fixture: ComponentFixture<BreweryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreweryDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(BreweryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
