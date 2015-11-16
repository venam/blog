jQuery.githubUser = function(username, callback) {
	jQuery.getJSON('https://api.github.com/users/'+username+'/repos?callback=?',callback)
}

jQuery.fn.loadRepositories = function(username) {
	this.html("<span>Querying GitHub for " + username +"'s repositories...</span>");

	var target = this;
	$.githubUser(username, function(data) {
		target.html(""); //empty the content
		var html = "";
		var repos = data.data; // JSON Parsing
		console.log(repos);
		sortByName(repos);    

		$(repos).each(function() {
			if (this.name != (username.toLowerCase()+'.github.com')) {
				html += '<div class="email">';
				html += '<a href="'+ (this.homepage?this.homepage:this.html_url);
				html += '"> ' + this.name + ' </a>';
				html += ' <em class="post-meta">';
				html += (this.language?('('+this.language+')'):'');
				html += ' </em> ';
				html += this.description;
				html +='</div>';
			}
			target.html(html);
		});
	});

	function sortByName(repos) {
		repos.sort(function(a,b) {
			return a.name - b.name;
		});
	}
};


