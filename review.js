var ReviewApp = (function(){
    let reviews = [];
    const reviewList = document.getElementById('timeline1');
    // console.log(reviewList);
    
    // var a = 10;
    // async function fetchTodos() {
      
    //   try{
    //     const response = await fetch("https://jsonplaceholder.typicode.com/todos")
    //     const data= await response.json();
    //     console.log(data);
    //     reviews= data.slice(0,3);
    //     renderList() ;
    
    //   } catch(error){
    //    console.log(error);
    //   }
    
    // }
    
    // console.log('Working');
    // method get
    function fetchReviews(){
    fetch("http://acril-backend.herokuapp.com/api/v1/review")
    //returns promise
    .then(function(response){
        console.log(response);
        return response.json();
    
    }).then(function(data){
        console.log(data);
        reviews = data.slice(0,3);
        renderList();
    })
    .catch (function(error){
        console.log(error);
    
    })
    }
    
    
    function addTaskToDOM (task) {
       const li = document.createElement('li');
       li.innerHTML = `
    
        <h3 class="experience-designation  m0 m-blue"> ${task.name}</h3> </h3>
    
    
    <p class="experience-description text-align-justify"> ${task.reviews}</p>
    
        </li>
         `;
     
               
        reviewList.append(li);
    }
    
      function renderList () {
        reviewList.innerHTML -"";
        for (let i = 0; i < reviews.length; i++) {
          addTaskToDOM(reviews[i]);
        }
    
    }
     function showNotification(text) {
        alert(text);
     
    
    }
    function initializeApp(){
       fetchReviews();
    }

    return {
        initialize: initializeApp,
    
    }
})()
