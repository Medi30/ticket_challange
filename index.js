
var uploadlogo = document.querySelector("#uplogo")
var uploadBox = document.querySelector("#dragdrop")

uploadlogo.addEventListener("click", uploadSelect)
document.querySelector("#generateButton").addEventListener("click", generate)
document.querySelector(".changebtn").addEventListener("click", uploadSelect)
document.querySelector("#fileInput").addEventListener("change", uploadIMG)

addlisten()
function addlisten(){
    var listeners = Array.from(document.getElementsByClassName("form-control"))
        for (i = 0; i < listeners.length; i += 1){
            listeners[i].addEventListener("click", handleClick)
        }
}


/*Remove button*/
document.querySelector(".removebtn").addEventListener("click", function(event){
    document.querySelector("#dragdropText").classList.remove("hide")
    document.querySelector("#buttoncont").classList.add("hide")
    uploadlogo.src = "assets/images/icon-upload.svg"
    uploadlogo.classList.add("uplogoDefault")
    uploadBox.classList.remove("highlight")
    uploadlogo.addEventListener("click", uploadSelect)
    validtext["img"] = null
})


/*on click highlight*/
var prevHighlight
function handleClick(event){
    this.classList.add("highlight")
    if (prevHighlight && prevHighlight != this){
        prevHighlight.classList.remove("highlight")
        prevHighlight = this
    } else{
        prevHighlight = this
    }
    if (this != uploadBox){
        uploadBox.classList.remove("highlight")
    }

}

/*File Drag*/
document.querySelector("#dragdrop").addEventListener("drop", function(event){
    event.preventDefault()
     file = event.dataTransfer.files[0]
     uploadIMG()
})



function dragEvent(event){
    if (event.target.id === "uplogo" || "dragdrop"){
        uploadBox.classList.add("hoverover")
        event.preventDefault()
    }
}

function dragEventEnd(event){
    if (event.target.id != "uplogo" || "dragdrop"){
        uploadBox.classList.remove("hoverover")
    }
}

/*File Select*/
function uploadSelect(event){
        document.querySelector("#fileInput").click()
        uploadBox.classList.add("highlight")
        if (prevHighlight){
            prevHighlight.classList.remove("highlight")
        }
}

/* Image Upload*/
var errortext
var file
var fileconvert
function uploadIMG (event) {
    uploadBox.classList.remove("hoverover")
    uploadBox.classList.remove("highlight")
    errortext = document.querySelector("#uploadtext")
    if (event){
        file = event.target.files[0]
    }
    if (file && file.size <= 500000 && file.type === "image/jpeg" || file.type === "image/png"){
        var reader = new FileReader()
        reader.onload = function (event){
            document.querySelector("#uplogo").src = event.target.result
            fileconvert = event.target.result
            uploadlogo.classList.remove("uplogoDefault")
            uploadlogo.classList.add("upImg")
        }
        reader.readAsDataURL(file)
        document.querySelector("#dragdropText").classList.add("hide")
        document.querySelector("#buttoncont").classList.remove("hide")
        document.querySelector("#dragdrop").removeEventListener("click", uploadSelect)
        errortext.innerHTML = '<img id="upsymbol" src="assets/images/icon-info.svg"> Upload your photo (JPG or PNG, max size: 500KB)';
        errortext.style.color = "white"
        document.querySelector("#upsymbol").classList.remove("uploadtextsymbol")
        validtext["img"] = true
    }else if (file.size > 500000){
        uploadlogo.classList.add("uplogoDefault")
        uploadlogo.src = "assets/images/icon-upload.svg"
        errortext.innerHTML = '<img id="upsymbol" src="assets/images/icon-info.svg"> File too large. Please upload under 500KB';
        errortext.style.color = "red"
        document.querySelector("#upsymbol").classList.add("uploadtextsymbol")
        document.querySelector("#dragdropText").classList.remove("hide")
        document.querySelector("#buttoncont").classList.add("hide")
        validtext["img"] = null
    }
}

/* On Generate Button pressed */

var validtext = {
    name: null,
    email: null,
    git: null,
    img: false
}

var invalidtext = {
    name: null,
    email: null,
    git: null
}

var regexes = {
    name : /^[A-Za-z]+(?: [A-Za-z]+)*$/,
    email : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    git : /^&[a-zA-Z0-9-]{0,38}$/
}

function generate(){
    var fields = {
        name :  document.querySelector("#nameInput1"),
        email: document.querySelector("#emailInput1"),
        git: document.querySelector("#githubInput1")
    }

    for (var key of Object.keys(fields)){
        if (invalidtext[key]){
            fields[key].parentNode.removeChild(invalidtext[key])
        }
       if (regexes[key].test(fields[key].value)) {
            validtext[key] = fields[key].value
            invalidtext[key] = null
        }else{
            validtext[key] = null
            invalidtext[key] = document.createElement("p")
            invalidtext[key].textContent = "Please enter a valid " + [key] 
            fields[key].parentNode.appendChild(invalidtext[key])
            invalidtext[key].classList.add("errortext")
            }
    }
    if (validtext["name"] && validtext["email"] && validtext["git"] && validtext["img"]){
        document.querySelector("#firstHeader").classList.add("hide")
        document.querySelector("#inputcont").classList.add("hide")
        document.querySelector("#secondHeader").classList.remove("hide")
        document.querySelector("#ticketSVG").classList.remove("hide")
        ticketGenerate()
    }
}

/* On Valid Generation*/
function ticketGenerate(){
    document.querySelector("#ticketHeader").innerHTML = "Congrats, <span id='ticketNameGradient'>" +validtext["name"] + "</span>! Your ticket is ready."
    document.querySelector("#ticketH2").innerHTML = "We've emailed your ticket to <span id='ticketEmail'>" +validtext["email"]+ "</span> and will send updates in the run up to the event."
    document.querySelector("#ticketName").textContent = validtext["name"]
    document.querySelector("#ticketGit").textContent = validtext["git"]
    document.querySelector("#ticketAvatar").setAttribute("href",fileconvert)
    
}

/* On Mouse Hover*/
function hover(event){
    if (event.target.id === "generateButton"){
        event.target.classList.add("generatehover")
    } else {
        event.target.classList.add("hoverover")
    }
}

function hoverend(event){
    if (event.target.id === "generateButton"){
        event.target.classList.remove("generatehover")
    }else{ event.target.classList.remove("hoverover")
    }
}

