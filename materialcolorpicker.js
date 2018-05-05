
/**
 * A javascript color picker inspired by material design color choice
 * @version 1.0.0
 * @requires: jQuery, data-attribute
 * @author https://github.com/masbaehr
 * @constructor
 */
function MaterialColorPickerJS(inputElement) {

    //CSS styles - avoid creation of a separate file for this minor css, so we can modify everything related to the picker in this file
    var containerStyle = "display: none; text-align: left; position: absolute; background: #444444; border: 1px solid #444444; z-index: 9999; max-width: 250px; padding-left: 2px; font-family: Lucida Console; padding-top: 2px;";
    var colorStyle = "cursor: pointer; display: inline-block; width: 6.6%; line-height: 100%; box-sizing: border-box;";

    var _this = this;
    this.inputElement = inputElement;
    //create the container if not initialized
    if($(inputElement).data("init") === true){
        return;
    }
    //create a containerelement
    $("<div style='" + containerStyle + "'>").insertAfter(inputElement);
    var currentContainer = $(inputElement).next();
    //build the color map inspired by: https://material.io/guidelines/style/color.html
    var materialIoCols = ['#F44336', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744', '#D50000', '#E91E63', '#FCE4EC', '#F8BBD0', '#F48FB1', '#F06292', '#EC407A', '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F', '#FF80AB', '#FF4081', '#F50057', '#C51162', '#9C27B0', '#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#D500F9', '#AA00FF', '#673AB7', '#EDE7F6', '#D1C4E9', '#B39DDB', '#9575CD', '#7E57C2', '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92', '#B388FF', '#7C4DFF', '#651FFF', '#6200EA', '#3F51B5', '#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E', '#8C9EFF', '#536DFE', '#3D5AFE', '#304FFE', '#2196F3', '#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#2979FF', '#2962FF', '#03A9F4', '#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B', '#80D8FF', '#40C4FF', '#00B0FF', '#0091EA', '#00BCD4', '#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064', '#84FFFF', '#18FFFF', '#00E5FF', '#00B8D4', '#009688', '#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40', '#A7FFEB', '#64FFDA', '#1DE9B6', '#00BFA5', '#4CAF50', '#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#B9F6CA', '#69F0AE', '#00E676', '#00C853', '#8BC34A', '#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#CCFF90', '#B2FF59', '#76FF03', '#64DD17', '#CDDC39', '#F9FBE7', '#F0F4C3', '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717', '#F4FF81', '#EEFF41', '#C6FF00', '#AEEA00', '#FFEB3B', '#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFEA00', '#FFD600', '#FFC107', '#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F', '#FFCA28', '#FFC107', '#FFB300', '#FFA000', '#FF8F00', '#FF6F00', '#FFE57F', '#FFD740', '#FFC400', '#FFAB00', '#FF9800', '#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100', '#FFD180', '#FFAB40', '#FF9100', '#FF6D00', '#FF5722', '#FBE9E7', '#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043', '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C', '#FF9E80', '#FF6E40', '#FF3D00', '#DD2C00', '#795548', '#EFEBE9', '#D7CCC8', '#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723', '#9E9E9E', '#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#212121', '#607D8B', '#ECEFF1', '#CFD8DC', '#B0BEC5', '#90A4AE', '#78909C', '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238', '#000000', '#FFFFFF'];
    $(materialIoCols).each(function(index, el) {
        currentContainer.append("<div title='"+el+"' data-color='" + el + "' style='background: " + el + ";" +colorStyle + "'>&nbsp;</div>");
        currentContainer.children().last().on("click", function(event){
            inputElement.value = $(event.currentTarget).data("color");
            $(inputElement).attr("value", $(event.currentTarget).data("color"));
            $(inputElement).css("background", $(event.currentTarget).data("color"));
            $(inputElement).css("color", _this.invertColor($(event.currentTarget).data("color"), true));
            $(inputElement).trigger("change");
            $(currentContainer).fadeOut();
            _this.fillHSBInput(inputElement.value);
            _this.fillRGBInput(inputElement.value);
        });
    });

    var validateRGBHSVInput = function(event){
        var isNumber = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);
        var isDot = event.keyCode === 190;
        var isControl = event.keyCode === 8 || (event.keyCode >= 37 && event.keyCode <= 40) || event.keyCode === 46 || event.keyCode === 9 || event.keyCode === 17;
        if(event.keyCode === 13) {
            $(currentContainer).fadeOut();
            event.preventDefault();
            return false;
        }
        if (!isNumber && !isControl && !isDot) {
            event.preventDefault();
        }
    };

    currentContainer.append("<br>");
    var manualInputTemplate = "<div style='background: white; margin: 2px; width: 30%; display: inline-block; border: 1px solid gray;'><div style='display: inline-block; margin-right: 3px; margin-left: 3px;'>#</div><input data-composite='#' style='width: calc(100% - 17px); border: none; text-align: right;'></div>";

    //HSV-Input
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "H"));
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "S"));
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "V"));
    currentContainer.find("input").on("keydown", validateRGBHSVInput);
    currentContainer.find("input").on("keyup", function(event){
        _this.validateHSB(event.currentTarget);
    });
    currentContainer.find("input").on("blur", function(event){
        _this.commitHSV();
        if($(currentContainer).data("bluractive")){
            $(currentContainer).fadeOut();
        }
    });
    //RGB-Input
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "R"));
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "G"));
    currentContainer.append(_this.replaceAll(manualInputTemplate, "#", "B"));
    currentContainer.find("input").on("keydown", validateRGBHSVInput);
    currentContainer.find("input").on("keyup", function(event){
        _this.validateRGB(event.currentTarget);
    });
    currentContainer.find("input").on("blur", function(event){
        _this.commitRGB();
        if($(currentContainer).data("bluractive")){
            $(currentContainer).fadeOut();
        }
    });

    //set the initial color
    $(inputElement).css("background", $(inputElement).val());
    $(inputElement).css("color", _this.invertColor($(inputElement).val(), true));
    $(inputElement).css("width", "80px");
    $(inputElement).css("text-transform", "uppercase");
    //track if mouse cursor is on the picker to decide if the blur event is active or not
    $(currentContainer).data("bluractive", true);
    $(currentContainer).on("mouseenter", function(e){
        $(currentContainer).data("bluractive", false);
    });
    $(currentContainer).on("mouseleave", function(e){
        $(currentContainer).data("bluractive", true);
    });
    //set the js event handler for focus and blur on the input element of the picker
    $(inputElement).on("focus", function(e){
        $(currentContainer).fadeIn();
        _this.fillHSBInput(inputElement.value);
        _this.fillRGBInput(inputElement.value);
    });
    $(inputElement).on("blur", function(e){
       if($(currentContainer).data("bluractive")){
           $(currentContainer).fadeOut();
       }
    });
    $(inputElement).on("keyup", function(e){
        var isOk  = /^#[0-9A-F]{6}$/i.test(inputElement.value);
        if(isOk){
            $(inputElement).css("background", inputElement.value);
            $(inputElement).css("color", _this.invertColor(inputElement.value, true));
        }
    });

    this.fillHSBInput(inputElement.value);
    this.fillRGBInput(inputElement.value);

    //set init flag, so the picker will not be initialized again after ajax update
    $(inputElement).data("init", true);
}

