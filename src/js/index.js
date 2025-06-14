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

// const setStyleNav = (addItem, removeItem) => {
//     document.getElementById(addItem).classList.add("active");
//     document.getElementById(removeItem).classList.remove("active");
// }

// const toggleDivItems = (isCardListItem) => {
//     if (isCardListItem) {
//         document.getElementById("cardAddItems").style.display = "none";
//         document.getElementById("cardListItems").style.display = "contents";
//         setStyleNav("cardListItemsButton", "cardAddItemsButton");
//     } else {
//         document.getElementById("cardListItems").style.display = "none";
//         document.getElementById("cardAddItems").style.display = "contents";
//         setStyleNav("cardAddItemsButton", "cardListItemsButton")
//     }
//
//     prepareAdditionalItem(null, document.getElementById("formListItems"));
// }
