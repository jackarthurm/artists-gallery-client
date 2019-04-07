import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRootComponent } from './app-root.component';


describe('AppRootComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppRootComponent,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture: ComponentFixture<AppRootComponent> = TestBed.createComponent(AppRootComponent);
    const app: AppRootComponent = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
