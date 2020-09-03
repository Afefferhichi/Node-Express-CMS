### Endpoints for Posts controller

#### create a post
- uri: '/posts' [POST]
- params:  
    <pre>

        postId: 'string',
        postTitle: 'string',
        createdAt: 'date',
        createdby: user,
        creatdAt: 'date',
        createdby: user,

    } 
    </pre>
  
- response:  
    <pre>
    {
    }
    </pre>

#### read templates
- uri: '/templates' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [templates array]
    </pre>


#### read a template
- uri: '/templates/:id' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [template object]
    </pre>


#### update a template
- uri: '/templates/:id' [PUT]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    [template object]
    </pre>


#### delete a template
- uri: '/templates/:id' [DELETE]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    {}
    </pre>


#### delete a post
- uri: '/posts/:id/delete' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    {}
    </pre>


#### get count of new posts
- uri: '/posts?type=new' [GET]
- params:  
    <pre>
    {
    } 
    </pre>
  
- response:  
    <pre>
    {}
    </pre>

const getCountOfNewPosts = async () => {
    const request = await CallServerPromise.get_count_of_new_posts();
    if(request.success) {
        return request.data;
    }
    else return 0;
}

setInterval(()=>{
    const count = await getCountOfNewPosts();
    if(count > 0) showNotification();
}, 1000*20)

