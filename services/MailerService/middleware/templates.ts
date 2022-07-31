import fs from 'fs';
import path from 'path';

export const getHtmlTemplate = async (name: string, array: Array<any>) => {
    let _html = fs.readFileSync(path.resolve(__dirname, `../templates/${name}.html`), {
        encoding: 'utf8',
        flag: 'r+',
    });

    if (array && array.length > 0) {
        array.forEach(function (item, index) {
            _html = _html.replaceAll(item.from, item.to);
        });
    }

    return _html;
};
