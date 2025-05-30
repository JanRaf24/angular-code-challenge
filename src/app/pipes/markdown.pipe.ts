import { Pipe, PipeTransform } from '@angular/core';
import { renderMarkdown } from 'src/utils/string';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {
  transform(markdown: string | null | undefined): string {
    if(!markdown) return '';
    return renderMarkdown(markdown);
  }

}
