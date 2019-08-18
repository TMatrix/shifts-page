let week = document.querySelector(".week-container");

week.addEventListener("click", toggleHour);

setHoursTitles();

function setHoursTitles() {
    let hours = document.querySelectorAll(".hours-container");
    [...hours[0].children].forEach((el, i) => {
        if(i%2 !== 0){
            el.style.opacity = 0;
        }
    });
    [...hours[1].children].forEach((el, i) => {
        if(i%2 === 0){
            el.style.opacity = 0;
        }
    });
}

function toggleHour(event) {
    let elem = event.target;
    if (elem.nodeName === "LI") {
        elem.classList.toggle("checked");
    }
    console.log([...elem.parentElement.children].indexOf(elem));
}

$(document).ready(function(){
  $('input.timepicker').timepicker({
    timeFormat: 'hh:mm p',
    interval: 60,
    // minTime: '00',
    // maxTime: '6:00pm',
    // defaultTime: '00',
    // startTime: '0:00',
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
  $( "#datepicker" ).datepicker({
    // altField: "#datepicker-input",
    // altFormat: "yy-mm-dd",
    dateFormat: "dd/mm/yy",
    yearRange: "c-10:c+10",
    dayNamesMin : [ "S", "M", "T", "W", "T", "F", "S" ],
    // defaultDate: +1,
  });


  let removeSVG = '<i class="far fa-trash-alt"></i>';

  document.getElementById("add").addEventListener("click", function(){

    let value0 = document.getElementById("datepicker").value;
    let value1 = document.getElementsByClassName("timepicker")[0].value;
    let value2 = document.getElementsByClassName("timepicker")[1].value;
    if (value0 && value1 && value2) {
      checkInput(value0, value1, value2);
      document.getElementById("datepicker").value = '';
      document.getElementsByClassName("timepicker")[0].value = '';
      document.getElementsByClassName("timepicker")[1].value = '';
    }
  });

  function addItemToList(value0, value1, value2){
    let list = document.getElementsByTagName("ul")[0];
    let item = document.createElement("li");
    item.innerHTML = "Date: " + value0 + ", " + "<br>" + "Time: " + value1 + " - " + value2;

    let button = document.createElement("div");
    button.classList.add("button");

    let remove = document.createElement("button");
    remove.innerHTML = removeSVG;

    remove.addEventListener("click", removeItem);

    button.appendChild(remove);

    item.appendChild(button);

    list.appendChild(item);
  }

  function removeItem(){
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;

    parent.removeChild(item);
  }

  function checkInput(val0, val1, val2){
    let a = +(val1[0] + val1[1]);
    let b = +(val2[0] + val2[1]);
    if (a >= b){
      $("#warning").css({
        "display": "block",
        "background-color": "red"        
      });
      let popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      setTimeout(function(){popup.classList.toggle("show")}, 3000);
      return;
    }
    return addItemToList(val0, val1, val2);
  }
});
