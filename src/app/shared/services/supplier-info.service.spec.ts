import { TestBed, inject } from '@angular/core/testing';

import { SupplierInfoService } from './supplier-info.service';

describe('SupplierInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupplierInfoService]
    });
  });

  it('should be created', inject([SupplierInfoService], (service: SupplierInfoService) => {
    expect(service).toBeTruthy();
  }));
});
