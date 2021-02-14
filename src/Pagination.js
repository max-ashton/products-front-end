import React from "react";

const Pagination = (props) => {

    const handlePagePreviousClick = () => {
        props.onPrevClicked();
    }

    function handlePageNextClick() {
        props.onNextClicked();
    }
    function handleChangePageSize(e){
        props.changePageSize(e.target.value);
    }

    const pageStart = (props.pageNumber) * props.configPageSize;
    return (
        <div>

        <div className="set-page-size">
            <label htmlFor="set-page-size">Page Size:</label>
            <select onChange={handleChangePageSize} defaultValue={props.configPageSize} id="set-page-size">
                {[5,10,20].map((pageSize,idx) =>
                    <option key={idx} value={pageSize}>{pageSize}</option>
                )}
            </select>
        </div>
        <div className='pagination'>
            <span className='record-count'>{pageStart + 1} - {pageStart + props.currentPageSize} of {props.recordCount}</span>
            {(props.recordCount > props.configPageSize) &&
                    (<span className='buttons'>
                        {props.hasPrev && <i className='left' onClick={handlePagePreviousClick}></i>}
                        {props.hasNext && <i className='right' onClick={handlePageNextClick}></i>}
                    </span>)
            }
        </div>
        </div>
    );
}

export default Pagination;
