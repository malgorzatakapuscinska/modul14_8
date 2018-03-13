var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'q4k1xiFfyXHFEVGeG4SYB8VJsIA5OtQu';

App = React.createClass({

//set initial state

	getInitialState(){
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},

// metoda handleSearch ustawia stan loading na true a następnie wywoluje funkcję getGif, parametrem jest wartosć zmeinnej searchingText otrzymanej od funkcji handleChange????

	handleSearch: function(searchingText){
	
	//sets state loading to true - shows loading gif
	
		this.setState({
			loading: true
		});
		
	//wywolanie metody getGif - otrzymuje ona parametry searchingText oraz funkcję z parametrem w postaci pustego obiektu gif ???
	
		this.getGif(searchingText, function(gif){ //tu daję do funkcji getGif funkcję z pustym obiektem gif jako argumentem
		// ustawienie stanu elementu App:
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this)); 
	},
	
	// definicja metody getGif - pobiera z serwera dane obrazka i zwraca obiekt gif poprzez callback 
	
	getGif: function(searchingText, callback){

		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		console.log(url);
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload=function(){
			if(xhr.status === 200){
				var data =JSON.parse(xhr.responseText).data; 
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif); // a tutaj dostaję obiekt gif przekazywany przez callback do funkcji setstate w handlesearch - I am right????
			}
		}
		xhr.send();
	},
	
	render: function(){
		var styles = {
			margin: '0 auto',
			textAlign: 'center',
			width: '90%'
		}
		
		return (
			<div style={styles}>
				<h1>Wyszukiwarka Gifów</h1>
				<p>Znajdź gifa na <a href="'http://giphy.com">giphy</a> Naciskaj Enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch} /> 
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl} />
			</div>
		);
	}
});

