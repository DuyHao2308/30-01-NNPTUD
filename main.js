const API_URL = 'https://api.escuelajs.co/api/v1/products';

let allPosts = [];
let filteredPosts = [];

let postPage = 1;
let postPageSize = 10;

let titleAsc = true;
let priceAsc = true;

// ===== LOAD DATA =====
window.onload = () => {
    LoadPosts();
};

// ===== GET ALL =====
async function LoadPosts() {
    let res = await fetch(API_URL);
    allPosts = await res.json();
    filteredPosts = [...allPosts];
    postPage = 1;
    RenderPostTable();
}

// ===== RENDER TABLE =====
function convertPostToHTML(post) {
    let img = "";

    // 1️⃣ Ưu tiên images[0]
    if (Array.isArray(post.images) && post.images.length > 0) {
        img = post.images[0];
    }

    // 2️⃣ Nếu ảnh từ images bị lỗi (placeimg chết)
    if (!img || img.includes("placeimg.com")) {
        img = post.category?.image || "";
    }

    // 3️⃣ Ép https
    img = img.replace("http://", "https://");

    return `<tr>
        <td>${post.id}</td>
        <td>
            <img 
                src="${img}"
                class="product-img"
                alt="product"
                onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'"
            >
        </td>
        <td>${post.title}</td>
        <td>$${post.price}</td>
    </tr>`;
}



function RenderPostTable() {
    let body = document.getElementById("post-body");
    body.innerHTML = "";

    let start = (postPage - 1) * postPageSize;
    let end = start + postPageSize;

    let pageData = filteredPosts.slice(start, end);

    pageData.forEach(post => {
        body.innerHTML += convertPostToHTML(post);
    });

    document.getElementById("post_page_info").innerText =
        `Page ${postPage} / ${Math.ceil(filteredPosts.length / postPageSize)}`;
}

// ===== PAGINATION =====
function NextPostPage() {
    if (postPage < Math.ceil(filteredPosts.length / postPageSize)) {
        postPage++;
        RenderPostTable();
    }
}

function PrevPostPage() {
    if (postPage > 1) {
        postPage--;
        RenderPostTable();
    }
}

// ===== (D) SEARCH onChange =====
document.getElementById("post_search_txt").addEventListener("input", e => {
    let keyword = e.target.value.toLowerCase();

    filteredPosts = allPosts.filter(p =>
        p.title.toLowerCase().includes(keyword)
    );

    postPage = 1;
    RenderPostTable();
});

// ===== (E) PAGE SIZE =====
document.getElementById("post_page_size").addEventListener("change", e => {
    postPageSize = Number(e.target.value);
    postPage = 1;
    RenderPostTable();
});

// ===== (F) SORT =====
function SortPostByTitle() {
    filteredPosts.sort((a, b) =>
        titleAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    titleAsc = !titleAsc;
    RenderPostTable();
}

function SortPostByPrice() {
    filteredPosts.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
    );
    priceAsc = !priceAsc;
    RenderPostTable();
}
