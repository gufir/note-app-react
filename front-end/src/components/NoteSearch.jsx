import React, { useState } from "react";

function NoteSearch({ onSearch }) {

    const [query, setQuery] = useState('');
    
    const handlesearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        console.log('Current input value:', value); // Log the input value
        onSearch(value);
    }

    return (
        <div className="note__search">
            <input
                type="text"
                placeholder="Search Notes"
                value={query}
                onChange={handlesearch}
            />
        </div>
    );
}

export default NoteSearch;





// import React from "react";

// class NoteSearch extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             search: ""
//         };

//         this.onSearchChangeEventHandler = this.onSearchChangeEventHandler.bind(this);
//     }

//     onSearchChangeEventHandler(event) {
//         this.setState({ search: event.target.value }, () => {
//             return this.props.onSearch(this.state.search);
//         });
//     }


//     render() {
//         return (
//             <div className="note__search">
//                 <input
//                     type="text"
//                     placeholder="Search notes"
//                     value={this.props.search}
//                     onChange={this.onSearchChangeEventHandler}
//                 />
//             </div>
//         );
//     }
// }

// export default NoteSearch;