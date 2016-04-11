var clipboardDemos = new Clipboard('.btn');

function showTooltip(elem, msg) {
//    elem.setAttribute('class', 'btn tooltipped tooltipped-s');
//    elem.setAttribute('aria-label', msg);
   elem.setAttribute('data-placement', 'left');
   elem.setAttribute('data-toggle', 'popover');
   elem.setAttribute('data-trigger', 'focus');
   elem.setAttribute('data-content', msg);
}

clipboardDemos.on('success', function(e) {
    e.clearSelection();
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    showTooltip(e.trigger, 'Copied!');
});

clipboardDemos.on('error', function(e) {
    // console.error('Action:', e.action);
    // console.error('Trigger:', e.trigger);
    showTooltip(e.trigger, 'Press Ctrl+C');
});
