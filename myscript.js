console.log("myscript.js initialzed");

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var database = firebase.database();

//Add some data
// writeKeywordData("Ball","Krean");
// writeKeywordData("Juk","หล่อสัสๆ");
// writeKeywordData("จึ๊ก","พ่อเทพบุตร");

function writeKeywordData(keyword, response) {
	keyRef = firebase.database().ref('keywords/');
	keyRef.push({
		key: keyword,
		response: response
	});
}

var keywordArray = new Array();
var tableBody = '<thead>\
                <tr>\
                  <th>No.</th>\
                  <th>Keyword</th>\
                  <th>Response</th>\
                </tr>\
	              </thead>\
	              <tbody>';
//Collect Display data
var keywordsRef = firebase.database().ref('keywords/');
keywordsRef.on('value', function(snapshot){
	var obj = snapshot.val();

	var i = 1;
	$.each(obj, function( key, value ){
		$responseObj = value;

		//Construct RAW HTML Object
		$.each($responseObj, function (akey, aValue){
			console.log(akey + ':' + aValue);

			if(akey === 'key'){
				tableBody = tableBody + '<tr><td>' + i + '.</td><td>'+ aValue + '</td>'
			}else if(akey === 'response'){
				tableBody = tableBody + '<td>' + aValue + '</td></tr>'
			}
		});
		i++;
	});

	tableBody = tableBody + '</tbody></table>';
	$( "#keyword-table" ).html(tableBody);
});






