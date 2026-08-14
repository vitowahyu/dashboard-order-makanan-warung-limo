const CEMILAN_ITEMS = [
  {
    id: "c01",
    category: "cemilan",
    name: "ANEKA GORENGAN 1K AN",
    description: "Tahu isi , tempe goreng , tahu goreng , ote ote , pisang goreng , tempe gembos , tape goreng.",
    price: 1000,
    badge: "camilan rekomendasi",
    available: true,
    image : "aset/menu/gorengan.png",
    emoji: "🥟",
  options: [
      {
        id: "gorengan",
        label: "Pilih Varian Gorengan",
        type: "quantity",
        required: true,
        choices: [
          { id: "tahu_isi", label: "Tahu Isi", priceAdd: 0 },
          { id: "tempe_goreng", label: "Tempe Goreng", priceAdd: 0 },
          { id: "tahu_goreng", label: "Tahu Goreng", priceAdd: 0 },
          { id: "ote_ote", label: "Ote Ote", priceAdd: 0 },
          { id: "pisang_goreng", label: "Pisang Goreng", priceAdd: 0 },
          { id: "tempe_gembos", label: "Tempe Gembos", priceAdd: 0 },
          { id: "tape_goreng", label: "Tape Goreng", priceAdd: 0 },
        ],
      },
    ],
  },
{
    id: "c02",
    category: "cemilan",
    name: "ANEKA SNACK 3K AN",
    description: "French Fries, Gerry, Gopek, Atira, Milko, Nabati, Aoka.",
    price: 3000,
    badge: "snack favorit",
    available: true,
    image : "aset/menu/jajan.png",
    emoji: "🍿",
    options: [
      {
        id: "snack_3k",
        label: "Pilih Varian Snack",
        type: "quantity",
        required: true,
        choices: [
          { id: "french_fries", label: "French Fries", priceAdd: 0 },
          { id: "gerry", label: "Gerry", priceAdd: 0 },
          { id: "gopek", label: "Gopek", priceAdd: 0 },
          { id: "atira", label: "Atira", priceAdd: 0 },
          { id: "milko", label: "Milko", priceAdd: 0 },
          { id: "nabati", label: "Nabati", priceAdd: 0 },
          { id: "aoka", label: "Aoka", priceAdd: 0 },
        ],
      },
    ],
  },
];
window.CEMILAN_ITEMS = CEMILAN_ITEMS;