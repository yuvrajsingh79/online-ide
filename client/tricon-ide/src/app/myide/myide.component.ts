
// code-editor.component.ts
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as ace from 'ace-builds';
// import webpack resolver to dynamically load modes & themes
import 'ace-builds/webpack-resolver';
// extensions
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LanguageTable, Language } from '../../modals/languages/languages';
import { ServerHandlerService } from '../../services';
import { HttpService } from '../../services';
import { languageModuleMap } from './consts/language-module-table';
import { themeModuleMap } from './consts/theme-module-table';
import {
  DEFAULT_INIT_EDITOR_OPTIONS,
  DEFAULT_SUPPORTED_EDITOR_THEMES,
  DEFAULT_RUN_ERROR_MESSAGE
} from './consts/default-options';

// const SILENCE_LOG = false;

const DEFAULT_INIT_CONTENT = '';
const DEFAULT_THEME = 'github';
const DEFAULT_LANG_MODE = 'nodejs';

@Component({
  selector: 'app-myide',
  templateUrl: './myide.component.html',
  styleUrls: ['./myide.component.css']
}) export class MyideComponent implements OnInit {

  // #region - class members
  public activatedTheme: string;
  // indicate if the initial languages api request failed or not.
  public cantReachServer = false;
  // options to init the editor with.
  public initEditorOptions = DEFAULT_INIT_EDITOR_OPTIONS;
  // array of the supported themes names.
  public supportedThemes = DEFAULT_SUPPORTED_EDITOR_THEMES;
  @ViewChild('languagesSelect', { static: true }) languagesSelect: ElementRef;
  @ViewChild('inputArea', { static: true }) inputArea: ElementRef;
  @ViewChild('myCheck', { static: true }) myCheck: ElementRef;
  // array of the supported languages, to simplify the usage in the component code
  private languagesArray: Language[] = [];
  // observable of the supported languages.
  public languagesArray$: Observable<[Language[]]>;
  // observable of the run request output.
  // public output$: Observable<string>;
  public output$: any = "";
  // ace editor object.
  private codeEditor: ace.Ace.Editor;
  // reference to beautify extension.
  private editorBeautify;
  // the div element on which ace editor will ride on.
  @ViewChild('codeEditor', { static: true }) codeEditorElmRef: ElementRef;
  // injected init options for this editor component.
  @Input() initOptions: { languageMode?: string; theme?: string; content?: string; } = {};
  // currently used mode & theme editor config.
  private currentConfig: { langMode?: string, editorTheme?: string } = {};
  //current index
  public selIndex: number;
  // #endregion

  // constructor() { }
  constructor(private handler: ServerHandlerService, private http: HttpService) { }
  // constructor(private http: HttpService) { }

  ngOnInit() {
    ace.require('ace/ext/language_tools'); // require extention module for autocompletion
    this.editorBeautify = ace.require('ace/ext/beautify'); // hold reference to beautify extension

    const element = this.codeEditorElmRef.nativeElement;
    const editorOptions = this.getEditorOptions();
    this.codeEditor = this.createCodeEditor(element, editorOptions);
    this.languagesArray$ = this.pipeSuppurtedLanguages();
    this.languagesArray$.subscribe((data) => {
      this.languagesArray = data.reduce<Language[]>((langsArray, entry) => {
        return langsArray.concat(entry);
      }, []);
      console.log(this.languagesArray);
      console.log(data)
    });
    // console.log(this.languagesArray$);
    // this.languagesArray = this.pipeSuppurtedLanguages;
    this.activatedTheme = this.initEditorOptions.theme;

    this.setLanguageMode(this.initOptions.languageMode || DEFAULT_LANG_MODE);
    this.setEditorTheme(this.initOptions.theme || DEFAULT_THEME);
    this.setContent(this.initOptions.content || DEFAULT_INIT_CONTENT);
    this.selIndex = 1;
    this.inputArea.nativeElement.style.display = "none";
    this.codeEditor.container.style.height = "500px";
  }

  // #region - private
  private pipeSuppurtedLanguages() {
    // console.log(this.handler.getAllSuppurtedLangs());
    this.handler.getAllSuppurtedLangs().pipe(
      map((languages: LanguageTable) => {
        console.log(languages);
      })
    )
    return this.handler.getAllSuppurtedLangs();
    // .pipe(
    //   // reduce the incoming table to languages array.
    //   map((languages: LanguageTable) => {
    //     console.log(languages);
    //     return languages.reduce<Language[]>((langsArray, entry) => {
    //       return langsArray.concat(entry[1]);
    //     }, []);
    //   }),
    //   // store the array in a member.
    //   tap((languages: Language[]) => this.languagesArray = languages),
    //   // console log any error and returning an empty array.
    //   catchError((err) => {
    //     console.log(err);
    //     this.cantReachServer = true;
    //     this.languagesArray = [];
    //     return of(this.languagesArray);
    //   })
    // );
  }



  // #region - private
  private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
    const editor = ace.edit(element, options);
    editor.setShowFoldWidgets(true);
    return editor;
  }
  // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a workaround still using ts
  private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { [key: string]: boolean; } {
    const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
      highlightActiveLine: true,
      minLines: 14,
      maxLines: Infinity,
    };
    const extraEditorOptions = {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    };
    return Object.assign(basicEditorOptions, extraEditorOptions);
  }
  // #endregion

  // #region - public - config control
  public setLanguageMode(langMode: string): void {
    try {
      if (languageModuleMap.has(langMode)) {
        const langModeModulePath = languageModuleMap.get(langMode);
        this.codeEditor.getSession().setMode(langModeModulePath, () => {
          this.currentConfig.langMode = langMode;
        });
      }
    } catch (error) {
      console.log(error);
    }

  }
  public setEditorTheme(theme: string): void {
    try {
      if (themeModuleMap.has(theme)) {
        const themeModulePath = themeModuleMap.get(theme);
        this.codeEditor.setTheme(themeModulePath, () => {
          this.currentConfig.editorTheme = theme;
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  public getCurrentConfig(): Readonly<{ langMode?: string; editorTheme?: string; }> {
    return Object.freeze(this.currentConfig);
  }
  // #endregion

  // #region - public - content manipulation
  /**
   * @returns - the current editor's content.
   */
  public getContent() {
    if (this.codeEditor) {
      const code = this.codeEditor.getValue();
      return code;
    }
  }
  /**
   * @param content - set as the editor's content.
   */
  public setContent(content: string): void {
    if (this.codeEditor) {
      this.codeEditor.setValue(content);
    }
  }
  /**
   * @description
   *  beautify the editor content, rely on Ace Beautify extension.
   */
  public beautifyContent(): void {
    if (this.codeEditor && this.editorBeautify) {
      const session = this.codeEditor.getSession();
      this.editorBeautify.beautify(session);
    }
  }
  // #endregion

  // #region - public - events
  /**
   * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
   * @param callback - recive the corrent content and 'change' event's original parameter.
   */
  public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
    this.codeEditor.on('change', (delta) => {
      const content = this.codeEditor.getValue();
      callback(content, delta);
    });
  }
  // #endregion

  //--------------------------------------------------------------------//

  // #region - public
  public onClearContent() { this.setContent(''); }

  public onBeautifyContent() { this.beautifyContent(); }

  public onRunContent() {
    const code = this.getContent();
    console.log(this.getCurrentConfig());
    if (code && code.length > 0) {
      // const languagesSelectElement = this.languagesSelect.nativeElement as HTMLSelectElement;
      const inedx = this.selIndex;
      const language = this.languagesArray[inedx];
      console.log(language);
      // var checkSts: string = "";
      const checkSts = this.myCheck.nativeElement.value;
      const stdIn = this.inputArea.nativeElement.firstElementChild.value;
      if(checkSts == "unchecked" && stdIn != null){
        this.handler.postCodeToRun(code, {
          id: language.lang, version: language.version, index: language.index, stdin: stdIn
        }).subscribe((data: any) => {
          this.output$ = data.output;
          console.log("data   ", data);
        })
      }
      else{
        this.handler.postCodeToRun(code, {
          id: language.lang, version: language.version, index: language.index, stdin: ""
        }).subscribe((data: any) => {
          this.output$ = data.output;
          console.log("data   ", data);
        })
      }
      
      // this.output$ = this.handler.postCodeToRun(code, {
      //   id: language.lang, version: language.version, index: language.index
      // });
      // .pipe(
      //   // returning the output content.
      //   map((response: RunResult) => response.output),
      //   // console log any error and returning an error message.
      //   catchError((err) => {
      //     console.log(err);
      //     return of(DEFAULT_RUN_ERROR_MESSAGE);
      //   })
      // )
      // ;
      // console.log(oo);
      // console.log(this.output$);
    }
  }

  public onChangeTheme(theme: string) {
    if (this.supportedThemes.includes(theme)) {
      this.setEditorTheme(theme);
    }
  }

  public onChangeLanguageMode(event: any) {
    const selectedIndex = event.target.selectedIndex;
    this.selIndex = selectedIndex;
    const language = this.languagesArray[selectedIndex];
    // this.languagesSelect = language.lang;
    const langMode = language.lang;
    this.setLanguageMode(langMode);
  }

  public onCustomSelect(event: any) {
    if (this.myCheck.nativeElement.value == "checked") {
      this.inputArea.nativeElement.style.display = "block";
      this.myCheck.nativeElement.value = "unchecked"
    }
    else {
      this.inputArea.nativeElement.style.display = "none";
      this.myCheck.nativeElement.value = "checked"
    }
  }
  // #endregion
}

interface RunResult {
  output: string;
  statusCode: number;
  memory: string;
  cpuTime: string;
}
