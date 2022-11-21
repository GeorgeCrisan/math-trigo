// Create a point
export const drawPoint = (ctx, location, size = 20, color = "black") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(location.x, location.y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Draw line
export const drawLine = (ctx, p1, p2, color = "green") => {
    ctx.beginPath();
    ctx.stokeStyle = color;
    ctx.lineWidth = 1;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

// Write text 
export const drawText = (ctx, text = "N", location, color = "white") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(text, location.x, location.y);
};

// Draw Coordinates System
export const drawCS = (ctx, offset) => {
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

// Helper X Y item factory
export const xyItem = (x = 0, y = 0) => ({ x, y });