select NAME from POST
inner join USER on post.USER_ID = user.USER_ID 
group by user.USER_ID 
having count(user.USER_ID) > 3;