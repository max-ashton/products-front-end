import ProductsPaginator from "./ProductsPaginator";
import React from "react";

const App = () => {
    return (
        <>
        <ProductsPaginator url='http://localhost:8082/products'/>
        </>
    )
}
export default App;
