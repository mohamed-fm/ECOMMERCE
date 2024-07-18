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



    Fetch_data(0,'https://dummyjson.com/posts',blog_object_create,Blog_Load_More,'.blog')


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

