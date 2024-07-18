


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

// handel pagination and fetch products


if(activePage == 'file:///E:/Ecommerce/shop.html' || activePage == 'file:///E:/Ecommerce/sproduct.html'){
    function pagintion_Handle(pagination,data){
        let count = 0
        const load_more = document.querySelector('.pagination')
        pagination.addEventListener('click',function(el){
                if(load_products()){
                    load_more.textContent = 'Loading...'
                    setTimeout(function(){
                        load_more.textContent = 'Load More'
                        let generator = load_products(data)
                        for(let i =0 ;i < count;i++){
                            generator.next().value
                        }
                        add_Product_To_Page(generator)
                        count+=4
                        products = document.querySelectorAll('.products ul li')
                        Handle_Clicked_Product()
                        animate_on_scroll('.products-ul li' ,'-250px 0px',.1,true)
                    },1000)
                }else{
                    load_more.textContent = 'No More Products'
                }
            })
    }
    function* load_products(data){
        for(let i = 0 ; i < data.length;i++ ){
            yield data[i]
        }
    }
    function create_li(product_details){
        //load img-contenar div information
        let li = document.createElement('li')
        let img_contenar = document.createElement('div')
        img_contenar.classList.add('img-contenar')
        let img = document.createElement('img')
        img.src = product_details.image
        img_contenar.appendChild(img)
        //load about-product div information
        let about_product = document.createElement('div')
        about_product.classList.add('about-product')
        let h5 = document.createElement('h5')
        let p  = document.createElement('p')
        p.textContent = 'adidas'
        h5.textContent = product_details.title
        about_product.appendChild(p)
        about_product.appendChild(h5)


        let rating = document.createElement('div')
        rating.classList.add('rating')
        let stars =  document.createElement('div')
        stars.classList.add('stars')
        for(let i =0 ;i<5;i++){
            let star = document.createElement('img')
            star.src = './img/star-solid.svg'
            stars.appendChild(star) 
        }
        rating.appendChild(stars)
        
        let cart_price = document.createElement('div')
        cart_price.classList.add('cart-price')
        let h4 = document.createElement('h4')
        h4.textContent = `$${product_details.price}`
        let button = document.createElement('button')
        button.classList.add('cart')
        let cart_img = document.createElement('img')
        cart_img.src = './img/Screenshot (153).png'
        button.appendChild(cart_img)
        cart_price.appendChild(h4)
        cart_price.appendChild(button)
        about_product.appendChild(rating)

        rating.appendChild(cart_price)

        about_product.appendChild(rating)
        li.appendChild(img_contenar)
        li.appendChild(about_product)
        
        
        return li
    }
    function add_Product_To_Page(generator){
        const products_ul = document.querySelector('.products .products-ul')
        for(let i = 0; i < 4 ;i++){ 
            products_ul.appendChild(create_li(generator.next().value))
        }
    }
    async function  fetch_data (){
    try{
        let data = await fetch('https://fakestoreapi.com/products').then(res=>res.json())
        const pagination = document.querySelector('.pagination')
        pagintion_Handle(pagination,data)
    }catch{
        console.log(Error('No Such Data Found'))
    }
}
    fetch_data()
}



// global funtion to fetch any data we want
function Fetch_data(current,url,Function_To_Call,button,element_to_animate){
    try{
        fetch(`${url}?limit=4&skip=${current}`).then(res => res.json()).then((res)=>{
            Function_To_Call(res)
            animate_on_scroll(element_to_animate,'-310px 0px ',0,true)
            if(res.length == 0){
                button.textContent = 'No More Posts'
            }else{
                button.textContent = 'Lode More'
            }
        });
    }catch{
        console.log(Error('No Such Data Found'))
    }
}

// blog page bulding

