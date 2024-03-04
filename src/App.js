import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(3);
  const fetchedProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData && jsonData.products) {
      setProducts(jsonData.products);
    }
  };
  console.log(products);

  const selectHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== pages
    ) {
      setPages(selectedPage);
    }
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <div className="App">
      <h1>React Pagination</h1>
      {products.length > 0 && (
        <div className="products">
          {products.slice(pages * 10 - 10, pages * 10).map((product) => (
            <div className="products__single" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => setPages(pages - 1)}
            style={{ display: pages === 1 ? "none" : "block" }}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={pages === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}

          <span
            onClick={() => setPages(pages + 1)}
            style={{
              display: pages === products.length / 10 ? "none" : "block",
            }}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
