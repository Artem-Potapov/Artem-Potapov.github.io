import codecs
from transliterate import translit
TEMPLATE = '<div class="point {kind} {class_name}" style="left: {x}; top: {y}">\n<div class="name">{name}</div>\n<div class="content">\n<h1>{name}</h1>\n<div class="description">{description}</div>\n<img  class="image" src="{image_src}" alt="">\n</div>\n</div>'
class Record(object):
    def __init__(self, record):
        temp = record.split('***')
        self.kind = temp[0].replace('\r\n', '')
        self.name = temp[1].replace('\r\n', '')
        self.class_name = translit(self.name, 'ru', reversed=True).replace("'", '').replace(' ', '').lower()
        self.description = temp[2].replace('\r\n', '')
        self.image_src = temp[3].replace('\r\n', '')
        self.coord = temp[4].replace('\r\n', '').replace(' ', '').split(',')

    def render(self):
        return TEMPLATE.replace('{kind}', self.kind).replace('{name}', self.name).replace('{class_name}', self.class_name).replace('{description}', self.description).replace('{image_src}', self.image_src).replace('{x}', self.coord[0]).replace('{y}', self.coord[1])
    
def main():
    data = codecs.open('input', 'r', 'utf_8_sig').read().split('===')
    points = [Record(data[i]) for i in range(len(data))]
    points_rendered = [points[i].render() for i in range(len(points))]
    html_points = '\n\n'.join(points_rendered)
    template = codecs.open('index_template.html', 'r', 'utf_8_sig').read()
    f = codecs.open('rendered_index.html', 'w', 'utf_8_sig')
    f.write(template.replace('{points}', html_points))

main()
