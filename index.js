import { xyItem, drawCS, drawText, drawLine, average, distance, toDeg } from "./helpers";

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
   
    // Calculate sin cos and tangent
    const sin = a / c;
    const cos = b / c;
    const tangent = a / b;

    const theta = Math.asin(sin);

    
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
        "brown"
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
    drawText(ctx, "a:" + a.toFixed(1), average(B, C), "red");
    drawLine(ctx, C, A, "green");
    drawText(ctx, "b:" + b.toFixed(1), average(C, A), "green");
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
document.onmousemove = (event) => {
    // Move x and y
    B.x = event.x - offset.x;
    B.y = event.y - offset.y;

    // C follow B.x
    C.x = B.x;

    // A is static, point 0 (center)
    renderCanvas(ctx);
}

// *** Start Drawing, render the canvas on load, before any mouse move event
renderCanvas(ctx);
