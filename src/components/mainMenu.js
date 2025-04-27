import {router} from '../router/router.js'

class MainMenu extends HTMLElement {
    constructor() {
        super();
        this.element = this.attachShadow({mode: 'open'});
    }

    setupEvents() {
        const data = this.getAttribute('data');
        this.element.querySelector('#menuHome').addEventListener('click', () => router.navigate('/home', data));
        this.element.querySelector('#menuCard').addEventListener('click', () => router.navigate('/card', data));
        this.element.querySelector('#menuChecklist').addEventListener('click', () => router.navigate('/checklist', data));
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    disconnectedCallback() {
        console.log(`${this.element} was removed from page`);
    }

    render() {
        this.element.innerHTML = ` 
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar w/ text</a>
   
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" id="menuHome" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="menuCard" href="#">Add</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="menuChecklist" href="#">Checklist</a>
        </li>
      </ul>
      <span class="navbar-text">
        Navbar text with an inline element
      </span>
    </div>
  </div>
</nav>
            
            <link rel="stylesheet" href="../css/bootstrap.min.css">`;


        // <p className="d-inline-flex gap-1">
        //     <div>
        //         <a className="btn btn-primary" data-bs-toggle="offcanvas" role="button"
        //            aria-controls="offcanvasExample">Menu</a>
        //
        //         <div className="offcanvas offcanvas-start" tabIndex="-1" id="menu"
        //              aria-labelledby="offcanvasExampleLabel">
        //             <div className="offcanvas-header">
        //                 <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
        //                 <button id="closeMenu" type="button" className="btn-close" data-bs-dismiss="offcanvas"
        //                         aria-label="Close"/>
        //             </div>
        //             <div className="offcanvas-body">
        //                 <div>
        //                     Select your form
        //                 </div>
        //                 <div id="nav" className="list-group">
        //                     <!--                <a href="#" class="list-group-item list-group-item-action active" aria-current="true">The current link item</a>-->
        //                     <a href="#" id="menuChecklist"
        //                        className="list-group-item list-group-item-action">Checklist</a>
        //                     <a href="#" id="menuCard" className="list-group-item list-group-item-action">Add item</a>
        //                 </div>
        //             </div>
        //         </div>
        //
        //     </div>
        // </p>
    }

}

customElements.define('main-menu', MainMenu);