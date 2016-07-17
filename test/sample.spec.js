import { get } from '../index.js';

describe('check for functions', function() {
  it('should be a function', () => {
    expect(get).toBeDefined();
  });
});
