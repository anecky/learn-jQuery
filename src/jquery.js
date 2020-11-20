window.$ = window.jQuery=(selectorOrArrayOrTemplate)=>{
    let elements
    if(typeof selectorOrArrayOrTemplate === 'string'){
        if(selectorOrArrayOrTemplate[0] === "<"){
            //创建div
            elements = [createElement(selectorOrArrayOrTemplate)]
            console.log('elements',elements)
        }else{
           elements = document.querySelectorAll(selectorOrArrayOrTemplate) 
        }
    }else if(selectorOrArray instanceof Array){
        elements = selectorOrArrayOrTemplate
    }
    function createElement(string) {
        const container = document.createElement("template")
        container.innerHTML = string.trim();
        console.log('container',container)
        return container.content.firstChile;//返回<template>元素的模板内容
    }
    const api = Object.create(jQuery.prototype)  //创建一个对象，这个对象的__proto__为括号里的东西
    Object.assign(api,{
        elements:elements,
        oldApi:selectorOrArrayOrTemplate.oldApi
    })
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        jquery: true,
        get(index){
            return this.elements[index]
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
                fn.call(null,elements[i])
            }
            return this 
        },
        parent(){
            const array = []
            this.each(node=>{
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },
        children(){
            const array = []
            this.each(node=>{
                array.push(...node.children)
            })
            return jQuery(array)
        },
        print(){
            console.log(elements)
        },
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },
        find(selector){
            let array = []
            for(let i=0;i<elements.length;i++){
                let elements2 = Array.from(elements[i].querySelectorAll(selector))
                array = array.concat(elements2)
            }
            array.oldApi = this
            return jQuery(array)
        },
        end(){
            return this.oldApi
        }
    }
}