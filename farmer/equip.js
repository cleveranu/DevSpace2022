var CartApp= (function(){
    let tasks = [];
    const taskList = document.getElementById('list');
    console.log(taskList);
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    var a = 10;
    async function fetchTodos() {
        // fetch("https://jsonplaceholder.typicode.com/todos")
        // //returns promise
        // .then(function(response){
        //     return response.json();
    
        // }).then(fucntion(data){
        //     console.log(data);
        //     tasks = data.slice(0,10);
        //     renderlist();
        // })
        // .catch (function(error){
        //     console.log(error)
        
    // })
      try{
        const response = await fetch("http://localhost:3000/api/v1/equipments")
        const data= await response.json();
        console.log(data);
        tasks= data.slice(0,10);
        renderList() ;
    
      } catch(error){
       console.log(error);
      }
    
    }
    

    function toggleTask (taskId) {
        const task = tasks.filter( function (task) {
          return task.id === Number(taskId)
       });
        if (task.length > 0) {
          const currentTask = task[0];
          currentTask.completed = !currentTask.completed;
           renderList();
          showNotification( 'Task toggled successfully');
          return;
        }
        showNotification('Could not toggle the task');
     }

    
    
    
    function deleteTask (taskId) {
        const newTasks = tasks.filter( function (task) {
           return task.id !== Number(taskId)
        });
        tasks = newTasks;
        renderList();
        showNotification('Task deleted successfully');
    }
    function addTask (task) {
        if (task) {
           fetch( 'Http://localhost:3000/api/v1/equipment',{
            method: 'POST',
             headers: {
               "Content-Type": 'application/json',
             },
             body: JSON.stringify(task),
          }). then( function (response) {
             return response.json();
          }).then( function (data) {
             console. log(data)
             tasks. push(task);
             renderList();
             showNotification('Task added successfully');
             return;
          })
           .catch( function (error) {
             console.log( 'error', error);
        
            })
        }
    }
    

// }
//        function addTask (task) {
//         if (task) {
//           tasks.push(task);
//            renderList();
//            showNotification('Task added successfully');
//            return;
//             }
//         showNotification('Task can not be added');
//         }
    // function addTask (task) {
    //     console.log(text);
        
    
    // }
    function addTaskToDOM (task) {
       const li = document.createElement('li');
       li.innerHTML = `
        <li>
          <input type="checkbox" id="${task.id}" ${task.completed ? 'checked':''} class = "custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="bin.svg" class="delete" data-id="${task.id}" />
        </li>
         `;
               
               
        taskList.append(li);
    }
    
      function renderList () {
        taskList.innerHTML ="";
        for (let i = 0; i < tasks.length; i++) {
          addTaskToDOM(tasks[i]);
        }
       tasksCounter.innerHTML = tasks.length;
    }
     function showNotification(text) {
        alert(text);
        // tasks.push(text);
        // renderList;
    
    }
    // function renderList () {
    //     taskslist.innerHTML - ';
    //     for (let i 0; i < tasks.length; i+) {
    //        addTaskToDOM( tasks[i]);
    //     tasksCounter.innerHTML tasks. length;
    
    
    function handleInputKeypress(e){
        if (e.key === "Enter"){
            const text = e.target.value;
            // console.log(text);
        if (!text){
            showNotification("Tast text can not be empty");
            return;
        }
        const task = {
           title: text,
            id: Date.now(),
            completed: false
        }
        e.target.value = '';
        addTask(task);
    }
    }
    function handleClickListener(e){
        const target = e.target;
        // console.log(target);
        if (target.className === "delete"){
               const taskId= target.dataset.id;
               deleteTask(taskId);
               return;
    
        } else if (target.className === "custom-checkbox"){
           const taskId = target.id;
           // in input box we have id attricute not data id attricute so we are getting it from task id not data set isliye its target.id not target.dataset.id 
           toggleTask(taskId);
           return;
        }
    }
    function initializeApp() {
        fetchTodos();
        addTask(tasks);
        addTaskInput.addEventListener("keyup",handleInputKeypress);
        document.addEventListener('click', handleClickListener);
    }
     
    return {
        initialize: initializeApp,
        a: add
    }
    
})()