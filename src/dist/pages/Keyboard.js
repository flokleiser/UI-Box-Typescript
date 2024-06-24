"use strict";
//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Keyboard;
const react_1 = __importStar(require("react"));
function Keyboard() {
    const [position, setPosition] = (0, react_1.useState)({ x: 50, y: 50 });
    (0, react_1.useEffect)(() => {
        const canvasKeyboard = document.querySelector("#canvasKeyboard");
        const ctx = canvasKeyboard.getContext("2d", { willReadFrequently: true });
        const mouse = { x: 0, y: 0 };
        // const radius = 100;
        const radius = 75;
        let isDragging = false;
        let maxDistance = 80;
        let isMovingKeys = false;
        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = ww / 2;
        let centerY = wh / 2;
        let circleX = centerX;
        let circleY = centerY;
        let vx = 0;
        let vy = 0;
        const damping = 0.8;
        const stiffness = 0.05;
        const color = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'black';
        const onMouseMove = (e) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                const dx = mouse.x - centerX;
                const dy = mouse.y - centerY;
                const dist = Math.hypot(dx, dy);
                // circleX = mouse.x;
                // circleY = mouse.y;
                if (dist <= maxDistance) {
                    circleX = mouse.x;
                    circleY = mouse.y;
                }
                else {
                    const angle = Math.atan2(dy, dx);
                    circleX = centerX + maxDistance * Math.cos(angle);
                    circleY = centerY + maxDistance * Math.sin(angle);
                }
            }
        };
        const onTouchMove = (e) => {
            if (e.touches.length > 0 && isDragging) {
                // circleX = mouse.x;
                // circleY = mouse.y;
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
                const dx = mouse.x - centerX;
                const dy = mouse.y - centerY;
                const dist = Math.hypot(dx, dy);
                if (dist <= maxDistance) {
                    circleX = mouse.x;
                    circleY = mouse.y;
                }
                else {
                    const angle = Math.atan2(dy, dx);
                    circleX = centerX + maxDistance * Math.cos(angle);
                    circleY = centerY + maxDistance * Math.sin(angle);
                }
            }
        };
        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
        };
        const onMouseDown = (e) => {
            const dist = Math.hypot(e.clientX - circleX, e.clientY - circleY);
            if (dist < radius) {
                isDragging = true;
            }
        };
        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
        };
        const handleKeyDown = (event) => {
            isMovingKeys = true;
            const { key } = event;
            if (key === 'w') {
                circleY -= 20;
            }
            else if (key === 'a') {
                circleX -= 20;
            }
            else if (key === 's') {
                circleY += 20;
            }
            else if (key === 'd') {
                circleX += 20;
            }
        };
        const handleKeyUp = (event) => {
            isMovingKeys = false;
            const { key } = event;
            if (['w', 'a', 's', 'd'].includes(key)) {
                console.log('reset key');
            }
        };
        const initscene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
            render();
        };
        const resizeScene = () => {
            ww = canvasKeyboard.width = window.innerWidth;
            wh = canvasKeyboard.height = window.innerHeight;
            centerX = ww / 2;
            centerY = wh / 2;
            circleX = centerX;
            circleY = centerY;
            vx = 0;
            vy = 0;
        };
        let animationFrameId;
        const render = () => {
            const distToCenter = Math.hypot(circleX - centerX, circleY - centerY);
            if (!isDragging && !isMovingKeys) {
                const dx = centerX - circleX;
                const dy = centerY - circleY;
                const ax = dx * stiffness;
                const ay = dy * stiffness;
                vx += ax;
                vy += ay;
                vx *= damping;
                vy *= damping;
                circleX += vx;
                circleY += vy;
            }
            // if (distToCenter > maxDistance) {
            //     const angle = Math.atan2(circleY - centerY, circleX - centerX);
            //     circleX = centerX + maxDistance * Math.cos(angle);
            //     circleY = centerY + maxDistance * Math.sin(angle);
            // }
            else {
                vx = 0;
                vy = 0;
            }
            ctx.clearRect(0, 0, canvasKeyboard.width, canvasKeyboard.height);
            //tether
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(circleX, circleY);
            ctx.stroke();
            //ball
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
            ctx.fill();
            //big circle
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, maxDistance + radius, 0, Math.PI * 2);
            ctx.stroke(),
                animationFrameId = requestAnimationFrame(render);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener("resize", resizeScene);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.addEventListener('keydown', handleKeyDown);
            window.removeEventListener("resize", resizeScene);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Keyboard"),
        react_1.default.createElement("canvas", { style: {
                width: '100vw',
                height: '100vh',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                zIndex: -10
            }, id: "canvasKeyboard" })));
}
