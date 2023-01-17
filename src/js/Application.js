import EventEmitter from "eventemitter3";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }
  
  constructor() {
    super();

    
    this._startLoading();
    this._create();
    this.emit(Application.events.READY);
  }

   async _load(){
    const apiUrl  ='https://swapi.boom.dev/api/planets';

    let response = await fetch(apiUrl);

    if (response.status === 200) {
      
        let data = await response.json();
 
          return data;

  
    }
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
  }
  _startLoading(){
    const progressBar = document.getElementById('progress');
    progressBar.style.display = 'block';
  }
  _stopLoading(){
    const progressBar = document.getElementById('progress');
    progressBar.style.display = 'none';
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
