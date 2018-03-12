var GIPHY_API_URL = 'http://api.giphy.com';
var GIPHY_PUB_KEY = 'q4k1xiFfyXHFEVGeG4SYB8VJsIA5OtQu';

App = React.createClass({
	getInitialState(){
		return {
			loading: false,
			searchingText: '',
			gif: {}
		};
	},
	
	handleSearch: function(searchingText){
		this.setState({
			loading: true
		});
		
	var self=this;
		this.getGif(searchingText, function(gif){
			this.setState({
				loading: false,
				gif: gif,
				searchingText: searchingText
			});
		}.bind(this));
	},
	getGif: function(searchingText, callback){
		var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
		console.log(url);
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload=function(){
			if(xhr.Status === 200){
				var data =JSON.parse(xhr.responseText).data;
				var gif = {
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
				};
				callback(gif);
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
				<p>Znajdź gifa na <a href="'http://giphy.com">giphy</a>. Naciskaj Enter, aby pobrać kolejne gify.</p>
				<Search onSearch={this.handleSearch} />
				<Gif
					loading={this.state.loading}
					url={this.state.gif.url}
					sourceUrl={this.state.gif.sourceUrl} />
			</div>
		);
	}
});