const MINUMAN_ITEMS = [

//                         MINUMAN TEH 
{
    id: "d01",
    category: "minuman",
    name: "TEH",
    description: "Teh manis segar dengan es ataupun hangat",
    price: 4000,
    spiceLevel: 0,
    badge: null,
    available: true,
    image : "aset/menu/teh.png",
    emoji: "🥤",
    options: [
      {
        id: "penyajian_teh",
        label: "Pilih Penyajian",
        type: "quantity",
        required: true,
        choices: [
          { id: "es_teh", label: "Es Teh", priceAdd: 0 },
          { id: "teh_hangat", label: "Teh Hangat", priceAdd: 0 },
        ],
      },
    ],
  },

//                     MINUMAN JERUK PERAS
  {
    id: "d02",
    category: "minuman",
    name: "JERUK PERAS",
    description: "Perasan jeruk asli tanpa pemanis buatan bisa es ataupun hangat",
    price: 4000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/jeruk.png",
    emoji: "🍊",
    options: [
      {
        id: "penyajian_jeruk",
        label: "Pilih Penyajian",
        type: "quantity",
        required: true,
        choices: [
          { id: "es_jeruk", label: "Es Jeruk", priceAdd: 0 },
          { id: "jeruk_hangat", label: "Jeruk Hangat", priceAdd: 0 },
        ],
      },
    ],
  },

//                       MINUMAN ES JOSUA
  {
    id: "d03",
    category: "minuman",
    name: "ES JOSUA",
    description: "extrajoss + susu",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/josua.png",
    emoji: "🍊",
  },


//                       MINUMAN ES KUKUBIMA SUSU
  {
    id: "d04",
    category: "minuman",
    name: "ES KUKUBIMA SUSU",
    description: "kukubima + susu",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/kukubima.png",
    emoji: "🍊",
  },



//                       MINUMAN ES POP ICE
{
    id: "d05",
    category: "minuman",
    name: "ANEKA POP ICE",
    description: "Aneka pilihan rasa Pop Ice segar",
    price: 4000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/popice.png",
    emoji: "🧋",
    options: [
      {
        id: "varian_pop_ice",
        label: "Pilih Varian Rasa Pop Ice",
        type: "quantity", // Menggunakan tombol + / - di setiap rasa
        required: true,
        choices: [
          { id: "pop_ice_coklat", label: "Pop Ice Coklat", priceAdd: 0 },
          { id: "pop_ice_taro", label: "Pop Ice Taro", priceAdd: 0 },
          { id: "pop_ice_melon", label: "Pop Ice Melon", priceAdd: 0 },
          { id: "pop_ice_avocado", label: "Pop Ice Avocado", priceAdd: 0 },
          { id: "pop_ice_durian", label: "Pop Ice Durian", priceAdd: 0 },
          { id: "pop_ice_mangga", label: "Pop Ice Mangga", priceAdd: 0 },
          { id: "pop_ice_strawberry", label: "Pop Ice Strawberry", priceAdd: 0 },
          { id: "pop_ice_permen_karet", label: "Pop Ice Permen Karet", priceAdd: 0 },
        ],
      },
    ],
  },


//                       MINUMAN KOPI HITAM
  {
    id: "d06",
    category: "minuman",
    name: "KOPI HITAM",
    description: "kopi hitam panas",
    price: 4000,
    spiceLevel: 0,
    badge: "MINUMAN HANGAT",
    available: true,
    image : "aset/menu/kopi.png",
    emoji: "🍊",
  },


//                       MINUMAN ES KOPI
{
    id: "d07",
    category: "minuman",
    name: "ES KOPI",
    description: "GOOD DAY , WHITE COFFEE, TOP GULA AREN",
    price: 5000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/eskopi.png",
    emoji: "🍊",
    options: [
      {
        id: "varian_es_kopi",
        label: "Pilih Varian Kopi",
        type: "quantity",
        required: true,
        choices: [
          { id: "good_day_cappucino", label: "Good Day Cappucino", priceAdd: 0 },
          { id: "good_day_butterscoth", label: "Good Day Butterscoth", priceAdd: 0 },
          { id: "good_day_latte", label: "Good Day Latte", priceAdd: 0 },
          { id: "white_coffee", label: "White Coffee", priceAdd: 0 },
          { id: "top_gula_aren", label: "Top Gula Aren", priceAdd: 0 },
        ],
      },
    ],
  },



//                       MINUMAN ES NUTRISARI
  {
    id: "d08",
    category: "minuman",
    name: "ES NUTRISARI",
    description: "JERUK , SEMANGKA , JAMBU ,JERUK NIPIS ,ANGGUR,",
    price: 4000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/nutrisari.png",
    emoji: "🍊",
    options : [
      {
        id: "varian_es_nutrisari",
        label: "Pilih Varian Nutrisari",
        type: "quantity",
        required: true, 
        choices: [
          { id: "nutrisari_jeruk", label: "Nutrisari jeruk", priceAdd: 0 },
          { id: "nutrisari_semangka", label: "Nutrisari semangka", priceAdd: 0 },
          { id: "nutrisari_jambu", label: "Nutrisari jambu", priceAdd: 0 },
          { id: "nutrisari_jeruk_nipis", label: "Nutrisari jeruk nipis", priceAdd: 0 },
          { id: "nutrisari_anggur", label: "Nutrisari anggur", priceAdd: 0 },
        ] 
      }
    ]    
  },



//                       MINUMAN ES BENG BENG
  {
    id: "d09",
    category: "minuman",
    name: " BENG BENG COKLAT ",
    description: "Tersedia Hangat , Es , Panas ",
    price: 5000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    emoji: "🍊",
    image : "aset/menu/bengbeng.png",
    options : [
      {
        id: "varian_beng_beng",
        label: "Pilih Varian BENG BENG",
        type: "quantity",
        required: true, 
        choices: [
          { id: "beng_beng_panas", label: "BENG BENG HANGAT", priceAdd: 0 },
          { id: "beng_beng_es", label: "BENG BENG ES", priceAdd: 0 },
        { id: "beng_beng_panas", label: "BENG BENG PANAS", priceAdd: 0 },
        ] 
      }
    ]    
  },



//                       MINUMAN ES CHOCOLATOS
  {
    id: "d010",
    category: "minuman",
    name: "ES CHOCOLATOS",
    description: "COKLAT ATAU MATCHA",
    price: 5000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/choco.png",
    emoji: "🍊",
    options : [
      {
        id: "varian_es_chocolatos",
        label: "Pilih Varian Chocolatos",
        type: "quantity",
        required: true, 
        choices: [
          { id: "chocolatos_coklat", label: "Chocolatos Coklat", priceAdd: 0 },
          { id: "chocolatos_matcha", label: "Chocolatos Matcha", priceAdd: 0 },
        ] 
      }
    ]    
  },


//                       MINUMAN SUSU PUTIH
  {
    id: "d011",
    category: "minuman",
    name: "SUSU PUTIH INDOMILK ",
    description: "ES ,HANGAT , PANAS",
    price: 5000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/susu.png",
    emoji: "🍊",
  options : [
      {
        id: "varian_susu_indomilk",
        label: "Pilih ",
        type: "quantity",
        required: true, 
        choices: [
          { id: "susu_indomilk_hangat", label: "Susu Indomilk Hangat", priceAdd: 0 },
          { id: "susu_indomilk_es", label: "Susu Indomilk ES", priceAdd: 0 },
          { id: "susu_indomilk_panas", label: "Susu Indomilk Panas", priceAdd: 0 },
        ] 
      }
    ]    
  },



//                       MINUMAN AIR MINERAL
  {
    id: "d012",
    category: "minuman",
    name: "AIR MINERAL BOTOL BESAR",
    description: "AQUA ATAU LE MINERALE",
    price: 7000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/mineralbesar.png",
    emoji: "🍊",
  options : [
      {
        id: "varian_airmineral",
        label: "Pilih Varian Airmineral",
        type: "quantity",
        required: true, 
        choices: [
          { id: "aqua", label: "AQUA", priceAdd: 0 },
          { id: "le_minerale", label: "LE MINERALE", priceAdd: 0 },
        ] 
      }
    ]    
  },



//                       MINUMAN AIR MINERAL BOTOL KECIL
  {
    id: "d013",
    category: "minuman",
    name: "AIR MINERAL BOTOL KECIL",
    description: "AQUA , LE MINERALE , CLEO , PURELIFE",
    price: 4000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/mineralkecil.png",
    emoji: "🍊",
  options : [
      {
        id: "varian_airmineral",
        label: "Pilih Varian Airmineral",
        type: "quantity",
        required: true, 
        choices: [
          { id: "aqua", label: "AQUA", priceAdd: 0 },
          { id: "le_minerale", label: "LE MINERALE", priceAdd: 0 },
          { id: "cleo", label: "CLEO", priceAdd: 0 },
          { id: "purelife", label: "PURELIFE", priceAdd: 0 },
        ] 
      }
    ]    
  },
];

window.MINUMAN_ITEMS = MINUMAN_ITEMS;