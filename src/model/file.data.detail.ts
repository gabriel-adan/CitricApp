export class FileDataDetail {
    public name: string = '';
    public path: string = '';
    public size: number = 0;
    public modificationTime: Date = null;

    constructor(name: string, path: string, size: number, date: Date) {
        this.name = name;
        this.path = path;
        this.size = size;
        this.modificationTime = date;
    }
}