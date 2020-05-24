select NAME from USER
where ( select count(POST_ID) from post
		where USER.USER_ID = POST.USER_ID
        and CREATED_AT like date()) > 3;