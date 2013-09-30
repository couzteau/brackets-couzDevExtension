/*
 * Copyright (c) 2013 Jochen Hagenstroem. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, browser: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

define(function (require, exports, module) {
    'use strict';


    // Brackets modules
    var ProjectManager          = brackets.getModule("project/ProjectManager"),
        ExtensionUtils          = brackets.getModule("utils/ExtensionUtils"),
        FileUtils               = brackets.getModule("file/FileUtils"),
        NativeFileSystem        = brackets.getModule("file/NativeFileSystem").NativeFileSystem,
        Menus                   = brackets.getModule("command/Menus"),
        CommandManager          = brackets.getModule("command/CommandManager"),
        Commands                = brackets.getModule("command/Commands"),
        DocumentManager         = brackets.getModule("document/DocumentManager"),
        EditorManager           = brackets.getModule("editor/EditorManager");
    
    var EDITOR_MANAGER_EXAMPLES = "editorManagerExamples",
        OPEN_IMAGE              = "openImage",
        GET_DOCUMENT_FOR_PATH   = "getDocumentForPath";
    
    function _editorManagerExamples(event) {
        var activeEditor = EditorManager.getActiveEditor(),
            activeDoc = activeEditor && activeEditor.document,
            doc;
        
        var editor = EditorManager.getFocusedEditor();
        if (editor) {
            doc = editor.document;
        }
        
        editor = EditorManager.getActiveEditor();
        if (editor) {
            doc = editor.document;
        }
        
        editor = EditorManager.getCurrentFullEditor();
        if (editor) {
            doc = editor.document;
        }
    }
    
    function _getDocumentForPath() {
        var fullPath = ExtensionUtils.getModulePath(module) + "img/playbot.png";
        DocumentManager.getDocumentForPath(fullPath)
            .done(function (doc) {
                console.log("Dot doc for path " + fullPath);
            })
            .fail(function (fileError) {
                EditorManager.focusEditor();
                FileUtils.showFileOpenError(fileError.name, fullPath);
            });
    }
    
    function _openImage() {
        var fullPath = ExtensionUtils.getModulePath(module) + "img/playbot.png";
        CommandManager.execute(Commands.FILE_OPEN, { fullPath: fullPath });
    }
    
    var buildMenu = function (m) {
        m.addMenuDivider();
        m.addMenuItem(EDITOR_MANAGER_EXAMPLES);
        m.addMenuItem(GET_DOCUMENT_FOR_PATH);
        m.addMenuItem(OPEN_IMAGE);
    };
    
    function _onCurrentDocumentChange() {
        var doc = DocumentManager.getCurrentDocument();
        if (doc) { // make sure to check for null
            var x = 1;
        }
       // even better use example above 
    }

    
    CommandManager.register("EditorManager Examples", EDITOR_MANAGER_EXAMPLES, _editorManagerExamples);
    CommandManager.register("getDocumentforPath Example", GET_DOCUMENT_FOR_PATH, _getDocumentForPath);
    CommandManager.register("Open image", OPEN_IMAGE, _openImage);
    
    
    
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    buildMenu(menu);

    // -----------------------------------------
    // Init
    // -----------------------------------------
    function init() {
//        ExtensionUtils.loadStyleSheet(module, "styles.css");
//        var $ProjectManager = $(ProjectManager);
//        $ProjectManager.on("projectOpen", _projectOpen);
//        window.addEventListener("focus", _projectOpen);
        

        $(DocumentManager).on("currentDocumentChange", _onCurrentDocumentChange);
        

    }
    
    init();
    
});
