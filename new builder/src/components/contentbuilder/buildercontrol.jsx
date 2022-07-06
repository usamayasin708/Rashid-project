import React, { Component } from "react";
import axios from 'axios';
import {Container, Row, Col} from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import ContentBuilder from '@innovastudio/contentbuilder';
import "./contentbuilder.css";
import $ from 'jquery';

class BuilderControl extends Component {
    constructor(props) {
        super(props);
        console.log('BuilderControl this.props',this.props);
        this.state = {
            html: this.props.initialHtml,
            creates:[],
        };

        this.saveContent = this.saveContent.bind(this);
        this.saveContentAndFinish = this.saveContentAndFinish.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    componentDidMount() {
        console.log('compnent loaded',this.state.html);
        // Load language file first
        this.loadLanguageFile(this.props.languageFile, ()=>{
            // Then init the ContentBuilder
            this.obj =  new ContentBuilder({
                container: this.props.container,
                snippetOpen: this.props.snippetOpen,
                sidePanel: this.props.sidePanel,
                snippetDisplay: this.props.snippetDisplay,
                toolbarAddSnippetButton: this.props.toolbarAddSnippetButton,
                snippetPath: this.props.snippetPath,
                // snippetPathReplace: this.props.snippetPathReplace,
                snippetCategories: this.props.snippetCategories,
                defaultSnippetCategory: this.props.defaultSnippetCategory,
                modulePath: this.props.modulePath,
                assetPath: this.props.assetPath,
                fontAssetPath: this.props.fontAssetPath,
                imageSelect: this.props.imageSelect,
                fileSelect: this.props.fileSelect,
                largerImageHandler: this.props.largerImageHandler,
                onLargerImageUpload: (e)=>{
                    debugger;
                    const selectedImage = e.target.files[0];
                    debugger;
                    const filename = selectedImage.name;
                    debugger;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        let base64 = e.target.result;
                        base64 = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
    
                        // Upload image process
                        axios.post(this.props.largerImageHandler, { image: base64, filename: filename }).then((response)=>{
                            
                            const uploadedImageUrl = response.data.url; // get saved image url
                            this.obj.applyLargerImage(uploadedImageUrl); // set input
    
                        }).catch((err)=>{
                            console.log(err)
                        });
    
                    }
                    reader.readAsDataURL(selectedImage);
    
                },
                plugins: this.props.plugins,
                pluginPath: this.props.pluginPath,
                useLightbox: this.props.useLightbox,
                themes: this.props.themes,
            });
    
            this.obj.loadSnippets(this.props.snippetFile); // Load snippet file
    
            this.obj.loadHtml(this.state.html);

        });

        // https://stackoverflow.com/questions/37949981/call-child-method-from-parent
        if(this.props.doSave) this.props.doSave(this.saveContent);  // Make it available to be called using doSave
        if(this.props.doSaveAndFinish) this.props.doSaveAndFinish(this.saveContentAndFinish); 
        if(this.props.doDestroy) this.props.doDestroy(this.destroy);

    }

    componentDidUpdate(prevProps) {
        // if (this.props.initialHtml !== prevProps.initialHtml) {
            this.setHtml(this.props.initialHtml);
        // }
        
    }
   
    setHtml = (html) => {
        this.obj.loadHtml(html);
    }
    loadLanguageFile = (languageFile, callback) => {
        if(!this.isScriptAlreadyIncluded(languageFile)) {
            const script = document.createElement("script");
            script.src = languageFile; 
            script.async = true;
            script.onload = () => {
                if(callback) callback();
            };
            document.body.appendChild(script);
        } else {
            if(callback) callback();
        }
    }
    isScriptAlreadyIncluded = (src) => {
        const scripts = document.getElementsByTagName("script");
        for(let i = 0; i < scripts.length; i++) 
           if(scripts[i].getAttribute('src') === src) return true;
        return false;
    }

    save = (callback) => {

        if(this.props.base64Handler!=='') { // If base64Handler is specified
            // Save all embedded base64 images first
            this.obj.saveImages('', ()=>{
                
                // Then save the content
                let html = this.obj.html();

                if(callback) callback(html);
                
            }, (img, base64, filename)=>{

                // Upload image process
                axios.post(this.props.base64Handler, { image: base64, filename: filename }).then((response)=>{
                    
                    const uploadedImageUrl = response.data.url; // get saved image url

                    img.setAttribute('src', uploadedImageUrl); // set image src

                }).catch((err)=>{
                    console.log(err)
                });
                
            });

        } else {

            let html = this.obj.html();

            if(callback) callback(html);

        }
    }

