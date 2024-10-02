import { AvailabilityPipe } from './availability.pipe';

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
    expect(pipe.transform(true)).toMatchSnapshot();
  });

  it('should turn `false` into "No"', () => {
    expect(pipe.transform(false)).toBe('No');
    expect(pipe.transform(false)).toMatchSnapshot();
  });

  it('should return the original value when it is not boolean', () => {
    expect(pipe.transform('other')).toBe('other');
    expect(pipe.transform(123)).toBe(123);
    expect(pipe.transform('other')).toMatchSnapshot();;
    expect(pipe.transform(123)).toMatchSnapshot();;
  });
});
