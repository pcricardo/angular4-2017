import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  //selector: '[app-servers]',
  //selector: '.app-servers',

  templateUrl: './servers.component.html',
  //template: `
  //  <app-server></app-server>
  //  <app-server></app-server>`,

  styleUrls: ['./servers.component.css']
  //styles:[`h3{ color: red; }`]
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created.';
  serverName = 'Server ';

  constructor() {
    setTimeout(
      () => { this.allowNewServer = true; }, 2000
    );
  }

  ngOnInit() {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created. Name is \'' + this.serverName + '\'.';
  }

  onUpdataServerName(event: Event){
    //console.log(event);
    //this.serverName =  event.target.value;
    this.serverName =  (<HTMLInputElement>event.target).value;
  }

}
