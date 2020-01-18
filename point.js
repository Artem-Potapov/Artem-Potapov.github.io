class Point{
    constructor(element) {
        this.element = element;
        this.is_open=false;
        this.name=this.element.children[0];
        this.content=this.element.children[1];
        this.prev_transform = '';

        this.init();
    }

    to_center(){
        var rect=this.element.getBoundingClientRect();
        this.prev_transform = this.element.style.transform;
        this.element.style.transform='translate('+ (-rect['width']/2)+'px, '+(-rect['height']/2)+'px) scale(' + 1/map.scale_factor +')';
    }

    open(){
        this.element.style.width='500px';
        this.element.style.height='max-content';
        this.element.style.background='#ddd';
        this.content.style.visibility='visible';
        this.element.style.filter='drop-shadow(0 0 15px rgb(0,0,0,0.7))';
        this.is_open=true;
        this.element.style.zIndex = '9999';
        this.hide_name();
        setTimeout(() => {this.to_center()}, 210);
    }

    show_name(){
        if(this.is_open === false) {
            this.name.style.visibility='visible';
        }
        
    }

    hide_name(){
        this.name.style.visibility='hidden';
    }

    close(){
        this.element.style.transform = this.prev_transform;
        this.element.style.background='';
        this.element.style.width='15px';
        this.element.style.height='15px';
        this.content.style.visibility='hidden';
        this.element.style.zIndex = '';
        this.is_open=false;
    }

    init() {
        this.element.onclick = () => {
            if (this.is_open) {
                this.close()
            } else {
                this.open()
            }
        }
        this.element.onmouseover = () => {this.show_name()}
        this.element.onmouseleave = () => {this.hide_name()}
    }
}

class AddControl {
    constructor() {
        this.element = document.querySelector('.control-add');
        this.is_open = false;
        this.button = this.element.querySelector('.button');
        this.form = this.element.querySelector('.add-form')
        this.point_button = this.element.querySelector('.button-point') 

        this.button.onclick = (e) => {this.click_button()}
        this.point_button.onclick = (e) => {this.click_point_button()}
    }

    render(left, top) {
        var class_name = cyrillicToTranslit({preset : "ru"}).transform(this.form.name.value,'-');
        var type_class = this.form.type.value;
        return '<div class="point '+type_class+' '+class_name+'" style="left: '+left+'px; top: '+top+'px">\n<div class="name">'+this.form.name.value+'</div>\n<div class="content">\n<h1>'+this.form.name.value+'</h1>\n<div class="description">'+this.form.description.value+'</div>\n<img  class="image" src="'+this.form.link.value+'" alt="">\n</div>\n</div>';
    }

    click_button() {
        if (this.is_open) {
            this.close();
            this.is_open = false;
        } else {
            this.open();
            this.is_open = true;
        }
    }

    open() {
        this.element.className = "control-add open";
        this.form.className = "add-form open";
        this.button.className = "button open";
    }

    close() {
        this.element.className = "control-add closed";
        this.form.className = "add-form closed";
        this.button.className = "button closed";
    }

    click_point_button() {
        map.element.innerHTML += '\n\n' + this.render(0,0);
        set_points();
        map.reset_points();
        map.element.style.cursor = 'crosshair';
        var point = points.slice(-1)[0];
        document.onclick = (e) => {
            if (e.target === map.element) {
                point.element.style.left = e.offsetX + 'px';
                point.element.style.top = e.offsetY + 'px';
                document.onmousemove = null;
                document.onclick = null;
                map.element.style.cursor = 'grab';
                this.form.reset();
            }
        }
    }
}

function print_points() {
    clear_points();
    s = '';
    for (var i=0; i < points.length; i++){
        if (points[i] != undefined){
            points[i].element.style.transform = '';
            s += points[i].element.outerHTML + '\n\n';
        }
    }
    navigator.clipboard.writeText(s);
    return s;
}

document.oncopy = print_points;

function is_equial_points(p1, p2) {
    if (p1.element.className == p2.element.className) {
        return true;
    } else {
        return false;
    }
}

function clear_points() {
    for (var i=0; i < points.length; i++){
        if (points[i] != undefined) {
            for (var j=i+1; j < points.length; j++) {
                if (points[j] != undefined && is_equial_points(points[i], points[j]) ){
                    delete points[j];
                }
            }
        }
    }
    for (var i = 0; i < points.length; i++) {
        if (points[i] == undefined) {
            points.splice(i,1);
        }
    }
}

var points = []
var add_ctrl = new AddControl();
function set_points() {
    var query_points = document.querySelectorAll('.point');
    for (var i = 0; i < query_points.length; i++){
            points.push(new Point(query_points[i]))
            clear_points();
        }
}

set_points();