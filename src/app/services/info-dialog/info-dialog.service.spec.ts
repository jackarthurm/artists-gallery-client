import { TestBed } from '@angular/core/testing';

import { InfoDialogService } from './info-dialog.service';

describe('InfoDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfoDialogService = TestBed.get(InfoDialogService);
    expect(service).toBeTruthy();
  });
});
