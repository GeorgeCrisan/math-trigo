import { xyItem, drawCS, drawText, drawLine, average, toDeg } from "./helpers";

let theta = Math.PI / 4;
let c = 100;

// Declare default points
// Have to be at the top to be reachable by other functions
const A = xyItem();
const B = xyItem( Math.cos(theta) * c, Math.sin(theta) * c );
const C = xyItem(B.x);

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
    
    // Draw info to the canvas. The values for sin cos and tangent
    drawText(ctx,
        "sin = a/c = " + sin.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.7 },
        "black"
    )

    drawText(ctx,
        "cos = b/c = " + cos.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.8 },
        "magenta"
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

    // Draw lines between points, color them as RGB
    drawLine(ctx, B, C, "red");
    drawLine(ctx, C, A, "green");
    drawLine(ctx, A, B, "blue");
    drawText(ctx, "c:" + c.toFixed(1), average(A, B), "blue");
    

    // Style "arc"
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    
    // calculate the "arc" logic
    const start = B.x > A.x ? 0 : Math.PI;
    const cw = B.y < C.y ^ B.x > A.x;
    let end = B.y < C.y ? - theta : theta;

    if (B.x < A.x) {
      end = Math.PI - end;
    }

    // Draw arc 
    ctx.arc(0, 0, 50, start, end, !cw);
    ctx.stroke();

};
 

// *** Events *** 
 // Redraw the canvas on mouse move
let pos = 0;
document.onscroll = (event) => { 
    const current = window.scrollY.toFixed(0);
    theta -=  current > pos ? - 0.1 : 0.1;
    pos = current;
    console.log("aaa");
    renderCanvas(ctx);
};

// *** Start Drawing, render the canvas on load, before any mouse move event
renderCanvas(ctx);
