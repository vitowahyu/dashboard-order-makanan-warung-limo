
const MENU_ITEMS = [
  ...(window.MAKANAN_ITEMS || []),
  ...(window.CEMILAN_ITEMS || []),
  ...(window.MINUMAN_ITEMS || []),
  ...(window.MIE_ITEMS || [])
];

window.MENU_ITEMS = MENU_ITEMS;
