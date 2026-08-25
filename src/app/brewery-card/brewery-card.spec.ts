import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreweryCard } from './brewery-card';

describe('BreweryCard', () => {
  let component: BreweryCard;
  let fixture: ComponentFixture<BreweryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreweryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BreweryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
