console.log("myscript.js initialzed");

// Initialize the default app
var defaultApp = firebase.initializeApp(config);

console.log(defaultApp.name);  // "[DEFAULT]"

// You can retrieve services via the defaultApp variable...
var database = firebase.database();

//Render Data
renderTable();

function writeKeywordData(keyword, response, compare) {
	keyRef = firebase.database().ref('keywords/');
	keyRef.push({
		key: keyword,
		response: response,
		compare: compare
	});
}

function renderTable(){
	var keywordArray = new Array();
	var tableBody = '<thead>\
	                <tr>\
	                  <th>Response</th>\
					  <th>Compare</th>\
					  <th>Keyword</th>\
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
					tableBody = tableBody + '<td>'+ aValue + '</td>'
				}else if(akey === 'response'){
					tableBody = tableBody + '<td>' + aValue + '</td></tr>'
				}else if(akey === 'compare'){
					if(aValue == 1){
						tableBody = tableBody + '<tr><td>Equal</td>'
					}else if(aValue == 2){
						tableBody = tableBody + '<tr><td>Contains</td>'
					}
					
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
  var compare = $form.find("select[placeholder='Compare']").val();

  writeKeywordData(key, response, compare);
  renderTable();
});