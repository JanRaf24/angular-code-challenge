import { MarkdownPipe } from './markdown.pipe';

describe('MarkdownPipe', () => {
  let pipe: MarkdownPipe;

  beforeEach(() => {
    pipe = new MarkdownPipe();
  })

  it('should create custom markdown pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return rendered HTML for valid markdown', () => {
    const result = pipe.transform('# Title');
    expect(result).toContain('Title');
    expect(result).toMatch(/<h1[^>]*>Title<\/h1>/);
  });

  it('should return empty string for null input', () => {
    const result = pipe.transform(null);
    expect(result).toBe('');
  });

  it('should return empty string for undefined input', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });

  it('should return empty string for empty string input', () => {
    const result = pipe.transform('');
    expect(result).toBe('');
  });
});
