import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('es');

@Pipe({
  name: 'fromUnix',
  standalone: true
})
export class FromUnixPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    const timestamp = parseInt(value, 10);
    const unixTime = value.length === 13 ? timestamp / 1000 : timestamp;
    return dayjs.unix(unixTime).fromNow();
  }
}
