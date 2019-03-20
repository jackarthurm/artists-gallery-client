import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbShareLinkComponent } from './fb-share-link.component';


describe('FbShareLinkComponent', () => {
  let component: FbShareLinkComponent;
  let fixture: ComponentFixture<FbShareLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbShareLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
