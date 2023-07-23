let canvas=document.getElementById("canvas")
let c=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

function animate(){
    requestAnimationFrame(animate)
}
animate()