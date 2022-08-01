const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight
canvas.width = 1000

const ctx = canvas.getContext('2d')
let nums = parseInt(document.getElementById("range").value)
let sortingType = document.getElementById("sortingType").value
let visType = document.getElementById("visType").value
let sample = new ObjSet(nums, visType)

updateInput()
updateView()
function updateInput(){
    nums = parseInt(document.getElementById("range").value)
    visType = document.getElementById("visType").value
    sortingType = document.getElementById("sortingType").value
    sample = new ObjSet(nums, visType)
    sample.draw(ctx)
}

async function start(){
    disableInput()
    await sample.sort(sortingType)
    Visualizer.writeText(ctx, sample.issorted ? "All sorted, nicely done 👍" : "Aww, Snap💀! Something went wrong", 10, 45, 30)

    enableInput()
}

function randomise(){
    sample.randomise()
    sample.draw(ctx)
}


function disableInput(){
    document.getElementById("range").disabled = true
    document.getElementById("visType").disabled = true
    document.getElementById("sortingType").disabled = true
    document.getElementById("start").disabled = true
    document.getElementById("randomise").disabled = true
}

function enableInput(){
    document.getElementById("range").disabled = false
    document.getElementById("visType").disabled = false
    document.getElementById("sortingType").disabled = false
    document.getElementById("start").disabled = false
    document.getElementById("randomise").disabled = false
    document.getElementById("inputSection").disabled = false
}