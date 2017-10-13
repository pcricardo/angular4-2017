import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router'

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    //use resolver (that uses ServersService) to get data asynchronized

    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );

    // user params url and the ServersService to get data
    /*
    const id = +this.route.snapshot.params['id']; //need convert string to number
    this.server = this.serversService.getServer(id);

    this.route.params
      .subscribe(
        (params: Params) => {
          this.server = this.serversService.getServer(+params['id']);
        }
      );
    */
  }

  onEdit(){
    //absolute path
    //this.router.navigate(['/servers', this.server.id, 'edit']);
    //relative path, because we are already in 'servers/id', this is a good way to user realtive path
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'merge'});
  }
}
