console.log("myscript.js initialzed");

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var database = firebase.database();

//Render Data
renderTable();

function writeKeywordData(keyword, response) {
	keyRef = firebase.database().ref('keywords/');
	keyRef.push({
		key: keyword,
		response: response
	});
}

function renderTable(){
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

		console.log('keywordsRef Called');
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
}


//Submit form
$( "#keyword-form" ).submit(function( event ) {
  console.log( "Handler for .submit() called." );
  event.preventDefault();

  //trigger custom post
  var $form = $( this );
  var key = $form.find("input[placeholder='Keyword']").val();
  var response = $form.find("input[placeholder='Response']").val();

  writeKeywordData(key, response);
  renderTable();
});