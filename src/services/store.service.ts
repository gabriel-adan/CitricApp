import { Injectable } from '@angular/core';
import { ServerConfig } from '../model/server.config';

@Injectable()
export class StoreService {

    public getServerConfig(): ServerConfig {
        let config = new ServerConfig();
        try {
            const c = JSON.parse(localStorage.getItem('server_config'));
            if (c) 
                config = c;
        } catch(e) {
            return config;
        }
        return config;
    }

    public saveServerConfig(config: ServerConfig): void {
        try {
            localStorage.setItem('server_config', JSON.stringify(config));
        } catch(e) {
            
        }
    }
}