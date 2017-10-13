import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ServersService } from '../servers.service';

interface Server {
  id: number;
  name: string;
  status: string;
}

@Injectable()
export class ServerResolver implements Resolve<Server> {
  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot) : Observable<Server> | Promise<Server> | Server {
    const id = +route.params['id'];
    console.log('ServerResolver id: ' + id);
    return this.serversService.getServer(id);
  }

}
