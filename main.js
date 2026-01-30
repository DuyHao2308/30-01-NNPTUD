const productsData = [
  // --- Giữ lại 5 sản phẩm gốc của bạn ---
  { "id": 6, "title": "Classic Comfort Fit Joggers", "price": 25, "description": "Perfect blend of style and comfort with soft elastic waistband.", "images": ["https://i.imgur.com/ZKGofuB.jpeg"] },
  { "id": 14, "title": "Classic High-Waisted Athletic Shorts", "price": 43, "description": "Designed for optimal movement and versatility for workout.", "images": ["https://i.imgur.com/eGOUveI.jpeg"] },
  { "id": 15, "title": "Classic White Crew Neck T-Shirt", "price": 39, "description": "Versatile white crew neck tee made from soft cotton blend.", "images": ["https://i.imgur.com/axsyGpD.jpeg"] },
  { "id": 16, "title": "Classic White Tee - Timeless Style", "price": 73, "description": "Premium soft cotton material, perfect for daily wear.", "images": ["https://i.imgur.com/Y54Bt8J.jpeg"] },
  { "id": 17, "title": "Classic Black T-Shirt", "price": 35, "description": "Staple piece crafted from breathable cotton for all-day comfort.", "images": ["https://i.imgur.com/9DqEOV5.jpeg"] },
  
  // --- Thêm các sản phẩm mới bạn vừa cung cấp ---
  {
    "id": 18,
    "title": "Sleek White & Orange Wireless Gaming Controller",
    "price": 69,
    "description": "State-of-the-art wireless controller, featuring a crisp white base with vibrant orange accents.",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPu5qIDN_ysQ6wf0wJ6LK0DSoKB5MZZGOn0g&s"]
  },
  {
    "id": 19,
    "title": "Sleek Wireless Headphone & Inked Earbud Set",
    "price": 44,
    "description": "Sophisticated audio set featuring a pair of sleek, white wireless headphones.",
    "images": ["https://product.hstatic.net/1000281067/product/giay-bata-asia-mau-trang-do-h1_02b59a9b6a6a4f449d514b3e3540ee17.jpg"]
  },
  {
    "id": 20,
    "title": "Sleek Comfort-Fit Over-Ear Headphones",
    "price": 28,
    "description": "Superior sound quality with cushioned ear cups and an adjustable, padded headband.",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTENLTHiKSwPQ6mVNPNVY91W9W7_wNTDc2Uhg&s"]
  },
  {
    "id": 21,
    "title": "Efficient 2-Slice Toaster",
    "price": 48,
    "description": "Sleek 2-slice toaster, featuring adjustable browning controls and a removable crumb tray.",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaT04epBBdlJXYIS6gYZVqWxrjWQmxWYSFzQ&s"]
  },
  {
    "id": 22,
    "title": "Sleek Wireless Computer Mouse",
    "price": 10,
    "description": "Modern wireless mouse, featuring a glossy finish and a comfortable ergonomic design.",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPpuy8G4b4sfuOpqqAjDhJK_RvveQCKmMlKw&s"]
  },
  {
    "id": 25,
    "title": "Stylish Red & Silver Over-Ear Headphones",
    "price": 39,
    "description": "Sleek red and silver over-ear headphones designed for comfort and style.",
    "images": ["https://i.imgur.com/YaSqa06.jpeg"]
  },
  {
    "id": 26,
    "title": "Sleek Mirror Finish Phone Case",
    "price": 27,
    "description": "Ultra-sleek mirror finish phone case designed to offer style with protection.",
    "images": ["https://i.imgur.com/yb9UQKL.jpeg"]
  },
  {
    "id": 27,
    "title": "Sleek Smartwatch with Vibrant Display",
    "price": 16,
    "description": "High-tech smartwatch, featuring a vivid touch screen display and blue silicone strap.",
    "images": ["https://i.imgur.com/LGk9Jn2.jpeg"]
  },
  {
    "id": 28,
    "title": "Sleek Modern Leather Sofa",
    "price": 53,
    "description": "Minimalist aesthetic sofa with a luxurious leather finish and robust metal legs.",
    "images": ["https://i.imgur.com/Qphac99.jpeg"]
  },
  {
    "id": 29,
    "title": "Mid-Century Modern Wooden Dining Table",
    "price": 24,
    "description": "Sleek Mid-Century Modern dining table featuring an elegant walnut finish.",
    "images": ["https://i.imgur.com/DMQHGA0.jpeg"]
  }
];

let filteredProducts = [...productsData];
let currentPage = 1;
let itemsPerPage = 5;

window.onload = () => { renderTable(); };

function renderTable() {
    const body = document.getElementById('product-body');
    if (!body) return;
    body.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredProducts.slice(start, end);

    paginatedItems.forEach((prod) => {
        // Ảnh dự phòng Picsum nếu link chết
        const fallbackImg = `https://picsum.photos/seed/${prod.id}/200`;
        let displayImg = fallbackImg;
        
        if (prod.images && prod.images[0]) {
            // Làm sạch URL (xóa dấu ngoặc, nháy kép dư thừa)
            displayImg = prod.images[0].replace(/[\[\]\"]/g, "");
        }

        body.innerHTML += `
            <tr>
                <td>${prod.id}</td>
                <td>
                    <img src="${displayImg}" 
                        class="prod-img" 
                        onerror="this.onerror=null;this.src='${fallbackImg}';" 
                        alt="product">
                </td>
                <td>${prod.title}</td>
                <td><strong>${prod.price}</strong></td>
                <td>${prod.description.substring(0, 80)}...</td>
            </tr>
        `;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
    document.getElementById('pageInfo').innerText = `Trang ${currentPage} / ${totalPages}`;
}

// Giữ nguyên các hàm bổ trợ
function handleSearch() {
    const keyword = document.getElementById('searchTitle').value.toLowerCase();
    filteredProducts = productsData.filter(p => p.title.toLowerCase().includes(keyword));
    currentPage = 1;
    renderTable();
}

function handleSort() {
    const option = document.getElementById('sortOption').value;
    if (option === 'price-asc') filteredProducts.sort((a, b) => a.price - b.price);
    else if (option === 'price-desc') filteredProducts.sort((a, b) => b.price - a.price);
    else if (option === 'name-asc') filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    else if (option === 'name-desc') filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    renderTable();
}

function handlePageSizeChange() {
    itemsPerPage = parseInt(document.getElementById('pageSize').value);
    currentPage = 1;
    renderTable();
}

function changePage(step) {
    const maxPage = Math.ceil(filteredProducts.length / itemsPerPage);
    if ((currentPage + step) >= 1 && (currentPage + step) <= maxPage) {
        currentPage += step;
        renderTable();
    }
}