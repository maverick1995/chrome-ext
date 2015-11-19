/*

Siesta 2.0.5
Copyright(c) 2009-2013 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
 @class Siesta.Recorder.TargetExtractor.Recognizer.BoundList
 *
 * A class recognizing the Ext JS BoundList
 **/
Class('Siesta.Recorder.TargetExtractor.Recognizer.BoundList', {

    methods : {
        recognize : function (node) {
            if (!node.className.match(/\bx-boundlist-item\b/)) {
                return;
            }

            // todo, should we check for user specific classes too and how to prioritize in this case?
            return [
                ['.x-boundlist-item:contains(' + node.innerHTML + ')']
            ];
        }
    }
});