MaterialColorPickerJS.prototype.replaceAll = function(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);   
};

MaterialColorPickerJS.prototype.validateHSB = function(target) {
    var container = $(this.inputElement).next();
    var hsbtype = $(target).data("composite");
    var value = $(target).val();
    var invalid = false;
    if(hsbtype === 'H' && (isNaN(value) || value < 0 || value > 360)){
        $(target).parent().css("border", "1px solid red");
        invalid = true;
    }
    if((hsbtype === 'S' || hsbtype === 'V') && (isNaN(value) || value < 0 || value > 100)){
        $(target).parent().css("border", "1px solid red");
        invalid = true;
    }
    if(!invalid){
        $(target).parent().css("border", "1px solid gray");
    }
};
MaterialColorPickerJS.prototype.validateRGB = function(target) {
    var container = $(this.inputElement).next();
    var value = $(target).val();
    if(isNaN(value) || value < 0 || value > 255){
        $(target).parent().css("border", "1px solid red");
    } else {
        $(target).parent().css("border", "1px solid gray");
    }
    //TODO: Do not just colorize the border, instead do not accept invalids
};

MaterialColorPickerJS.prototype.commitRGB = function() {
    var container = $(this.inputElement).next();
    var input_r = container.find("input[data-composite='R']").val();
    var input_g = container.find("input[data-composite='G']").val();
    var input_b = container.find("input[data-composite='B']").val();
    var hexColor = this.rgbToHex(parseInt(input_r), parseInt(input_g), parseInt(input_b));
    this.commitHEX(hexColor);
};
MaterialColorPickerJS.prototype.commitHSV = function() {
    var container = $(this.inputElement).next();
    var input_H = container.find("input[data-composite='H']").val();
    var input_S = container.find("input[data-composite='S']").val();
    var input_V = container.find("input[data-composite='V']").val();
    var rgbCol = this.hsvToRgb(input_H, input_S, input_V, true);
    this.commitHEX(this.rgbToHex(rgbCol.r, rgbCol.g, rgbCol.b));
};
MaterialColorPickerJS.prototype.commitHEX = function(hexColor) {
    if (hexColor.length !== 7) {
        throw new Error('Invalid #RRGGBB color.');
    }
    this.inputElement.value = hexColor;
    $(this.inputElement).attr("value", hexColor);
    $(this.inputElement).css("background", hexColor);
    $(this.inputElement).css("color", this.invertColor(hexColor, true));
    $(this.inputElement).trigger("change");
    this.fillHSBInput(hexColor);
    this.fillRGBInput(hexColor);
};

