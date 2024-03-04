import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${pages * 10 - 10}`);
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData && jsonData.products) {
      setProducts(jsonData.products);
      setTotalPages(jsonData.total/10);
    }
  };
  console.log(products);

  const selectHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages  &&
      selectedPage !== pages
    ) {
      setPages(selectedPage);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pages]);

  return (
    <div className="App">
      <h1>React Pagination</h1>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => (
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
          {[...Array(totalPages)].map((_, i) => (
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
              display: pages === totalPages ? "none" : "block",
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
