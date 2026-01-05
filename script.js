// PRODUCTS PAGE INTERACTIONS
// - Search filter
// - Category filter
// - Inquire opens Facebook Messenger with product name

const pageMessenger = "https://m.me/iancomputerparts";

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");

// Apply filters (search + category)
function applyFilters() {
  const searchValue = (searchInput?.value || "").toLowerCase().trim();
  const categoryValue = (categoryFilter?.value || "").trim();

  let visibleCount = 0;

  productCards.forEach((card) => {
    const name = (card.dataset.name || "").toLowerCase();
    const category = (card.dataset.category || "").toLowerCase();

    const matchSearch = !searchValue || name.includes(searchValue);
    const matchCategory = !categoryValue || category === categoryValue;

    const show = matchSearch && matchCategory;
    card.style.display = show ? "block" : "none";

    if (show) visibleCount++;
  });

  if (noResults) {
    noResults.style.display = visibleCount === 0 ? "block" : "none";
  }
}

// Attach listeners if elements exist
if (searchInput) searchInput.addEventListener("input", applyFilters);
if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);

// Inquire button → opens Messenger with product in message
document.querySelectorAll(".inquire-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const product = btn.dataset.product || "a product";
    const message = `Hi! I want to inquire about ${product}. Is it available?`;
    const url = `${pageMessenger}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  });
});

// Run once on load
applyFilters();
