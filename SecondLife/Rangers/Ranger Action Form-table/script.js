 //let el_up;
 

   var list = [
      {"date":"","your-name":"q","subj-name":"w",
       "slurl-loc":"e","issue-type":"r","comment":"t",
       "chk":"on","_id":"SyJaaqMqDU4JPu8b"},
      {"date":"2020-09-20","your-name":"1`","subj-name":"2",
       "slurl-loc":"3","issue-type":"4","comment":"yaya",
       "chk":"on","_id":"fGJeLgpZ7dMGlxlU"},
      {"date":"2020-09-20","your-name":"me","subj-name":"yu",
       "slurl-loc":"bu","issue-type":"ku","comment":"shushu",
       "_id":"nsvDkEMI7rNI5ML0"}
   ];



		var data = [ 
			{ "col_1": "val_11", "col_3": "val_13" }, 
			{ "col_2": "val_22", "col_3": "val_23" }, 
			{ "col_1": "val_31", "col_3": "val_33" } 
		]; 
		
	 window.onload = function() {
	 let el_up = document.getElementById("GFG_UP"); 
   el_up.innerHTML = "Click on the button to create " 
				+ "the table from the JSON data.<br><br>" 
				+ JSON.stringify(list[0]) + "<br>" 
				+ JSON.stringify(list[1]) + "<br>" 
				+ JSON.stringify(list[2]); 
 };	
        
			
		function constructTable(selector) { 
			
			// Getting the all column names 
			var cols = Headers(list, selector); 

			// Traversing the JSON data 
			for (var i = 0; i < list.length; i++) { 
				var row = $('<tr/>'); 
				for (var colIndex = 0; colIndex < cols.length; colIndex++) 
				{ 
					var val = list[i][cols[colIndex]]; 
					
					// If there is any key, which is matching 
					// with the column name 
					if (val == null) val = ""; 
						row.append($('<td/>').html(val)); 
				} 
				
				// Adding each row to the table 
				$(selector).append(row); 
			} 
		} 
		
		function Headers(list, selector) { 
			var columns = []; 
			var header = $('<tr/>'); 
			
			for (var i = 0; i < list.length; i++) { 
				var row = list[i]; 
				
				for (var k in row) { 
					if ($.inArray(k, columns) == -1) { 
						columns.push(k); 
						
						// Creating the header 
						header.append($('<th/>').html(k)); 
					} 
				} 
			} 
			
			// Appending the header to the table 
			$(selector).append(header); 
				return columns; 
		}	 

   
