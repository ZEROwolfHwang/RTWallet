import {Dimensions, StyleSheet} from "react-native";

export const    showModal=(dropdownHeight,touchBtn,boxStyle,callback)=> {
    if (touchBtn && touchBtn.measure) {
        touchBtn.measure((fx, fy, width, height, px, py) => {
            console.log(fx);
            console.log(fy);
            console.log(width);
            console.log(height);
            console.log(px);
            console.log(py);
            this._buttonFrame = {x: px, y: py, w: width, h: height};

            var boxStyleObj = StyleSheet.flatten(boxStyle);

            console.log(boxStyleObj);

            const dimensions = Dimensions.get('window');
            const windowWidth = dimensions.width;
            const windowHeight = dimensions.height;

            // const dropdownHeight = height;


            const bottomSpace = windowHeight - this._buttonFrame.y - this._buttonFrame.h;
            const rightSpace = windowWidth - this._buttonFrame.x;
            const showInBottom = bottomSpace >= dropdownHeight || bottomSpace >= this._buttonFrame.y;
            const showInLeft = rightSpace >= this._buttonFrame.x;

            const positionStyle = {
                height: dropdownHeight,
                top: showInBottom ? this._buttonFrame.y + this._buttonFrame.h : Math.max(0, this._buttonFrame.y - dropdownHeight),
            };

            if (showInLeft) {
                positionStyle.left = this._buttonFrame.x;

            } else {
                positionStyle.right = rightSpace - this._buttonFrame.w;
            }
            const dropdownWidth = boxStyleObj.width;
            if (dropdownWidth !== -1) {
                positionStyle.width = dropdownWidth;
            }

            callback(positionStyle);
        });
    }
}
