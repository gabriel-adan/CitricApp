import { Injectable } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File, Entry, Metadata, DirectoryEntry } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileDataDetail } from '../model/file.data.detail';

@Injectable()
export class FileService {

    constructor(private transfer: FileTransfer, private file: File, private document: DocumentViewer) {

    }

    public downloadFile(url: string, fileName: string, type: EFileTypeService): Promise<FileDataDetail> {
        return new Promise((resolve, reject) => {
            const fileTransfer = this.transfer.create();
            fileTransfer.download(url, this.file.externalCacheDirectory + fileName).then((success) => {
                this.file.moveFile(this.file.externalCacheDirectory, fileName, this.file.externalDataDirectory, fileName)
                .then((entry: Entry) => {
                    const options: DocumentViewerOptions = {
                        title: fileName
                    };
                    this.document.viewDocument(entry.nativeURL, type, options);
                    let fileDataDetail: FileDataDetail = null;
                    entry.getMetadata((meta: Metadata) => {
                        fileDataDetail = new FileDataDetail(entry.name, entry.nativeURL, meta.size, meta.modificationTime);
                    });
                    resolve(fileDataDetail);
                }).catch(error => {
                    reject('Error al abrir el archivo');
                });
            }, (error) => {
                reject('Error al descargar el archivo');
            });
        });
    }

    public getFileList(dirName: string, path: string = this.file.externalDataDirectory): Promise<FileDataDetail[]> {
        return new Promise((resolve, reject) => {
            this.file.listDir(path, dirName).then((entries: Entry[]) => {
                const files = new Array<FileDataDetail>();
                for(let file of entries) {
                    if (file.isFile) {
                        file.getMetadata((meta: Metadata) => {
                            files.push(new FileDataDetail(file.name, file.nativeURL, meta.size, meta.modificationTime));
                        });
                    }
                }
                resolve(files);
            }).catch(error => {
                // reject('Error al listar archivos');
            });
        });
    }

    public openFile(file: FileDataDetail, type: EFileTypeService) {
        const options: DocumentViewerOptions = {
            title: file.name
        };
        this.document.viewDocument(file.path, type, options);
    }

    public createDirectoryIfNotExist(dirName: string) {
        this.file.checkDir(this.file.externalDataDirectory, dirName).then((exist: boolean) => {
            if (!exist) {
                this.file.createDir(this.file.externalDataDirectory, dirName, false).then((entry: DirectoryEntry) => {
                    
                }).catch(err => {
                    alert('Ocurrió un error al crear el directorio: ' + dirName);
                });
            }
        }).catch(error => {
            this.file.createDir(this.file.externalDataDirectory, dirName, false).then((entry: DirectoryEntry) => {
                    
            }).catch(err => {
                alert('Ocurrió un error al crear el directorio: ' + dirName);
            });
        });
    }
}

export enum EFileTypeService {
    PDF = 'application/pdf'
}