import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreweryByType } from './brewery-by-type';

describe('BreweryByType', () => {
  let component: BreweryByType;
  let fixture: ComponentFixture<BreweryByType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreweryByType],
    }).compileComponents();

    fixture = TestBed.createComponent(BreweryByType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
