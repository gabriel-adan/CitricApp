import { Injectable } from '@angular/core';
import { ServerConfig } from '../model/server.config';

@Injectable()
export class StoreService {

    private SERVER_CONFIG = 'server_config';
    private TOKEN_KEY = 'access_token';

    public getServerConfig(): ServerConfig {
        let config = new ServerConfig();
        try {
            const c = JSON.parse(localStorage.getItem(this.SERVER_CONFIG));
            if (c) 
                config = c;
        } catch(e) {
            return config;
        }
        return config;
    }

    public saveServerConfig(config: ServerConfig): void {
        try {
            localStorage.setItem(this.SERVER_CONFIG, JSON.stringify(config));
        } catch(e) {
            
        }
    }

    public getToken(): string {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    public setToken(token: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    public removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
    }
}