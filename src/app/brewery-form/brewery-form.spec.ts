import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreweryForm } from './brewery-form';

describe('BreweryForm', () => {
  let component: BreweryForm;
  let fixture: ComponentFixture<BreweryForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreweryForm],
    }).compileComponents();

    fixture = TestBed.createComponent(BreweryForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
