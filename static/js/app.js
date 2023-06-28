console.log("connected");

form.addEventListener('submit', function (e) {
     e.preventDefault();
     desc = document.getElementById('description').value;
     fetch('/todos/create', {
               headers: {'Content-Type': 'application/json'},
               method: 'POST',
               body: JSON.stringify({'description': desc})
          })
          .then(function(response){
               console.log(response)
               return response.json();
          })
          .then(function(jsonresponse){
               const liItem = document.createElement('li');
               const checkbox = document.createElement('input');
               checkbox.className = 'check-completed';
               checkbox.type = 'checkbox';
               checkbox.setAttribute('data-id', jsonresponse.id);
               liItem.appendChild(checkbox);
               const text = document.createTextNode(' ' + jsonresponse.description)
               // liItem.innerHTML = jsonresponse['description'];
               document.getElementById('todo').appendChild(liItem);
               document.getElementById('error').classname='hidden';
          })
          .catch(function() {
          	console.error('Error occurred')
               document.getElementById('error').classname = '';
          })
})
const checkboxes = document.querySelectorAll('.check-completed');
for (let i = 0; i < checkboxes.length; i++) {
	const checkbox = checkboxes[i];
	checkbox.onchange = function(e) {
		console.log('event', e);
		const todo_id = e.target.dataset['id']
		const newCompleted = e.target.checked;
		fetch('/todos/' + todo_id + '/set-completed', {
			headers: {'Content-Type': 'application/json'},
			method: 'POST',
			body: JSON.stringify({'completed' : newCompleted})})
		.then(function() {
			document.getElementById('error').className = 'hidden';
		})
		.catch(function() {
			document.getElementById('error').className = '';
		})
	}
}

// document.getElementById('form'.onsubmit = function (e) {
//    e.preventDefaut();
//    fetch('/todos/create', {
//               headers: {'Content-Type': 'application/json'},
//               method: 'POST',
//               body: JSON.stringify({'description': document.getElementById('description').value
//                    })
//     })
//     .then(function(response){
//      console.log("Hell");
//      return response.json();
//     })
//     .then(function(jsonresponse) {
//          console.log(jsonresponse);
//          const liItem= document.createElement('li');
//          liItem.innerHTML = jsonResponse['description'];
//          document.getElementById('todo').appendChild(liItem);
//          document.getElementById('error').classname='hidden';
//          console.log("HI Mr");
//     })
//     .catch(function() {
//          document.getElementById('error').classname='';
//           })
// })
