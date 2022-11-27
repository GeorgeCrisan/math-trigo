import { xyItem, drawCS, drawText, drawLine, average, toDeg } from "./helpers";

let theta = Math.PI / 4;
document.getElementById("thetaInput").value =  String(theta.toFixed(2));
let c = 200;

// Declare default points
// Have to be at the top to be reachable by other functions
let A = xyItem();
let B = xyItem( Math.cos(theta) * c, Math.sin(theta) * c );
let C = xyItem(B.x);

// Prepare the canvas
// Init the canvas
const canvas = document.getElementById("rdpCan");
const ctx = canvas.getContext("2d");


// This is the center of the canvas
const offset = xyItem(canvas.width / 2, canvas.height / 2);

// Move to the center
ctx.translate(offset.x, offset.y);


// *** Helpers *** 
const renderCanvas = (ctx) => {
    // Clear the canvas
    ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);

    // Draw marks
    drawCS(ctx, offset);
   
    // Calculate sin cos and tangent
    const sin = Math.sin(theta);
    const cos = Math.cos(theta);
    const tangent = Math.tan(theta);


    // T tangent
    const T = {
        x: Math.hypot(1, tangent) * c,
        y: 0
    };
    
    // Draw info to the canvas. The values for sin cos and tangent
    drawText(ctx,
        "sin = a/c = " + sin.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.7 },
        "green"
    )

    drawText(ctx,
        "cos = b/c = " + cos.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.8 },
        "red"
    )

    drawText(ctx,
        "tan = a/b = " + tangent.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.9 },
        "teal"
    )

    drawText(ctx,
        "Theta - Radiant:" + theta.toFixed(2) + " Degree: " + String(toDeg(theta)).padStart(2, " ") + "°",
        { x: offset.x / 2, y: offset.y * 0.7 },
        "magenta"
    )

    // Draw the points of the triangle
    // drawPoint(ctx, A);
    // drawText(ctx, "A", A);
    // drawPoint(ctx, B);
    // drawText(ctx, "B", B);
    // drawPoint(ctx, C);
    // drawText(ctx, "C", C);

    // Draw the middle of the canvas
    drawText(ctx, "θ", A, "pink");

    A = xyItem();
    B = xyItem( Math.cos(theta) * c, Math.sin(theta) * c );
    C = xyItem(B.x);

    // Draw lines between points, color them as RGB
    drawLine(ctx, B, C, "red");
    drawLine(ctx, C, A, "green");
    drawLine(ctx, A, B, "blue");
    drawLine(ctx, B, T, "magenta");
    drawText(ctx, "Hypotenuse:" + c.toFixed(1), average(A, B), "blue");
    

    // Style "arc"
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    // Draw arc 
    // ctx.arc(0, 0, 50, 0, theta);
    ctx.arc(0, 0, c, 0, theta);
    ctx.stroke();

};
 

// *** Events *** 
 // Redraw the canvas on mouse move
let pos = 0;
document.onscroll = (event) => { 
    const scrollY = window.scrollY.toFixed(0);

    theta -=  scrollY > pos ? - 0.025 : 0.025;
    pos = scrollY;

    if (scrollY < 5 || scrollY > 15000) {
        scrollTo(0, 5000);
    }
    document.getElementById("thetaInput").value = String(theta.toFixed(2));
    renderCanvas(ctx);
};

// Allow for input from keyboard for theta
document.getElementById("thetaInput").onchange = (event) => {
    theta = Number(event.target.value);
    document.getElementById("thetaInput").value = String(theta.toFixed(2));
    renderCanvas(ctx);
};

// On start set the position down to 5000px
scrollTo(0, 5000);
// *** Start Drawing, render the canvas on load, before any mouse move event
renderCanvas(ctx);
