import { Component, OnInit, OnDestroy } from '@angular/core';

import { Plugins, NetworkStatus, PluginListenerHandle } from '@capacitor/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;

  async ngOnInit() {
    const { Network } = Plugins;
    this.networkListener = Network.addListener('networkStatusChange', (status) => {
      console.log("Network status changed", status);
      this.networkStatus = status;
    });

    this.networkStatus = await Network.getStatus();
    console.log(this.networkStatus);
  }

  ngOnDestroy() {
    this.networkListener.remove();
  }
}
