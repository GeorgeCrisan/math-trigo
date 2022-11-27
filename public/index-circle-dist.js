/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "average": function() { return /* binding */ average; },
/* harmony export */   "distance": function() { return /* binding */ distance; },
/* harmony export */   "drawCS": function() { return /* binding */ drawCS; },
/* harmony export */   "drawLine": function() { return /* binding */ drawLine; },
/* harmony export */   "drawPoint": function() { return /* binding */ drawPoint; },
/* harmony export */   "drawText": function() { return /* binding */ drawText; },
/* harmony export */   "toDeg": function() { return /* binding */ toDeg; },
/* harmony export */   "xyItem": function() { return /* binding */ xyItem; }
/* harmony export */ });
// Create a point
const drawPoint = (ctx, location, size = 10, color = "black") => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(location.x, location.y, size, 0, Math.PI * 2);
    ctx.fill();
}

const toDeg =(rad) => Math.round(rad * 180 / Math.PI);

// Draw line
const drawLine = (ctx, p1, p2, color = "black") => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}


// Write text 
const drawText = (ctx, text = "N", location, color = "black") => {
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
const drawCS = (ctx, offset) => {
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
const xyItem = (x = 0, y = 0) => ({ x, y });

const average = (p1, p2) => ({
    x: ((p1.x + p2.x) / 2),
    y: ((p1.y + p2.y) / 2)
});

const distance = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


let theta = Math.PI / 4;
document.getElementById("thetaInput").value =  String(theta.toFixed(2));
let c = 200;

// Declare default points
// Have to be at the top to be reachable by other functions
let A = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)();
let B = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)( Math.cos(theta) * c, Math.sin(theta) * c );
let C = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)(B.x);

// Prepare the canvas
// Init the canvas
const canvas = document.getElementById("rdpCan");
const ctx = canvas.getContext("2d");


// This is the center of the canvas
const offset = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)(canvas.width / 2, canvas.height / 2);

// Move to the center
ctx.translate(offset.x, offset.y);


// *** Helpers *** 
const renderCanvas = (ctx) => {
    // Clear the canvas
    ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);

    // Draw marks
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawCS)(ctx, offset);
   
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
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx,
        "sin = a/c = " + sin.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.7 },
        "green"
    )

    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx,
        "cos = b/c = " + cos.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.8 },
        "red"
    )

    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx,
        "tan = a/b = " + tangent.toFixed(2),
        { x: - offset.x / 2, y: offset.y * 0.9 },
        "magenta"
    )

    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx,
        "Theta - Radiant:" + theta.toFixed(2) + " Degree: " + String((0,_helpers__WEBPACK_IMPORTED_MODULE_0__.toDeg)(theta)).padStart(2, " ") + "°",
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
    ;(0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx, "θ", A, "pink");

    A = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)();
    B = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)( Math.cos(theta) * c, Math.sin(theta) * c );
    C = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.xyItem)(B.x);

    // Draw lines between points, color them as RGB
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawLine)(ctx, B, C, "red");
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawLine)(ctx, C, A, "green");
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawLine)(ctx, A, B, "blue");
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawLine)(ctx, B, T, "magenta");
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.drawText)(ctx, "Hypotenuse:" + c, (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.average)(A, B), "blue");
    

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

document.getElementById("reset").onclick = (event) => {
    theta = 0.84;
    document.getElementById("thetaInput").value = theta;
    renderCanvas(ctx);
};

// On start set the position down to 5000px
scrollTo(0, 5000);
// *** Start Drawing, render the canvas on load, before any mouse move event
renderCanvas(ctx);


}();
/******/ })()
;
//# sourceMappingURL=index-circle-dist.js.map