MaterialColorPickerJS.prototype.componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};
MaterialColorPickerJS.prototype.hsvToRgb = function(h, s, v, degrees) {
    //use degrees
    if(degrees) {
        h = h / 360;
        s = s / 100;
        v = v / 100;
    }
    //remove this line to use values 0.0 - 1.0
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};
MaterialColorPickerJS.prototype.rgbToHex = function(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
};

MaterialColorPickerJS.prototype.rgbToHsv = function(r, g, b, degrees) {
    r /= 255; g /= 255; b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;
    var d = max - min;
    s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    if(degrees === true){
        return [ parseFloat(h*360).toFixed(2), parseFloat(s*100).toFixed(2), parseFloat(v*100).toFixed(2) ];
    } else{
        return [ parseFloat(h).toFixed(2), parseFloat(s).toFixed(2), parseFloat(v).toFixed(2) ];
    }
};

MaterialColorPickerJS.prototype.hexToRgb = function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

MaterialColorPickerJS.prototype.fillHSBInput = function(hexColor) {
    var container = $(this.inputElement).next();
    var rgbv = this.hexToRgb(hexColor);
    var hsv = this.rgbToHsv(rgbv.r, rgbv.g, rgbv.b, true);
    var input_r = container.find("input[data-composite='H']").val(hsv[0]);
    var input_g = container.find("input[data-composite='S']").val(hsv[1]);
    var input_b = container.find("input[data-composite='V']").val(hsv[2]);
};
MaterialColorPickerJS.prototype.fillRGBInput = function(hexColor) {
    var container = $(this.inputElement).next();
    var rgbv = this.hexToRgb(hexColor);
    var input_r = container.find("input[data-composite='R']").val(rgbv.r);
    var input_g = container.find("input[data-composite='G']").val(rgbv.g);
    var input_b = container.find("input[data-composite='B']").val(rgbv.b);
};

/* More about this here: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color */
MaterialColorPickerJS.prototype.invertColor = function(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
};
MaterialColorPickerJS.prototype.padZero = function(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
};