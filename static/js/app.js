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
               const liItem= document.createElement('li');
               liItem.innerHTML = jsonresponse['description'];
               document.getElementById('todo').appendChild(liItem);
               document.getElementById('error').classname='hidden';
          })
          .catch(function() {
               document.getElementById('error').classname = '';
          })
})

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
