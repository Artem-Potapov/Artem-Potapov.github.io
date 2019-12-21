class Map{
    constructor(){
        this.element=document.getElementsByClassName('map')[0];
        this.position_y = 0;
        this.position_x = 0;

        this.element.onmousedown = (event) => {this.mousedown(event)};
    }

    mousedown(event){
        var start_y = event.pageY;
        var start_x = event.pageX;
        console.log(event.offsetX);
        console.log(event.offsetY);
        this.element.style.cursor= 'grabbing';
        document.onmousemove = (event) => {
            var dy = event.pageY - start_y + this.position_y;
            var dx = event.pageX - start_x + this.position_x;
            this.element.style.transform ='translateX('+dx+'px) translateY(' +dy + 'px)';
        }
        document.onmouseup = (event) => {
            this.element.style.cursor= '';
            document.onmousemove = null;
            var dy = event.pageY - start_y;
            var dx = event.pageX - start_x;
            this.position_y += dy;
            this.position_x += dx;
            this.back(event);
        }
    }

    back(event){
        this.element.style.transition = 'transform 0.5s';
        // if(this.position_y > 0){
        //     this.element.style.transform = '';
        //     this.position_y = 0;
        // }

        if(this.position_x < (window.innerWidth - this.element.getBoundingClientRect().width)){
            var style = this.element.style.transform.split(' ');
            if(style.length>1) {
                var y = style[1];
            } else {
                var y = style[0];
            }
            this.element.style.transform = 'translateX('+(window.innerWidth - this.element.getBoundingClientRect().width )+'px)'+y;
            this.position_x = window.innerWidth - this.element.getBoundingClientRect().width;
        }

        if(this.position_x > 0){
            var style = this.element.style.transform.split(' ');
            if ( style.length > 1) {
                this.element.style.transform = style[1];
            } else {
                this.element.style.transform = '';
            }
            
            this.position_x = 0;
        }

        //if(this.position_y < (window.innerHeight - this.element.getBoundingClientRect().height)){
        //     this.element.style.transform = this.element.style.transform.split(' ')[0]+' translateY(' + (window.innerHeight - this.element.getBoundingClientRect().height) + 'px)';
        //     this.position_y = (window.innerHeight - this.element.getBoundingClientRect().height);
       // }

        setTimeout(()=>{this.element.style.transition = '';}, 550);
    }
}

var map = new Map();