// brfs doesn't work with ES6 import syntax
// https://github.com/substack/brfs/issues/39
const fs = require('fs');
const btnTemplate = fs.readFileSync('src/btn-template.html', 'utf8');

export function addBtnToToolbars() {
    $('.toolbar-group:last-child').append(btnTemplate);
}

export function onPartialRender(cb) {
    $(document).on('pjax:success', cb);
}

export function onGiphyBtnClick(cb) {
    $(document).on('click', '.js-giphy-btn', ({ currentTarget: el }) => (
        cb({
            form: el.closest('form'),
            button: el,
            input: el.closest('form').querySelector('textarea')
        })
    ));
}

export function getAuthenticityToken() {
    return $('input[name="authenticity_token"]').val();
}

export function getPreviewUri() {
    return $('.js-previewable-comment-form')
        .attr('data-preview-url');
}

export function insertTextAtCursor(textarea, text) {
    const pos = textarea.selectionStart;
    const currentVal = textarea.value;
    const before = currentVal.substring(0, pos);
    const after = currentVal.substring(pos);
    textarea.value = `${before}${text}${after}`;
    $(textarea).change(); // compatibility with OctoPreview
}