    saveContent = () => {
        
        var quiz_questionnaire = document.querySelectorAll('.quiz-questionnaire form');
        for(let question of quiz_questionnaire)
        {
            if(question.querySelector('input[name=question_ref_id]').value == ""){
                question.querySelector('input[name=question_ref_id]').value = Math.floor((new Date()).getTime() / 1000)+Math.floor(Math.random() * 10100);
                //+Math.floor(Math.random() * 10100)+
            }
        }
    
        this.save((html)=>{
            this.props.onSave(html);
        });

    }

    saveContentAndFinish = () => {
        
        this.save((html)=>{

            this.props.onSaveAndFinish(html);

        });

    }

    destroy = () => {
        this.obj.destroy();
    }

    render() {

    
        return (
            <div id="main_content" className="container tutor-main-section-container elements_fulls_screens">    
            </div>

        );
    }
}



BuilderControl.defaultProps = {
    container: '.container',
    row: 'row',
    cols: ['col-md-1', 'col-md-2', 'col-md-3', 'col-md-4', 'col-md-5', 'col-md-6', 'col-md-7', 'col-md-8', 'col-md-9', 'col-md-10', 'col-md-11', 'col-md-12', 'col-sm-12'],
    snippetOpen: true,
    sidePanel: 'left',
    snippetDisplay: 'visible',
    toolbarAddSnippetButton: true,
    snippetPath: '../assets/minimalist-blocks/',
    snippetUrl: '../assets/minimalist-blocks/content.js', // Snippet file
    // snippetCategories: [
    //     [120,'Basic'],
    //     [118,'Article'],
    //     [101,'Headline'],
    //     [119,'Buttons'],
    //     [102,'Photos'],
    //     [103,'Profile'],
    //     [116,'Contact'],
    //     [104,'Products'],
    //     [105,'Features'],
    //     [106,'Process'],
    //     [107,'Pricing'],
    //     [108,'Skills'],
    //     [109,'Achievements'],
    //     [110,'Quotes'],
    //     [111,'Partners'],
    //     [112,'As Featured On'],
    //     [113,'Page Not Found'],
    //     [114,'Coming Soon'],
    //     [115,'Help, FAQ'],
    //     [122,'Gallery'],
    //     [123,'Extra'],
    //     [125,'Quiz'],
    //     [126,'Quiz-1']
    // ],

    snippetCategories: [
        [101,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Heading.svg" alt="svg-icon"/><span>Title</span>'+
        '</p>'],
        [118,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Body.svg" alt="svg-icon"/><span>Body</span>'+
        '</p>'],
        [122,'<p id="tutor_image_collapse">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Images.svg" alt="svg-icon"/><span>Image</span>'+
        '</p>'],
        [120,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Video.svg" alt="svg-icon"/><span>Video</span>'+
         '</p>'],
                [126,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Books.svg" alt="svg-icon"/><span>Quiz</span>'+
        '</p>'],
        [115,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Questions.svg" alt="svg-icon"/><span>FAQ</span>'+
        '</p>'],
        [108,'<p id="tutor_qoutes_collapse">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Quote.svg" alt="svg-icon"/><span>Quotes</span>'+
    '</p>'],
    [106,'<p id="closed_collaped" class="closed_collaped">'+
    '<img src="../assets/minimalist-blocks/preview/icon/Subtask.svg" alt="svg-icon"/><span>Process</span>'+
    '</p>'],
        [119,'<p id="closed_collaped" class="closed_collaped">'+
        '<img src="../assets/minimalist-blocks/preview/icon/Button.svg" alt="svg-icon"/><span>Button</span>'+
        '</p>'],    
    ],
    defaultSnippetCategory: 101,
    modulePath: '/assets/modules/',
    assetPath: '/assets/',
    fontAssetPath: '/assets/fonts/',
    plugins: [
        { name: 'preview', showInMainToolbar: true, showInElementToolbar: true },
        { name: 'wordcount', showInMainToolbar: true, showInElementToolbar: true },
        { name: 'symbols', showInMainToolbar: true, showInElementToolbar: false },
        { name: 'buttoneditor', showInMainToolbar: false, showInElementToolbar: false },
    ],
    pluginPath: '/contentbuilder/',
    imageSelect: '',
    fileSelect: '',
    base64Handler: '',
    largerImageHandler: '',
    snippetFile: '',
    languageFile: '',
    useLightbox: true,
    themes: [ // color preview, class name & css file
        ['#ffffff','',''],
        ['#282828','dark','contentbuilder/themes/dark.css'], 
        ['#0088dc','colored','contentbuilder/themes/colored-blue.css'],
        ['#006add','colored','contentbuilder/themes/colored-blue6.css'],
        ['#0a4d92','colored','contentbuilder/themes/colored-darkblue.css'],
        ['#96af16','colored','contentbuilder/themes/colored-green.css'],
        ['#f3522b','colored','contentbuilder/themes/colored-orange.css'],

        ['#b92ea6','colored','contentbuilder/themes/colored-magenta.css'],
        ['#e73171','colored','contentbuilder/themes/colored-pink.css'],
        ['#782ec5','colored','contentbuilder/themes/colored-purple.css'],
        ['#ed2828','colored','contentbuilder/themes/colored-red.css'],
        ['#f9930f','colored','contentbuilder/themes/colored-yellow.css'],
        ['#13b34b','colored','contentbuilder/themes/colored-green4.css'],
        ['#333333','colored-dark','contentbuilder/themes/colored-dark.css'], 
        
        ['#dbe5f5','light','contentbuilder/themes/light-blue.css'],
        ['#fbe6f2','light','contentbuilder/themes/light-pink.css'],
        ['#dcdaf3','light','contentbuilder/themes/light-purple.css'],
        ['#ffe9e0','light','contentbuilder/themes/light-red.css'],
        ['#fffae5','light','contentbuilder/themes/light-yellow.css'],
        ['#ddf3dc','light','contentbuilder/themes/light-green.css'],
        ['#d7f7f1','light','contentbuilder/themes/light-cyan.css'],

        ['#c7ebfd','light','contentbuilder/themes/light-blue2.css'],
        ['#ffd5f2','light','contentbuilder/themes/light-pink2.css'],
        ['#eadafb','light','contentbuilder/themes/light-purple2.css'],
        ['#c5d4ff','light','contentbuilder/themes/light-blue3.css'],
        ['#ffefb1','light','contentbuilder/themes/light-yellow2.css'],
        ['#e5e5e5','light','contentbuilder/themes/light-gray2.css'],
        ['#dadada','light','contentbuilder/themes/light-gray.css'],

        ['#3f4ec9','colored','contentbuilder/themes/colored-blue2.css'],
        ['#6779d9','colored','contentbuilder/themes/colored-blue4.css'],
        ['#10b9d7','colored','contentbuilder/themes/colored-blue3.css'], 
        ['#006add','colored','contentbuilder/themes/colored-blue5.css'],
        ['#e92f94','colored','contentbuilder/themes/colored-pink3.css'],
        ['#a761d9','colored','contentbuilder/themes/colored-purple2.css'],
        ['#f9930f','colored','contentbuilder/themes/colored-yellow2.css'],

        ['#f3522b','colored','contentbuilder/themes/colored-red3.css'],
        ['#36b741','colored','contentbuilder/themes/colored-green2.css'],
        ['#00c17c','colored','contentbuilder/themes/colored-green3.css'],
        ['#fb3279','colored','contentbuilder/themes/colored-pink2.css'],
        ['#ff6d13','colored','contentbuilder/themes/colored-orange2.css'], 
        ['#f13535','colored','contentbuilder/themes/colored-red2.css'],
        ['#646464','colored','contentbuilder/themes/colored-gray.css'],

        ['#3f4ec9','dark','contentbuilder/themes/dark-blue.css'],
        ['#0b4d92','dark','contentbuilder/themes/dark-blue2.css'],
        ['#006add','dark','contentbuilder/themes/dark-blue3.css'],
        ['#5f3ebf','dark','contentbuilder/themes/dark-purple.css'],
        ['#e92f69','dark','contentbuilder/themes/dark-pink.css'],
        ['#4c4c4c','dark','contentbuilder/themes/dark-gray.css'],
        ['#ed2828','dark','contentbuilder/themes/dark-red.css'],

        ['#006add','colored','contentbuilder/themes/colored-blue8.css'],
        ['#ff7723','colored','contentbuilder/themes/colored-orange3.css'],
        ['#ff5722','colored','contentbuilder/themes/colored-red5.css'],
        ['#f13535','colored','contentbuilder/themes/colored-red4.css'],
        ['#00bd79','colored','contentbuilder/themes/colored-green5.css'],
        ['#557ae9','colored','contentbuilder/themes/colored-blue7.css'],
        ['#fb3279','colored','contentbuilder/themes/colored-pink4.css'],
    ],

};

export default BuilderControl;

