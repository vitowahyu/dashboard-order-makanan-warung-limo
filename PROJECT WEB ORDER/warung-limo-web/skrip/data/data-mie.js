const MIE_ITEMS = [
{
    id: "i01",
    category: "mie",
    name: "POP MIE BESAR KUAH ",
    description: "ANEKA POP MIE KUAH BESAR",
    price: 9000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/popmiekuah.png",
    emoji: "🍊",
    options: [
      {
        id: "varian_mie_kuah_besar",
        label: "Pilih Varian Mie Kuah",
        type: "quantity",
        required: true,
        choices: [
          // --- KATEGORI 1: POP MIE ---
          { isHeader: true, label: "POP MIE" },
          { id: "pop_mie_soto", label: "Soto", priceAdd: 0 },
          { id: "pop_mie_ayam_bawang", label: "Ayam Bawang", priceAdd: 0 },
          { id: "pop_mie_ayam", label: " Ayam", priceAdd: 0 },
          { id: "pop_mie_torikara", label: " Torikara", priceAdd: 0 },
          { id: "pop_mie_bakso", label: " Bakso", priceAdd: 0 },
          { id: "pop_mie_kari_ayam", label: "Kari Ayam", priceAdd: 0 },
          { id: "pop_mie_ndower", label: "Pop Mie Ndower", priceAdd: 0 },
          { id: "pop_mie_bakso_granat", label: "Bakso Granat", priceAdd: 0 },

          // --- KATEGORI 2: MIE SEDAAP ---
          { isHeader: true, label: "MIE SEDAAP" },
          { id: "sedaap_soto", label: " Soto", priceAdd: 0 },
          { id: "sedaap_rawit_bakso", label: "Rawit Bingit Bakso", priceAdd: 0 },
          { id: "sedaap_rawit_ayam_jerit", label: "Rawit Bingit Ayam Jerit", priceAdd: 0 },
          { id: "sedaap_selection_kuah", label: " Selection Kuah", priceAdd: 0 },
          { id: "sedaap_kari", label: " Kari Ayam", priceAdd: 0 },
        ],
      },
    ],
  },

{
    id: "i02",
    category: "mie",
    name: "POP MIE BESAR GORENG",
    description: "ANEKA POP MIE GORENG BESAR",
    price: 9000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/popmiegoreng.png",
    emoji: "🍊",
    options: [
      {
        id: "varian_mie_goreng_besar",
        label: "Pilih Varian Mie Goreng",
        type: "quantity",
        required: true,
        choices: [
          // SUB-KATEGORI 1: POP MIE
          { isHeader: true, label: "POP MIE GORENG" },
          { id: "pop_mie_goreng", label: "Pop Mie Goreng", priceAdd: 0 },
          { id: "pop_mie_goreng_gledek", label: "Pop Mie Goreng Gledek", priceAdd: 0 },

          // SUB-KATEGORI 2: MIE SEDAAP
          { isHeader: true, label: "MIE SEDAAP GORENG" },
          { id: "sedap_goreng", label: "Mie Sedaap Goreng", priceAdd: 0 },
          { id: "sedap_selection_goreng", label: "Mie Sedaap Selection Goreng", priceAdd: 0 },
        ],
      },
    ],
  },

  {
    id: "i03",
    category: "mie",
    name: "POP MIE KECIL KUAH",
    description: "ANEKA POP MIE KUAH KECIL",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    image : "aset/menu/kuahkecil.png",
    available: true,
    options: [
      {
        id: "merk",
        label: "Pilih Merk Mie",
        required: true,
        choices: [
          { id: "popmie_soto", label: "POP MIE SOTO", priceAdd: 0 },
          { id: "popmie_bakso", label: "POP MIE BAKSO", priceAdd: 0 },
          { id: "popmie_ayam", label: "POP MIE AYAM BAWANG", priceAdd: 0 },
        ],
      },
      {
        id: "pedas",
        label: "Tingkat Kepedasan",
        required: true,
        choices: [
          { id: "1", label: "Tidak Pedas", priceAdd: 0 },
          { id: "2", label: "Pedas ", priceAdd: 0 },
        ],
      },
    ],
  },
  {
    id: "i04",
    category: "mie",
    name: "POP MIE KECIL GORENG",
    description: " POP MIE GORENG KECIL",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/gorengkecil.png",
    emoji: "🍊",
    options: [
      {
        id: "pedas",
        label: "Tingkat Kepedasan",
        required: true,
        choices: [
          { id: "1", label: "Tidak Pedas", priceAdd: 0 },
          { id: "2", label: "Pedas ", priceAdd: 0 },
        ],
      },
    ],
  },
  {
    id: "i05",
    category: "mie",
    name: "MIE GORENG PIRING",
    description: "MIE SEDAP / INDOMIE / SEDAP KOREAN SPICY",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/miegoreng1.png",
    emoji: "🍊",
    options: [
      {
        id: "merk",
        label: "Pilih Merk Mie",
        required: true,
        choices: [
          { id: "sedap", label: "Mie Sedap", priceAdd: 0 },
          { id: "indomie", label: "Indomie", priceAdd: 0 },
          { id: "sedap_korean", label: "Sedap Korean Spicy", priceAdd: 0 },
        ],
      },
      {
        id: "pedas",
        label: "Tingkat Kepedasan",
        required: true,
        choices: [
          { id: "1", label: "Tidak Pedas", priceAdd: 0 },
          { id: "2", label: "Pedas ", priceAdd: 0 },
        ],
      },
    ],
  },
  {
    id: "i06",
    category: "mie",
    name: "MIE KUAH PIRING ",
    description: "MIE SEDAP AYAM BAWANG DAN SOTO",
    price: 6000,
    spiceLevel: 0,
    badge: "bestseller",
    available: true,
    image : "aset/menu/miekuah.png",
    emoji: "🍊",
    options: [
      {
        id: "rasa",
        label: "Pilih Rasa",
        required: true,
        choices: [
          { id: "ayam_bawang", label: "Ayam Bawang", priceAdd: 0 },
          { id: "soto", label: "Soto", priceAdd: 0 },
        ],
      },
      {
        id: "pedas",
        label: "Tingkat Kepedasan",
        required: true,
        choices: [
          { id: "1", label: "Tidak Pedas", priceAdd: 0 },
          { id: "2", label: "Pedas ", priceAdd: 0 },
        ],
      },
    ],
  },
];

window.MIE_ITEMS = MIE_ITEMS;