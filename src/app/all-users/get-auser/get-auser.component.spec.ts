import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAUserComponent } from './get-auser.component';

describe('GetAUserComponent', () => {
  let component: GetAUserComponent;
  let fixture: ComponentFixture<GetAUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
