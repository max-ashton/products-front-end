import React from "react";

const SearchTextBox = (props) => {

    const onFilterTextChange = (e) => {
        props.onFilterTextChanged(e.target.value);
    };
    return (
        <div className='filter-box-wrapper'>
            {props.filterText && <label>{props.placeHolder}</label>}
            <input type='text' placeholder={props.placeHolder} value={props.filterText} onChange={onFilterTextChange}/>
        </div>
    );

}
export default SearchTextBox;
