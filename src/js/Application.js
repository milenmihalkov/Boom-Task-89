import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();

    const _loading = document.getElementById('progress');
    let apiUrl  ='https://swapi.boom.dev/api/planets?page=2';
    this._load();

    this.emit(Application.events.READY);
  }

   async _load(){
    let response = await fetch(this.apiUrl);

    console.log(response.status); // 200
    console.log(response.statusText); // OK

    if (response.status === 200) {
        let data = await response.json();
        console.log(data);
    }
  }

  _create(){}
  _startLoading(){}
  _stopLoading(){}

  
}
