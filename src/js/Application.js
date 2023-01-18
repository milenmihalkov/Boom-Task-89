import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }
  
  constructor() {
    super();
    
    this.propertys = {
      apiUrl:'https://swapi.boom.dev/api/planets',
      progressBar: document.getElementById('progress')
    };
    this._startLoading();
    this._create();
    this.emit(Application.events.READY);
  }

   async _load(){
   

    let response = await fetch(this.propertys.apiUrl);

    if (response.status === 200) {
      
        let data = await response.json();
          //console.log(data);
          return data;

  
    }
  }
  _checkNext() {
    this._load().then((response) => { 
      if(response.next){
        //console.log(response.next);
        this.propertys.apiUrl = response.next;
         this._create();
      }
    });
  }

  _create(){
    this._load().then((response) => { 
      // console.log(response.results);
      response.results.forEach((element) => {

        let block = document.createElement("section");
        block.classList.add("planetscontainer");
    
        block.innerHTML = this._render({
          name: element.name,
          rotation_period: element.rotation_period,
          diameter: element.diameter,
        });

        this._stopLoading();
        document.body.querySelector(".content-wrapper").appendChild(block);
      });
    });
    this._checkNext();
  }
  _startLoading(){
    this.propertys.progressBar.style.display = 'block';
  }
  _stopLoading(){
    
    this.propertys.progressBar.style.display = 'none';
  }

  _render({ name, rotation_period, diameter }) {
    return `<article class="content">
    <h6>${name}</h6>
    <div> 
      <ul>
        <li>Rotation Period: <strong>${rotation_period}</strong> units</li>
        <li>Diameter: <strong>${diameter}</strong> units</li>
      </ul>
    </div>
    <article>`;
  }
}
