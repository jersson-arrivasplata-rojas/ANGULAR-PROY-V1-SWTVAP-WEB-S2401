import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeBlobUrl'
})
export class SafeBlobUrlPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}

  transform(blob: Blob): string {
    return this.domSanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(blob)
      )
    );
  }
}
