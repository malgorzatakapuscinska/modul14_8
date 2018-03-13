Search = React.createClass({
    getInitialState(){
        return {
          searchingText: ''  
        };
    },
    handleChange: function(event) {
        var searchingText = event.target.value; // przypisujemy do zmiennej znaki wpisane na klawiaturze
        console.log(searchingText);
        this.setState({							//ustawiamy stan searchingText - nadajemy mu wartość wpisanego tekstu
            searchingText: searchingText
        });
        if (searchingText.length>2){
            this.props.onSearch(searchingText); // ??????????? - to wywołuje funkcję handleSwearch w App???
        }
    },
    handleKeyUp: function(event){
        if(event.keyKode === 13){
            this.props.onSearch(this.state.searchingText); // ??????????????? to j.w.?????
        }
    },
    
    render: function (){
       var styles: {
           fontSize: '1,5em ',
           width: '90%',
           maxWidth: '350px'
       };
       
       return (
          <input 
          type='text'
          onChange={this.handleChange} //wywołuje funkcję handleChange
          onKeyUp={this.handleKeyUp} //wywołuje funkcję handleKeyUp
          placeholder='Tutaj wpisz wyszukiwana frazę'
          style={styles}
          value={this.state.searchTerm} //???????????????
          />
       ); 
   } 
});