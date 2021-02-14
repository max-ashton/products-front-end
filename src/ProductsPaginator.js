import React, {useEffect, useState} from "react";
import SearchTextBox from "./SearchBox";
import PaginatedProductList from "./SortableProductList";
import Pagination from "./Pagination";


const ProductsPaginator = (props) => {
    const url = props.url;
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [products, setProducts] = useState([]);
    const [currentPageSize, setCurrentPageSize] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState();
    const [recordCount, setRecordCount] = useState();
    const [sortBy, setSortBy] = useState();
    const [sortDirection, setSortDirection] = useState("ASC");

    const getProductsData = (pageNumber) => {

        let pageUrl = url + "?page=" + pageNumber + "&size=" + pageSize;
        if (filterText !== undefined) {
            pageUrl += '&productName=' + filterText;
        }
        if(sortBy){
            pageUrl += "&sortBy=" + sortBy;
        }
        if(sortDirection){
            pageUrl += "&direction=" + sortDirection;
        }
        setIsLoading(true);
        setTimeout(() => {
            fetch(pageUrl)
                .then(resp => resp.json())
                .then((json) => {
                    setProducts(json.content);
                    setCurrentPageSize(json.numberOfElements);
                    setHasNext(!json.last);
                    setHasPrevious(!json.first);
                    setRecordCount(json.totalElements);
                    setIsLoading(false);
                    setPageNumber(json.number);
                });
        }, 500);

    }

    const fetchProducts = () => {
        getProductsData( pageNumber);
    }

    useEffect(fetchProducts, []);
    useEffect(fetchProducts, [filterText, pageSize, sortBy, sortDirection]);

    const fetchPrevious = () => {
        getProductsData(pageNumber - 1);
    }

    const fetchNext = () => {
        getProductsData(pageNumber + 1);
    }

    const handleFilterTextChange = (filterText) => {setFilterText(filterText);}

    const changePageSize = (size) => {
        setPageNumber(0);
        setPageSize(size);
    };

    const setSort = (by, direction) => {
        console.log(by, direction);
        setSortBy(by);
        setSortDirection(direction);
    };

    return (
        <div className='product-list-wrapper'>
            <h2>Products</h2>

            <SearchTextBox
                placeHolder='Search products...'
                filterText={filterText}
                onFilterTextChanged={handleFilterTextChange}
            />
            <PaginatedProductList updateSortBy={setSort}
                                  sortedBy={sortBy}
                                  sortDirection={sortDirection}
                                  showSpinner={isLoading} products={products}/>
            {
                recordCount > 0 &&
                <Pagination
                    hasPrev={hasPrevious}
                    hasNext={hasNext}
                    onPrevClicked={fetchPrevious}
                    onNextClicked={fetchNext}
                    changePageSize={changePageSize}
                    currentPageSize={currentPageSize}
                    configPageSize={pageSize}
                    pageNumber={pageNumber}
                    recordCount={recordCount}/>
            }
        </div>
    );
}

export default ProductsPaginator;

