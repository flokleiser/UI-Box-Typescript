"use strict";
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
exports.default = Switches;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
function Switches() {
    const switcherMotion = {
        active: {
            rotation: "0"
            // scale:1
        },
        inactive: {
            rotaton: 180,
            // scale:2,
            transition: { duration: 2 }
        }
    };
    // const controls = useAnimation();
    const [isSwitched, setSwitched] = (0, react_1.useState)(false);
    const [isSwitchedMotion, setSwitchedMotion] = (0, react_1.useState)(false);
    // const [isSwitchedVertical, setSwitchedVertical] = useState(false)
    // const [verticalPosition, setVerticalPosition] = useState<'top' | 'middle' | 'bottom'>('middle');
    const [verticalPosition, setVerticalPosition] = (0, react_1.useState)('middle');
    const [constraints, setConstraints] = (0, react_1.useState)({ top: 0, bottom: 0 });
    const controls = (0, framer_motion_1.useAnimation)();
    (0, react_1.useEffect)(() => {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch.getBoundingClientRect();
        setConstraints({ top: -rect.height / 2, bottom: rect.height / 2 });
    }, []);
    function handleSwitch() {
        setSwitched(!isSwitched);
    }
    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }
    function handleDragEnd(e, info) {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch.getBoundingClientRect();
        const dragY = info.point.y - rect.top;
        if (dragY < rect.height / 3) {
            setVerticalPosition('top');
            // controls.start({ top: "-150px" });
        }
        else if (dragY < (rect.height / 3) * 2) {
            setVerticalPosition('middle');
            // controls.start({ top: "0px" });
        }
        else {
            setVerticalPosition('bottom');
            // controls.start({ top: "150px" });
        }
    }
    // function handleSwitchVertical(e:React.MouseEvent) {
    //     const verticalSwitch = document.getElementById("verticalSwitch")
    //     const rect = verticalSwitch!.getBoundingClientRect()
    //     const clickY = e.clientY - rect.top
    //     if (clickY < rect.height/3) {
    //         setVerticalPosition('top')
    //     }
    //     else if (clickY < (rect.height/3) * 2) {
    //         setVerticalPosition('middle')
    //     }
    //     else {
    //         setVerticalPosition('bottom')
    //     }
    // }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, " Switches "),
        react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' } },
            react_1.default.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement("div", { className: 'switcherDiv', style: { backgroundColor: isSwitched ? "rgba(255, 255, 255, 0.5)" : "#333", transition: '0.3s' }, onMouseDown: handleSwitch },
                        react_1.default.createElement("div", { className: 'switcherCircle', style: { left: isSwitched ? "0px" : "100px", transition: '0.3s', backgroundColor: isSwitched ? "#333" : "rgba(255, 255, 255, 0.5)" } }))),
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 350 }, 
                        // style={{width:500}}
                        onMouseDown: handleSwitchMotion })),
                react_1.default.createElement("div", { className: 'centerContainer' },
                    react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherDiv', style: { width: 275 }, onMouseDown: handleSwitchMotion }))),
            react_1.default.createElement("div", { className: 'centerContainer' },
                react_1.default.createElement("div", { className: "switcherDivVertical" },
                    react_1.default.createElement(framer_motion_1.motion.div, { id: "verticalSwitch", className: 'switcherDivVerticalLine' },
                        react_1.default.createElement(framer_motion_1.motion.div, { className: 'switcherCircleVerticalOutline', 
                            // style={{
                            //     top: verticalPosition === 'top' ? "-150px" : verticalPosition === 'middle' ? "0px" : "150px", transition: '0.2s'
                            // }}
                            drag: "y", dragConstraints: constraints, dragElastic: 0, onDragEnd: handleDragEnd, animate: controls, style: { top: "0px", transition: '0.05s' } },
                            react_1.default.createElement("div", { className: 'switcherCircleVerticalFill' }))))))));
}
