import { EmptyTypePipe } from './empty-type.pipe';

describe('EmptyTypePipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyTypePipe();
    expect(pipe).toBeTruthy();
  });
});
