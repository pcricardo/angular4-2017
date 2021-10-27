import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ServerService {
	constructor(private http: Http) {}
	
	storeServers(servers: any[]) {
		const headers = new Headers({'Content-Type': 'application/json'});
		// by default Content-Type is application/json, so we do not need in this case
		return this.http.post('https://angular2-udemy-sample1.firebaseio.com/data.json', 
			servers,
			{headers: headers});
	}
}