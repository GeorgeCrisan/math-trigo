import { xyItem, drawPoint, drawCS, drawText, drawLine, average, distance } from "./helpers";

// Declare default points
// Have to be at the top to be reachable by other functions
const A = xyItem();
const B = xyItem(90, 120);
const C = xyItem(90);

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

    const a = distance(B, C);
    const b = distance(A, C);
    const c = distance(A, B);

    // Draw the points of the triangle
    drawPoint(ctx, A);
    drawText(ctx, "θ", A);
    // drawPoint(ctx, B);
    // drawText(ctx, "B", B);
    // drawPoint(ctx, C);
    // drawText(ctx, "C", C);

    // Draw lines between points
    drawLine(ctx, A, B);
    drawText(ctx, "c:" + c.toFixed(2), average(A, B),  "red");
    drawLine(ctx, B, C);
    drawText(ctx, "a:" + a.toFixed(2),  average(B, C), "green");
    drawLine(ctx, C, A);
    drawText(ctx, "b:" + b.toFixed(2),  average(C, A), "blue");
};


// *** Events *** 

document.onmousemove = (event) => {
    // Move x and y
    B.x = event.x - offset.x;
    B.y = event.y - offset.y;

    // C follow B.x
    C.x = B.x;

    // A is static, point 0 (center)
    // Redraw the canvas
    renderCanvas(ctx);
}


// *** Start Drawing

renderCanvas(ctx);
