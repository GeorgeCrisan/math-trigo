// Create a point
export const drawPoint = (ctx, location, size = 10, color = "black") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(location.x, location.y, size, 0, Math.PI * 2);
    ctx.fill();
}

export const toDeg =(rad) => Math.round(rad * 180 / Math.PI);

// Draw line
export const drawLine = (ctx, p1, p2, color = "black") => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}


// Write text 
export const drawText = (ctx, text = "N", location, color = "black") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "16px sans-serif";
    ctx.strokeStyle="white";
    ctx.lineWidth=7;
    ctx.strokeText(text, location.x, location.y);
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
    ctx.strokeStyle = "#555";
    ctx.stroke();
    // Reset line dash
    ctx.setLineDash([]);
}

// Helper X Y item factory
export const xyItem = (x = 0, y = 0) => ({ x, y });

export const average = (p1, p2) => ({
    x: ((p1.x + p2.x) / 2),
    y: ((p1.y + p2.y) / 2)
});

export const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
