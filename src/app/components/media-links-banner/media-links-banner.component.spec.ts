import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaLinksBannerComponent } from './media-links-banner.component';

describe('MediaLinksBannerComponent', () => {
  let component: MediaLinksBannerComponent;
  let fixture: ComponentFixture<MediaLinksBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaLinksBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaLinksBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
