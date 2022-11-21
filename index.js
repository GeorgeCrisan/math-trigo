// Helper X Y item factory
const xyItem = (x = 0, y = 0) => ({ x, y });

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

// Redraw canvas 

const renderCanvas = (ctx) => {
    // Clear the canvas
    ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);

    // Draw marks
    drawCS(ctx, offset);

    // Draw the points of the triangle
    drawPoint(ctx, A);
    drawText(ctx, "A", A);
    drawPoint(ctx, B);
    drawText(ctx, "B", B);
    drawPoint(ctx, C);
    drawText(ctx, "C", C);
};


// Draw Coordinates System

const drawCS = (ctx, offset) => {
    // Create marks
    ctx.beginPath();
    ctx.moveTo(0, - offset.y);
    ctx.lineTo(0, ctx.canvas.height - offset.y);
    ctx.moveTo(- offset.x, 0);
    ctx.lineTo(ctx.canvas.width - offset.x, 0);
    ctx.setLineDash([3, 5]);
    ctx.lineWidth = 1;
    ctx.stokeStyle = "555";
    ctx.stroke();
    // Reset line dash
    ctx.setLineDash([]);
}


// Create a point
const drawPoint = (ctx, location, size = 20, color = "black") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(location.x, location.y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Write text 
const drawText = (ctx, text = "N", location, color = "white") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(text, location.x, location.y);
};

// *** Events *** 

document.onmousemove = (event) => {
    // Move x and y
    B.x = event.x - offset.x;
    B.y = event.y - offset.y;

    // C follow B.x
    C.x = B.x;

    // A is static
    // Re draw the canvas
    renderCanvas(ctx);
}


// *** Start Drawing

renderCanvas(ctx);
