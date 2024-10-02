import { AvailabilityPipe } from './availability-pipe.pipe';

describe('AvailabilityPipePipe', () => {
  let pipe: AvailabilityPipe;

  beforeEach(() => {
    pipe = new AvailabilityPipe();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  })
  
  it('should turn `true` into "Yes"', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });

  it('should turn `false` into "No"', () => {
    expect(pipe.transform(false)).toBe('No');
  });

  it('should return the original value when it is not boolean', () => {
    expect(pipe.transform('other')).toBe('other');
    expect(pipe.transform(123)).toBe(123);
  });
});
