import { TestBed } from '@angular/core/testing';

import { ClienteTiendaService } from './cliente-tienda.service';

describe('ClienteTiendaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteTiendaService = TestBed.get(ClienteTiendaService);
    expect(service).toBeTruthy();
  });
});
