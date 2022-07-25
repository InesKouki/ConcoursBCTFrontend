import { TestBed } from '@angular/core/testing';

import { FormulairesService } from './formulaires.service';

describe('FormulairesService', () => {
  let service: FormulairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
