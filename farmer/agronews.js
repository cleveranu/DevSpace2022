var NewsApp = (function(){
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
    fetch("http://localhost:3000/api/v1/news/")
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
    
        
    <div class="py-8 flex flex-wrap md:flex-nowrap" style="user-select: auto;">
    <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col" style="user-select: auto;">
      <span class="font-semibold title-font text-gray-700" style="user-select: auto;">${task.category}</span>
      <span class="mt-1 text-gray-500 text-sm" style="user-select: auto;">${task.date}</span>
    </div>
    <div class="md:flex-grow" style="user-select: auto;">
      <h2 class="text-2xl font-medium text-gray-900 title-font mb-2" style="user-select: auto;">${task.title}
          </h2>
      <p class="leading-relaxed" style="user-select: auto;">${task.description}</p>
      <a class="text-green-500 inline-flex items-center mt-4" style="user-select: auto;">Read More
        <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" style="user-select: auto;">
          <path d="M5 12h14" style="user-select: auto;"></path>
          <path d="M12 5l7 7-7 7" style="user-select: auto;"></path>
        </svg>
      </a>
    </div>
  </div>
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
