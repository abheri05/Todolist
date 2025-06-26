const time = document.getElementById("time")
const timeformat = document.getElementById("timeformat")

document.addEventListener("DOMContentLoaded", function(){
    setInterval(showTime, 1000)
})

function showTime(){
    let date = new Date()

    let hr = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()

    hr = hr<10 ? `0${hr}` : hr;
    min = min<10 ? `0${min}` : min;
    sec = sec<10 ? `0${sec}` : sec;

    time.innerHTML =`${hr} : ${min} : ${sec}`
    
    timeformat.innerhtml = hr>12 ? 'PM' : 'AM';
}

let array = []

function addTask(){
    const dataList = document.getElementById("dataList")
    const dataEntry = dataList.value;

    if(dataEntry === ''){
        alert ('please add some task at first')
    }else{
        array.push(dataEntry)
        dataList.value = ''
        displayTask()
    }
}

function displayTask(){
    const taskLists = document.getElementById("taskLists")
    taskLists.innerHTML = ''
    
    if(array.length === 0){
        taskLists.classList.add('hidden')
        return;
    }

    array.forEach(function(level,index){
        const li = document.createElement('li')
        
        //checkList
        const checkItem = document.createElement("div")
        
        const checkList = document.createElement("input")
        checkList.type = 'checkbox';
        checkList.style.marginRight= '10px'
        
        const span = document.createElement("span")
        span.innerHTML = level
       
        checkList.addEventListener('click', function(){
            if(checkList.checked){
                li.style.textDecoration ='lineThrough'
                li.style.color = 'gray'
            }else{
                li.style.textDecoration = 'none'
                li.style.color = 'black'
            }
        })


        //create button div
        const buttonGrp = document.createElement("div")
        buttonGrp.style.display = 'block';

        //create edit button
        const editButton = document.createElement("button")
        editButton.textContent = 'Edit';
        editButton.style.color =' darkBlue';
        // editButton.style.border = '1px solid blue';

        editButton.addEventListener("click", function(){
            const editTask = prompt("Edit your task here: ", level)

            if(editTask !== null ){
                array[index] = editTask;
                displayTask()
            }
        })

        //create delete button
        const deleteButton = document.createElement("button")
        deleteButton.textContent = 'Delete'
        deleteButton.style.color = 'darkRed'
        // deleteButton.style.border = '1px solid red'

        deleteButton.addEventListener("click", function(){
            array.splice(index,1)
            displayTask()
            console.log('LIZA')
        })



        taskLists.appendChild(li)
        checkItem.appendChild(checkList)
        checkItem.appendChild(span)
        li.appendChild(checkItem)
        li.appendChild(buttonGrp)
        buttonGrp.appendChild(editButton)
        buttonGrp.appendChild(deleteButton)
    })

    taskLists.classList.remove("hidden")
}