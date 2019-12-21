class Point{
    constructor(element) {
        this.element = element;
        this.is_open=false;
        this.name=this.element.children[0];
        this.content=this.element.children[1];

        this.init();
    }

    to_center(){
        var rect=this.element.getBoundingClientRect();
        this.element.style.transform='translate('+ (-rect['width']/2)+'px, '+(-rect['height']/2)+'px)'
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
        this.element.style.transform='';
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

var points = []
var points_elements = document.getElementsByClassName('point');
for (var i = 0; i < points_elements.length; i++){
    points.push(new Point(points_elements[i]))
}