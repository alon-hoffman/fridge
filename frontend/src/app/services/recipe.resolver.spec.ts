import { TestBed } from '@angular/core/testing';

import { RecipeResolver } from './recipre.resolver';

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RecipeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
