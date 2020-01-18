import codecs
import clipboard
import tkinter

def render():
    data = clipboard.paste()
    template = codecs.open('index_template.html', 'r', 'utf_8_sig').read()
    f = codecs.open('rendered_index.html', 'w', 'utf_8_sig')
    f.write(template.replace('{points}', data))
    f.close()


root = tkinter.Tk()
btn = tkinter.Button(text='Render', command=render)
btn.pack()

root.mainloop()
