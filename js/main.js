


//on scroll logic
function animate_on_scroll(animation_element,RM,TD,infinte){
    const options = {
        rootMargin: RM,
        threshold:TD,
    }
    let observer_up = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if(entry.isIntersecting){
                entry.target.classList.add('animate-js')
            }
            else if (infinte  == true && entry.isIntersecting == false){
                entry.target.classList.remove('animate-js')
            }
        })
    },options)
    const observed = document.querySelectorAll(animation_element)
    observed.forEach((e)=>observer_up.observe(e))    
}
animate_on_scroll('.products-ul li' ,'-45% 0px ',.1,true)
animate_on_scroll('#ba-1','0px' , 0,false)
animate_on_scroll('#ba-2','0px' , 0,false)
animate_on_scroll('.feature-ul li','0px' , 0,false)
animate_on_scroll('.hero','0px' , 0 ,true)



// nav logic




const activePage =  window.location.href
const li_list = document.querySelectorAll('ul li')
li_list.forEach(function(li){
    if(li.firstElementChild.href == activePage){
        li.firstElementChild.classList.add('active')
    }else{
        if(window.location.href === 'file:///E:/Ecommerce/sproduct.html'||window.location.href === 'file:///E:/Ecommerce/sblog.html'){
            ''
        }else{
            li.firstElementChild.classList.remove('active')
        }
    }
})




// nav animation logic && scroll to top logic
if(activePage != 'file:///E:/Ecommerce/sblog.html'){
    const nav = document.querySelector('#header')
    const scroll_to_top  = document.querySelector('.scroll_to_top')
    scroll_to_top.onclick = function(){
        scroll({
            top: '100px',
            left:'100px',
            behavior:'smooth'
        })
    }
    window.onscroll = function(e){
        if(scrollY >= 80 && scrollY <= 900){
            nav.style.cssText = ' opacity:0; translate:0px -200px;'
        } else if (scrollY >= 900){
            nav.style.cssText = ' opacity:1; translate:0px 0px;'
        }else if(scrollY <= 80){
            nav.style.cssText = '  translate: 0px 0px; opacity:1; transition:0s;'
        } 
        if(scrollY >= 400){
            scroll_to_top.style.cssText = 'opacity:1;'
        }else{
            scroll_to_top.style.cssText = 'opacity:0;'
        }
    }
}



//burger menu logic 



const burger_icon = document.querySelector('.burger-icon')
const burger_icon_menu = document.querySelector('.burger-icon-menu') 
const close_burger_menu = document.querySelector('.delete')


burger_icon.onclick = function(){
    burger_icon_menu.classList.add('show')
    close_burger_menu.onclick = function(){
        burger_icon_menu.classList.remove('show')
    }
}


// clicking outside the menu


window.addEventListener('click' ,(e)=>{
    if(e.target.parentElement == burger_icon || e.target == burger_icon_menu){
        burger_icon_menu.classList.add('show')
    }else{
        burger_icon_menu.classList.remove('show')
    }
})


// incase window has chaged


window.onresize = function(){
    if(window.innerWidth >799){
        burger_icon_menu.classList.remove('show')
    }
}


// products 

let products = document.querySelectorAll('.products ul li')



//get the clicked element information



let currentTarget  ; 


function Handle_Clicked_Product(){
    products.forEach(function(e,index){
        e.addEventListener('click',function(e){
            currentTarget = {
                target_name:e.currentTarget.querySelector('.about-product').querySelector('h5').textContent,
                main_img:e.currentTarget.firstElementChild.firstElementChild.src,
                product_imgs:Array.from(document.querySelectorAll('.products ul li'))
                .map((li)=>{
                    if( index+4 > document.querySelectorAll('.products ul li').length -1){
                        index = 0 
                    }
                    return li.firstElementChild.firstElementChild.src
                }).slice(index,index+4),
                price:e.currentTarget.querySelector('.cart-price').querySelector('h4').textContent
            }
            //store the information in localStorage
            localStorage.setItem('current',JSON.stringify(currentTarget))
            //change the location href to the product page
            window.location = './sproduct.html'
        })
    })
    Handle_single_Product_Page()
    galary()
}



//add the information about every selected


function Handle_single_Product_Page(){
    let currentTarget  = localStorage.getItem('current')
    currentTarget = JSON.parse(currentTarget)
    if(window.location == 'file:///E:/Ecommerce/sproduct.html'){
        let product_name = document.querySelector('#product-name')
        let main_img = document.querySelector('#main-img')
        let product_imgs = document.querySelectorAll('.other-imges img')
        let price = document.querySelector('#price')
        let number_of_pecies = document.querySelector('#number')
        price.textContent = `$${parseInt(currentTarget.price.slice(1,3)) * parseInt(number_of_pecies.value)}`
        number_of_pecies.oninput = function(){
            if(number_of_pecies.value>=1){
                price.textContent = `$${parseInt(currentTarget.price.slice(1,3)) * parseInt(number_of_pecies.value)}`
            }else{
                price.textContent = `$${0}`
            }
        }
        product_name.textContent = currentTarget.target_name
        main_img.src = currentTarget.main_img
        product_imgs.forEach((img,index)=>img.src = currentTarget.product_imgs[index])
    }    
}
Handle_Clicked_Product()
//Make The Galary
function galary(){
    const imgs = document.querySelectorAll('.other-imges img')
    const main_image = document.querySelector('#main-img')
    imgs.forEach((imgs)=>{
        imgs.addEventListener('click',(img)=> {
            main_image.src = img.target.src
        })
    })
}



