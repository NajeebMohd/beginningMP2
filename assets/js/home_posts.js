// method to submit the form data for new post using ajax
{
    let createPost = function(){
        let newPost = $('#new-feed-post');
        
        newPost.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/posts/post-create',
                data : newPost.serialize(),
                success : function(data){
                    let newpost = newPostDom(data.data.post);
                    $('#posts-list>ul').prepend(newpost);
                    console.log(data);
                    deletePost($(' .delete-post-button', newpost));

                    createComment($(' form',newpost));
                },error : function(error){
                    console.log(error.responseText);
                }
            });            
        });
    }
    createPost();

    let newPostDom = function(post){
        return $(`<li id = "post-${post._id}">
            <p>                
                <small><a class = "delete-post-button" href = "/posts/destroy/${ post._id }">X</a></small>   
                
                <b>${ post.user.username }</b>
                <br>
                ${ post.content }
        
            </p>
            <div class = "post-comment">
                
                    <form action = "/comment/create-comment" method = "POST">
                        <input type="text" name = "content" placeholder="type the comment..." required></input>
                        <input type="hidden" name= "post" value= "${ post._id }">
                        <input type = "submit" value="Add comment">
                    </form>
                
                    
                    <div class="post-comment-lists" style="background-color:rgb(244, 197, 197); padding:15px; margin-top: 10px; border-radius: 2rem; width: 80%;">
                        <h4>comments</h4>
                        <ul id = "post-comments-${post._id}">
                            
                        </ul>
                    </div>           
                
            </div>
        
        </li>`);
    }
    // method to create a post in DOM
    let deletePost = function(deleteLink){
        
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success : function(data){
                    $(`#post-${ data.data.post_id }`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create a post in DOM
    let createComment = function(comment){  
        console.log(comment);
        comment.submit(function(e){
            e.preventDefault();

            $.ajax({
                type : 'post',
                url : '/comment/create-comment',
                data : comment.serialize(),
                success : function(data){
                    let NewComment = newCommentDom(data.data.comment);
                    $(`#post-comments-${data.data.data}`).prepend(NewComment);

                    deleteComment($(' a',NewComment));
                },error : function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    let newCommentDom = function(comment){
        return $(`
            <li id = "comment-${comment.id}">                                        
                <p> ${comment.content }</p>                                    
                <span>commented by </span><b> ${comment.user.username}</b>    
                
                <small><a href="/comment/destroy/${comment._id}">X</a></small>
            
            </li>
        `);
    }

    let deleteComment = function(link){
        $(link).click(function(e){
            e.preventDefault();

            $.ajax({
                type : 'get',
                url : $(link).prop('href'),
                success : function(data){
                    $(`#comment-${data.id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    }
}


