import '../components/cardGroup.js';
import '../components/cardForm.js';
import '../components/cardItem.js';
import '../components/mainForm.js';
import '../components/mainMenu.js';
import {router} from '../router/router.js'

document.addEventListener('onLoadApp', () => router.navigate('/home', {}));
const onLoadApp = new CustomEvent('onLoadApp', {
    detail: {},
    bubbles: true
});

document.dispatchEvent(onLoadApp);