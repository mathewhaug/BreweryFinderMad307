import { Directive } from '@angular/core';

// Static host attributes: every <a appExternalLink> opens in a new tab,
// and noopener stops the new page from reaching back through window.opener.
@Directive({
  selector: 'a[appExternalLink]',
  host: {
    'target': '_blank',
    'rel': 'noopener noreferrer',
  },
})
export class ExternalLink {}
