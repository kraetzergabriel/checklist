import {HomeScreen} from "../components/home.js";
import ChecklistForm from "../components/checklistForm.js";
import CardForm from "../components/cardForm.js";

class Router {

    constructor() {
        this.routes = [];
        this.init();
        this.lastMenu = null;
    }

    addRouter(route, handler) {
        this.routes[route] = handler;
    }

    navigate(path, data = {}) {
        if (!this.routes[path]) {
            document.dispatchEvent('reloadPage');
        }

        window.location.hash = path;
        const routeChangeEvent = new CustomEvent('onRouteChange', {
            detail: {path, data},
            bubbles: true
        })
        document.dispatchEvent(routeChangeEvent);
    }

    appendScreen(id, screen) {
        const element = document.getElementById(id);
        if (this.lastMenu && this.lastMenu !== screen) {
            element.removeChild(this.lastMenu);
        }
        element.appendChild(screen);

        this.lastMenu = screen;
    }

    init() {
        document.addEventListener('onRouteChange', (event) => {
            const {path, data} = event.detail;
            this.routes[path](data);
        });

        window.addEventListener('hashchange', () => {
            const path = window.location.hash.replace('#', '/') || '/';
            if (this.routes[path]) {
                this.routes[path]();
            }
        });

        const initialPath = window.location.hash.replace('#', '/') || '/';
        if (this.routes[initialPath]) {
            this.routes[initialPath](); // Call the handler for the initial route
        }
    }

}

export const router = new Router();
router.addRouter('/home', () => {
    router.appendScreen('app', new HomeScreen());
})

router.addRouter('/checklist', () => {
    router.appendScreen('app', new ChecklistForm());
})

router.addRouter('/card', () => {
    router.appendScreen('app', new CardForm());
})