if(activePage == 'file:///E:/Ecommerce/blog.html'|| activePage == 'file:///E:/Ecommerce/sblog.html'){
    
    
    
    const Blog_Load_More = document.querySelector('#blog-pagination')
    let current = 4
    Blog_Load_More.onclick = function(){
        Blog_Load_More.textContent = 'Loading... '
        setTimeout(function(){
            Fetch_data(current,'https://dummyjson.com/posts',blog_object_create,Blog_Load_More,'.blog')
            current+=4
        },2000)
    }



    let blog_object_array = []
    function blog_object_create(res){
        res.posts.forEach(function(el){
            let blog = {
                id:el.id ,
                title:el.title,
                body:`${el.body.split(' ').slice(0,40).join(' ')}...`,
                body_full:el.body,
                img:random_img(),
                likes:el.reactions.likes,
                views:el.views,
                date:random_date(),
            }
            blog_object_array.push(blog)
            blog_div_create(blog,blog.body)
            sblog_clikced_blog_object_create(blog_object_array)

        })
        function random_img(){
            let src = `./img/blog/b${Math.floor(Math.random() * 20)}.jpg` 
            return src
        }
        function random_date(){
            let date = `${Math.floor(Math.random() * 31)} / ${Math.floor(Math.random() * 12)}`
            return date
        }
    }


    function blog_div_create(blog,body){
        const blog_contenar = document.querySelector('#blogs .contenar')
        // create blog div && div content
        let blog_div =  document.createElement('div')
        blog_div.classList.add('blog')
        blog_div.id = blog.id
        // blog img contenar div
        let  img_contenar = document.createElement('div')
        img_contenar.id = 'img_contenar' 
        let img=  document.createElement('img')
        img.src = blog.img 
        img.alt = 'blog_img'
        img_contenar.append(img)
        let blog_date_of_puplish = document.createElement('p')
        blog_date_of_puplish.textContent = blog.date
        img_contenar.append(blog_date_of_puplish)
        // blog details div
        let blog_details = document.createElement('div')
        blog_details.classList.add('details')
        let blog_title  = document.createElement('h3')
        blog_title.textContent = blog.title
        blog_details.append(blog_title)
        let blog_body  = document.createElement('p')
        blog_body.textContent = body
        blog_details.append(blog_body)
        let blog_read_more_contenar  = document.createElement('h5')
        let blog_read_more  = document.createElement('a')
        blog_read_more.textContent = 'CONTINUE READING'
        blog_read_more.href = 'sblog.html'
        blog_read_more_contenar.append(blog_read_more)
        blog_details.append(blog_read_more_contenar)
        let likes_contenar  = document.createElement('div')
        likes_contenar.classList.add('likes')
        let likes_heart_contenar = document.createElement('p')
        let likes = document.createElement('span')
        likes.textContent = blog.likes
        likes_heart_contenar.append(likes)
        let likes_heart = document.createElement('li')
        likes_heart.classList.add('fa-solid')
        likes_heart.classList.add('fa-heart')
        likes_heart.style.cssText = 'color: #74C0FC;'
        likes_heart_contenar.append(likes_heart)
        likes_contenar.append(likes_heart_contenar)
        let watches_contenar = document.createElement('p')
        let watches = document.createElement('span')
        watches.textContent = blog.views
        let watches_eye = document.createElement('li')
        watches_eye.classList.add('fa-solid')
        watches_eye.classList.add('fa-eye')
        watches_eye.style.cssText = 'color: #74C0FC;'
        watches_contenar.append(watches)
        watches_contenar.append(watches_eye)
        likes_contenar.append(watches_contenar)
        blog_details.append(likes_contenar)
        //blog div append childs
        blog_div.append(img_contenar)
        blog_div.append(blog_details)
        // blog contenar append childs
        blog_contenar.appendChild(blog_div)
    }

    
    if(activePage == 'file:///E:/Ecommerce/blog.html'){
    Fetch_data(0,'https://dummyjson.com/posts',blog_object_create,Blog_Load_More,'.blog')
    }


}

// clikced blog to localstorage


function sblog_clikced_blog_object_create(blog_object_array){
    let blogs = document.querySelectorAll('.blog')
    blogs.forEach(function(e,index){
        e.onclick = function(clicked){
            if(+clicked.currentTarget.id == blog_object_array[index].id){
                localStorage.setItem('blog',JSON.stringify(blog_object_array[index]))
                window.location.href  = 'file:///E:/Ecommerce/sblog.html'
            }
        }
    })
}



// sbolg page bulding



if(activePage == 'file:///E:/Ecommerce/sblog.html' ){  


    //build the selceted blog
    blog_div_create(JSON.parse(localStorage.getItem('blog')),JSON.parse(localStorage.getItem('blog')).body_full)
    animate_on_scroll('.blog' ,'-45% 0px ',0,true)


    //build the comments section    
 
 
    const Blog_Load_More = document.querySelector('#blog-pagination')
    let current = 4
    Blog_Load_More.onclick = function(){
        Blog_Load_More.textContent = 'Loading... '
        setTimeout(function(){
            Fetch_data(current,'https://dummyjson.com/comments',sblog_commments_object_create,Blog_Load_More,'.comment')
            current+=4
        },2000)
    } 



    function sblog_commments_object_create(res){
        res.comments.forEach(function(el,index){
            let comment = {
                id:el.id,
                body:el.body,
                user_name:el.user.fullName,
                likes:el.likes,
                img: random_img(),
            }
            function random_img(){
                let img  = `./img/people/${Math.floor(Math.random()*16)}.jpg`
                return img
            }
            comments_create(comment)
        })
    }
    function comments_create(comment){
        const comments_contenar = document.querySelector('.comments')
        
        //comment div create
        let comment_div =  document.createElement('div')
        comment_div.classList.add('comment')
        //user_div_create
        let user_div = document.createElement('div')
        user_div.classList.add('user')
        let user_img = document.createElement('img')
        user_img.src = comment.img
        user_img.alt = 'user_img'
        user_div.append(user_img)
        let user_name = document.createElement('p')
        user_name.textContent = comment.user_name
        user_div.append(user_name)
        comment_div.append(user_div)
        //comment-body_create
        let comment_body = document.createElement('p')
        comment_body.textContent = comment.body
        comment_div.append(comment_body)
        //comment_likes_create
        let comment_likes_contenar = document.createElement('div')
        comment_likes_contenar.classList.add('comment_likes')
        let likes_icon = document.createElement('span')
        let number_of_likes = comment.likes 
        likes_icon.textContent = number_of_likes
        let icon = document.createElement('i')
        icon.classList.add('fa-solid','fa-thumbs-up')
        icon.style.cssText  = "color: #74C0FC;"
        likes_icon.append(icon)
        comment_likes_contenar.append(likes_icon)
        comment_div.append(comment_likes_contenar)
        
        // translate comment based on the index of it
        //comments_contenar append childs
        comments_contenar.append(comment_div)
    }
    Fetch_data(0,'https://dummyjson.com/comments',sblog_commments_object_create,Blog_Load_More,'.comment')



}

//