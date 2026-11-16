import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NearbyBreweries } from './nearby-breweries';

describe('NearbyBreweries', () => {
  let component: NearbyBreweries;
  let fixture: ComponentFixture<NearbyBreweries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NearbyBreweries],
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyBreweries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
