import { TestBed } from '@angular/core/testing';

import { MystacksdataService } from './mystacksdata.service';

describe('MystacksdataService', () => {
  let service: MystacksdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MystacksdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
