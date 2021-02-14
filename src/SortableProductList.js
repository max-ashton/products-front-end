import React from "react";
import ajaxSpinner from "./ajax-spinner.jpg";

const PaginatedProductList = (props) => {


    const renderProductRows = () => {
        const rows = [];
        props.products.forEach((product) => {
            rows.push(
                <ProductRow key={product.name} name={product.name} description={product.description} category={product.category.name} lastPurchased={product.lastPurchasedDate}/>)
        });
        return rows;
    };

    let tableRows = renderProductRows();
    let loading = props.showSpinner ? 'loading' : '';

    return (
        <div>
            {(props.products !== undefined && props.products.length > 0) ?
                (<div className={`product-list ${loading}`}>
                        {props.showSpinner && <Spinner/>}
                        <table>
                            <thead>
                            <tr style={{cursor:"pointer"}}>
                                <SortableTableHeader sort={props.updateSortBy} sortedBy={props.sortedBy} sortDirection={props.sortDirection} by="name">Name</SortableTableHeader>
                                <SortableTableHeader sort={props.updateSortBy} sortedBy={props.sortedBy} sortDirection={props.sortDirection} by="description">Description</SortableTableHeader>
                                <SortableTableHeader sort={props.updateSortBy} sortedBy={props.sortedBy} sortDirection={props.sortDirection} by="category">Category</SortableTableHeader>
                                <SortableTableHeader sort={props.updateSortBy} sortedBy={props.sortedBy} sortDirection={props.sortDirection} by="lastPurchasedDate">Last Purchased</SortableTableHeader>
                            </tr>
                            </thead>
                            <tbody>
                            {tableRows}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={`product-list`}>
                        <div className='no-records'>No records found for that search criteria.</div>
                        {props.showSpinner && <Spinner/>}
                    </div>
                )
            }
        </div>
    )
};
export default PaginatedProductList;

const SortableTableHeader = (props) => {
    const sortBy = () => {
        let sortBy = props.by;
        let sortDirection = "ASC";
        if(props.sortedBy === sortBy){
            sortDirection = props.sortDirection === "ASC" ?  "DESC" : "ASC" ;
        }
        props.sort(sortBy, sortDirection);
    };

    return (
        <th onClick={sortBy}>
            <span>{props.children}</span>
            {(props.by === props.sortedBy) && <span className={`sort  ${(props.sortDirection==="ASC")?"up":"down"}`}></span>}
        </th>
    )
};

const ProductRow = (props) => {

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.category}</td>
            <td>{new Date(props.lastPurchased).toDateString()}</td>
        </tr>
    );
}


const Spinner = () => {
    return (<img className='loading-spinner' src={ajaxSpinner} alt='loading data...'/>);
}

