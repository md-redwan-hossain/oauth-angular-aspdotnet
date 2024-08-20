import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recordIteration',
  standalone: true,
})
export class RecordIterationPipe implements PipeTransform {
  transform(value: Record<string, any>): Array<{ key: string; value: any }> {
    return Object.entries(value).map(([key, value]) => ({ key, value }));
  }
}
