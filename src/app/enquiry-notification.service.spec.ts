import { TestBed } from '@angular/core/testing';

import { EnquiryNotificationService } from './enquiry-notification.service';

describe('EnquiryNotificationService', () => {
  let service: EnquiryNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquiryNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
