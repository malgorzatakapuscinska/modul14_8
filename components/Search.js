Search = React.createClass({
	
	// set initial state
	
    getInitialState(){
        return {
          searchingText: ''  
        };
    },
    
    // definition of handleChange method - assigns a value of string written in input field to searchingText 
    
    handleChange: function(event) {
        var searchingText = event.target.value; // przypisujemy do zmiennej znaki wpisane na klawiaturze
        console.log(searchingText);
        this.setState({							//ustawiamy stan searchingText - nadajemy mu wartość wpisanego tekstu
            searchingText: searchingText
        });
        if (searchingText.length>2){
            this.props.onSearch(searchingText);  //przekazuje wartość zmiennej searchingText do funkcji handleSearch ????? CO to jest onSearch - jakieś zdarzenie??????
        }
    },
    
    // definition of handleKeyUp method - po ki diabeł mi ta funkcja - nie do końca rozumiem ???? Aplikacja działa nadal po wyłączeniu tej metody
    handleKeyUp: function(event){
        if(event.keyKode === 13){
            this.props.onSearch(this.state.searchingText); // zmienia stan komponentu Search na aktualną wartość stringa wpisanego przez użytkownika ??????
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
          onChange={this.handleChange}  //uruchamia metodę handleChange 
          onKeyUp={this.handleKeyUp} 	//uruchamia metodę  handleKeyUp
          placeholder='Tutaj wpisz wyszukiwana frazę'
          style={styles}
          value={this.state.searchTerm} /* tego nie rozumiem - po ki diabeł to jest i co to ustawia ???????*/
          />
       ); 
   } 
});