var doc_arrs = document.getElementById("change_size");
var array_size = doc_arrs.value;
var doc_gen = document.getElementById("generate_array");
var arr_cont = document.getElementById("array_container");
var div_sizes = [];
var divs = [];
var algo_buttons = [
    document.getElementById("merge"),
    document.getElementById("bubble"),
    document.getElementById("insertion")];
var cur_algo = "merge";
var sort_button = document.getElementById("sort")

var current_delay = 0;
var gen_delay = 0;

doc_gen.addEventListener("click", update_array_size);
doc_arrs.addEventListener("input", update_array_size);

function generate_array(){
    arr_cont.innerHTML = "";
    width = 800 / array_size;
    font_size = Math.min(width / 5, 20);
    text_color = "white";
    if (font_size < 8){
        font_size = 0;
        text_color = "transparent";
    }
    div_sizes = [];
    divs = [];
    for(var i = 0;i < array_size;i += 1){
        div_sizes[i] = Math.floor(Math.random() * 560) + 40;
        divs[i] = document.createElement("div");
        arr_cont.appendChild(divs[i]);
        divs[i].style = "height: " + div_sizes[i] + 
                        "px; width: "+ width +"px; margin-left: 3.5px;" +
                        "background-color: rgba(66, 134, 244, 0.8); " +
                        "color: " + text_color + "; font-size: " + font_size + "px"; 
        divs[i].innerHTML = div_sizes[i];
    }
}

function update_array_size(){
    array_size = doc_arrs.value;
    gen_delay = Math.floor(500 / array_size);
    current_delay = 0;
    if(array_size > 50){
        gen_delay = Math.floor(200 / array_size);
    }
    generate_array();
}

window.onload = update_array_size();

for(var i = 0;i < algo_buttons.length;i += 1){
    algo_buttons[i].addEventListener("click", change_algo);
}
sort_button.addEventListener("click", runalgo);


function change_algo(){
    this.classList = ["current_algo_button"];
    for(var i = 0;i < algo_buttons.length;i += 1){
        if (this.innerHTML != algo_buttons[i].innerHTML){
            algo_buttons[i].classList = ["algo_button"];
        }
    }
    switch (this.innerHTML){
        case "Merge Sort":
            cur_algo="merge";break;
        case "Bubble Sort":
            cur_algo="bubble";break;
        case "Insertion Sort":
            cur_algo="insertion";break;
    }
}

function runalgo(){
    switch (cur_algo){
        case "merge":
            merge_sort();break;
        case "bubble":
            bubble_sort();break;
        case "insertion":
            insertion_sort();break;
    }
}

function merge_sort(){
    console.log("MERGE IT!");
}

function color_green(a, b){
    a.style.backgroundColor = "rgba(78, 216, 96, 0.8)";
    b.style.backgroundColor = "rgba(78, 216, 96, 0.8)";
}

function color_red(a, b){
    a.style.backgroundColor = "rgba(219, 57, 57, 0.8)";
    b.style.backgroundColor = "rgba(219, 57, 57, 0.8)";
}

function color_blue(a ,b){
    a.style.backgroundColor = "rgba(66, 134, 244, 0.8)";
    b.style.backgroundColor = "rgba(66, 134, 244, 0.8)";
}

function color_violet(a){
    a.style.backgroundColor = "rgba(169, 92, 232, 0.8)";
}

function compare_bubble(a, b){
    setTimeout(function(){
        color_green(a, b);
    }, current_delay+=gen_delay);
    
    setTimeout(function(){
        if(parseInt(a.innerHTML) > 
                parseInt(b.innerHTML)){
            color_red(a, b);
            var c = a.innerHTML;
            a.innerHTML = b.innerHTML;
            b.innerHTML = c;
            a.style.height = a.innerHTML + "px";
            b.style.height = b.innerHTML + "px";
        }
    }, current_delay+=gen_delay);
    
    setTimeout(function(){
        color_blue(a, b);
    }, current_delay+=gen_delay);
}

function bubble_sort(){
    var n = divs.length;
    for(var i = 0;i < n;i += 1){
        for(var j = 0;j < n - i - 1;j += 1){
            compare_bubble(divs[j], divs[j+1]);
        }
        (function(i) {
            setTimeout(function(){
                color_violet(divs[n - i - 1]);
            }, current_delay+=gen_delay);
        })(i);
    }
    
}

function update_insertion(a, height, color){
    setTimeout(function(){
        a.style.height = height + "px";
        a.innerHTML = height;
        switch (color){
            case "red":
                a.style.backgroundColor = "rgba(219, 57, 57, 0.8)";
                break;
            case "blue":
                a.style.backgroundColor = "rgba(66, 134, 244, 0.8)";
                break;
            case "green":
                a.style.backgroundColor = "rgba(78, 216, 96, 0.8)";
                break;
            case "violet":
                a.style.backgroundColor = "rgba(169, 92, 232, 0.8)";
                break;
        }
    }, current_delay+=gen_delay);
}

function insertion_sort(){
    var n = divs.length;
    for(var i = 0;i < n;i += 1){
        var key = div_sizes[i];
        var j = i - 1;
        while(j >= 0 && key < div_sizes[j]){
            update_insertion(divs[j], div_sizes[j], "green");
            update_insertion(divs[j + 1], div_sizes[j + 1], "green");

            
            update_insertion(divs[j], div_sizes[j], "red");
            update_insertion(divs[j + 1], div_sizes[j + 1], "red");

            div_sizes[j + 1] = div_sizes[j];

            update_insertion(divs[j], div_sizes[j], "green");
            update_insertion(divs[j + 1], div_sizes[j + 1], "green");
            j -= 1;
        }
        div_sizes[j + 1] = key;

        for(var t = 0;t < i;t += 1){
            update_insertion(divs[t], div_sizes[t], "blue");
        }
    }
    for(var i = 0;i < n;i += 1){
        update_insertion(divs[i], div_sizes[i], "violet");
    }
}