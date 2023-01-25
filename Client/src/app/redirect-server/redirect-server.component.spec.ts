import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectServerComponent } from './redirect-server.component';

describe('RedirectServerComponent', () => {
  let component: RedirectServerComponent;
  let fixture: ComponentFixture<RedirectServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
