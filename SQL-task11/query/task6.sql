select USER_ID, count(POST_ID) from POST
where CREATED_AT = '2020-03-01%'
group by USER_ID;