import { useMemo, useState } from "react";

type Product = { id: string; name: string; category: string; price: number };

const PRODUCTS: Product[] = [
  { id: "p1", name: "Uptime Monitor", category: "Monitoring", price: 9 },
  { id: "p2", name: "SSL Watch", category: "Monitoring", price: 5 },
  { id: "p3", name: "Heartbeat Pinger", category: "Monitoring", price: 4 },
  { id: "p4", name: "API Check Pro", category: "Testing", price: 19 },
  { id: "p5", name: "Browser Runner", category: "Testing", price: 29 },
  { id: "p6", name: "Status Page", category: "Reporting", price: 12 },
  { id: "p7", name: "Incident Timeline", category: "Reporting", price: 7 },
];

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortAsc, setSortAsc] = useState(true);
  const [cart, setCart] = useState<string[]>([]);

  const rows = useMemo(() => {
    const filtered = PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
    return [...filtered].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price,
    );
  }, [query, category, sortAsc]);

  return (
    <div data-testid="products-page">
      <h1 data-testid="products-heading">Products</h1>
      <p className="lede">
        Filter, sort and add to the cart. The counter and the empty state both
        give a test something to assert.
      </p>

      <div className="row" style={{ marginBottom: "1.25rem" }}>
        <input
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="product-search"
          aria-label="Search products"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="product-category"
          aria-label="Filter by category"
        >
          <option>All</option>
          <option>Monitoring</option>
          <option>Testing</option>
          <option>Reporting</option>
        </select>
        <button
          className="secondary"
          onClick={() => setSortAsc((v) => !v)}
          data-testid="product-sort"
        >
          Price {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      <div className="banner" data-testid="cart-summary">
        Cart: <strong data-testid="cart-count">{cart.length}</strong> item
        {cart.length === 1 ? "" : "s"}
      </div>

      {rows.length === 0 ? (
        <p data-testid="products-empty">No products match that search.</p>
      ) : (
        <table data-testid="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} data-testid={`product-row-${p.id}`}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>
                  <button
                    className="secondary"
                    data-testid={`add-to-cart-${p.id}`}
                    onClick={() => setCart((c) => [...c, p.id])}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
