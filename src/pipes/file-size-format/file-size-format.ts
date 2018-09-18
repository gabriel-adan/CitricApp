import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileSizeFormat',
})
export class FileSizeFormatPipe implements PipeTransform {
    private sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    private SIZE = 1024;

    transform(bytes: number = 0, precision: number = 2): string {
        const i = Math.floor(Math.log(bytes) / Math.log(this.SIZE));
        const format = parseFloat((bytes / Math.pow(this.SIZE, i)).toFixed(2)) + ' ' + this.sizes[i];
        return format.toString();
    }
}
