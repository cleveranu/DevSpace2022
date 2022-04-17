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
    fetch("https://localhost:3000/api/v1/weather/status/")
    //returns promise
    .then(function(response){
        console.log(response);
        return response.json();
    
    }).then(function(data){
        console.log(data);
        reviews = data.slice(0,1);
        renderList();
    })
    .catch (function(error){
        console.log(error);
    
    })
    }
    
    
    function addTaskToDOM (task) {
       const li = document.createElement('li');
       li.innerHTML = `
       <li>
    
        <h3 class="experience-designation  m0 m-blue"> ${task.name}</h3> </h3>
    
    
    <p class="experience-description text-align-justify"> ${task.reviews}</p>
    <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md" style="user-select: auto;">
         
    <div class="relative mb-4" style="user-select: auto;">
        <label for="name" class="leading-7 text-sm text-gray-600" style="user-select: auto;">Address</label>
        <input type="text" id="name" name="name" class="w-full bg-white rounded border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" style="user-select: auto;">
      </div>
 
  <div class="lg:w-1/2 px-6 mt-4 lg:mt-0" style="user-select: auto;">
    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs" style="user-select: auto;">Crop details are:</h2>
    <a class="text-yellow-500 leading-relaxed" style="user-select: auto;">${task.crop}</a>
    <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4" style="user-select: auto;">${task.howOld}</h2>
    <p class="leading-relaxed" style="user-select: auto;">Estimated days to grow: ${task.estimatedTime}</p>
  </div>
</div>
</div>

</ul>
    
<div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0" style="user-select: auto;">
  <h2 class="text-gray-900 text-lg mb-1 font-medium title-font" style="user-select: auto;">Personalised Weather Report </h2>
 
  <p class="leading-relaxed mb-5 text-gray-600" style="user-select: auto;">According our sources</p>
  <!-- <ul id="complication">
     <li>
      <p class="leading-relaxed mb-5 text-gray-600" style="user-select: auto;">Weather: Rainstorm predicted at 9pm</p>

      </li>

  </ul> -->
 <!-- Backend to be added soon -->
 
  <p class="leading-relaxed mb-5 text-gray-600" style="user-select: auto;">Weather: Rainstorm predicted at 9pm</p>
    <!-- To be implemented in future -->
  
  <p class="leading-relaxed mb-5 text-gray-600" style="user-select: auto;">Since paddy is at x day ${task.crop} will be ${task.status} as Rain is ${task.willItRain}  so accordingly if Rain is yes or not where yes is it will rain and no is it wont. So Rain is ${task.goodOrBad} for it</p>
  <p class="leading-relaxed mb-5 text-gray-600" style="user-select: auto;">Action by farmer: ${task.action}, ${task.message}</p>
 
  <div class="relative mb-4" style="user-select: auto;">

              
  </div>

  <p class="text-xs text-gray-500 mt-3" style="user-select: auto;">Thank you</p>
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
