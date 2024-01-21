import { SafeBlobUrlPipe } from './safe-blob-url.pipe';

describe('SafeBlobUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeBlobUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
